import fetchAPI from '@/api';
import { GetSchoolsQuery, GetSchoolsResponse } from './schoolsAPITypes';

export const getSchools = async (query: GetSchoolsQuery) => {
  const res = await fetchAPI.post<GetSchoolsResponse>('graphql', {
    query: `query Schools($search:String!) {
      schools(search: $search) {
        schools {
          id
          name
        }
      }
    }`,
    variables: { ...query },
  });

  return res.data.data.schools.schools;
};
