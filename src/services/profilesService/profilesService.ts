import fetchAPI from '@/services';
import { GetProfilesQuery, GetProfilesResponse } from './profileServiceTypes';

export const getProfiles = async (query: GetProfilesQuery) => {
  const res = await fetchAPI.post<GetProfilesResponse>('/graphql', {
    query: `query Profiles($input: FilterProfilesInput!) {
      profiles(input: $input) {
        profiles {
          id
          first_name
          last_name
          position
          position2
          school_year
          feet
          inches
          weight
          age
          events {
            id

          }
          school {
            id
            name
          }
          teams {
            id
            name
          }
          favorite
        }
        total_count
      }
    }`,
    variables: { input: { ...query } },
  });

  return res.data.data.profiles;
};
