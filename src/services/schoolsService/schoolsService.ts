import fetchAPI from '@/services';
import { GetSchoolsQuery, GetSchoolsResponse } from './schoolsServiceTypes';

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
