import fetchAPI from '@/services';
import { GetTeamsResponse, GetTeamsQuery } from './teamsServiceTypes';

export const getTeams = async (query: GetTeamsQuery) => {
  const res = await fetchAPI.post<GetTeamsResponse>(`graphql`, {
    query: `query Teams($search:String!) {
      teams(search: $search) {
        teams {
          id
          name
        }
      }
    }`,
    variables: { ...query },
  });

  return res.data.data.teams.teams;
};
