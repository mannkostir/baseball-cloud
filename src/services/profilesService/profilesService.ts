import fetchAPI from '@/services';
import {
  GetBattingSummaryQuery,
  GetBattingSummaryResponse,
  GetCurrentProfileResponse,
  GetProfileEventsQuery,
  GetProfileEventsResponse,
  GetProfileNamesQuery,
  GetProfileNamesResponse,
  GetProfileQuery,
  GetProfileResponse,
  GetProfilesQuery,
  GetProfilesResponse,
  UpdateFavoriteProfileQuery,
  UpdateFavoriteProfileResponse,
  UpdateProfileQuery,
  UpdateProfileResponse,
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

export const getProfile = async (query: GetProfileQuery) => {
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

  return res.data.data.profile;
};

export const updateProfile = async (query: UpdateProfileQuery) => {
  const res = await fetchAPI.post<UpdateProfileResponse>('/graphql', {
    query: `mutation UpdateProfile ($form:UpdateProfileInput!) {
      update_profile (input:$form) {
        profile {
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
          recent_events {
            id
            event_type
            event_name
            date
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
        }
      }
    }`,
    variables: {
      form: {
        ...query,
      },
    },
  });

  console.log(res);

  return res.data.data.update_profile.profile;
};

export const updateFavoriteProfile = async (
  query: UpdateFavoriteProfileQuery
) => {
  const res = await fetchAPI.post<UpdateFavoriteProfileResponse>('graphql', {
    query: `mutation UpdateFavoriteProfile($form:UpdateFavoriteProfileInput!) {
      update_favorite_profile(input: $form) {
        favorite
      }
    }`,
    variables: { form: { ...query } },
  });

  return res.data.data.update_favorite_profile;
};

export const getBattingSummary = async (query: GetBattingSummaryQuery) => {
  const res = await fetchAPI.post<GetBattingSummaryResponse>('graphql', {
    query: `query BattingSummary($id:ID!) {
      batting_summary(id: $id) {
        top_values {
          id
          distance
          pitch_type
          launch_angle
          exit_velocity
        }
        average_values {
          id
          distance
          pitch_type
          launch_angle
          exit_velocity
        }
      }
    }`,
    variables: { ...query },
  });

  return res.data.data.batting_summary;
};

export const getProfileNames = async (query: GetProfileNamesQuery) => {
  const res = await fetchAPI.post<GetProfileNamesResponse>('graphql', {
    query: `query ProfileNames($input:FilterProfileNamesInput!) {
      profile_names(input: $input) {
        profile_names {
          id
          position
          first_name
          last_name
          inches
          feet
          weight
          age
        }
      }
    }`,

    variables: {
      input: { ...query },
    },
  });

  return res.data.data.profile_names.profile_names;
};

export const getProfileEvents = async (query: GetProfileEventsQuery) => {
  const res = await fetchAPI.post<GetProfileEventsResponse>('graphql', {
    query: `query ProfileEvents($input:FilterProfileEventsInput!) {
      profile_events(input: $input) {
        events {
          id
          date
          event_type
          event_name
        }
        total_count
      }
    }`,
    variables: { input: query },
  });

  return res.data.data.profile_events;
};
