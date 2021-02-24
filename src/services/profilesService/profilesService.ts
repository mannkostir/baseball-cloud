import fetchAPI from '@/services';
import {
  GetCurrentProfileResponse,
  GetProfileResponse,
  GetProfilesQuery,
  GetProfilesResponse,
} from './profileServiceTypes';

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

export const getCurrentProfile = async () => {
  const res = await fetchAPI.post<GetCurrentProfileResponse>('/graphql', {
    query: `{
      current_profile () {
        id
        first_name
        last_name
        position
        position2
        avatar
        throws_hand
        bats_hand
        biography
        school_year
        feet
        inches
        weight
        age
        school {
          id
          name
        }
        teams {
          id
          name
        }
        facilities {
          id
          email
          u_name
        }
      }
    }`,
  });

  return res.data.data.current_profile;
};

export const getProfile = async (query: GetProfileResponse) => {
  const res = await fetchAPI.post<GetProfileResponse>('/graphql', {
    query: `query Profile($id: String!) {
      profile(id: $id) {
        id
        first_name
        last_name
        position
        position2
        school_year
        avatar
        throws_hand
        bats_hand
        biography
        school_year
        feet
        inches
        weight
        age
        recentEvents {
          id
          event_type
          event_name
          date
          is_pitcher
          data_rows_count
          recent_avatars {
            id
            first_name
            last_name
            avatar
          }
        }
        wingspan
        grip_right
        grip_left
        wrist_to_elbow
        broad_jump
        act_score
        gpa_score
        sat_score
        batting_top_values {
          pitch_type
          distance
          launch_angle
          exit_velocity
        }
        pitching_top_values {
          velocity
          spin_rate
          pitch_type
        }
        pitcher_summary {
          velocity
          spin_rate
          horizontal_break
        }
        batter_summary {
          exit_velocity
          distance
          launch_angle
        }
        school {
          id
          name
        }
        teams {
          id
          name
        }
        facilities {
          id
          email
          u_name
        }
        favorite
        events_opened
        paid
      }
    }`,
    variables: { ...query },
  });

  return res.data;
};
