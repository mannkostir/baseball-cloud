import fetchAPI from '@/api';
import { GetTeamsResponse, GetTeamsQuery } from './teamsAPITypes';

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
