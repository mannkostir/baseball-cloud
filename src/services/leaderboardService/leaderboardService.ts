import fetchAPI from '@/services';
import {
  GetLeaderboardQuery,
  GetLeaderboardResponse,
  GetPitchingLeaderboardResponse,
} from './leaderboardServiceTypes';

export const getLeaderboard = async (query: GetLeaderboardQuery) => {
  const res = await fetchAPI.post<GetLeaderboardResponse>('/graphql', {
    query: `query LeaderboardBatting($input:FilterLeaderboardInput!) {
        leaderboard_batting(input: $input) {
          leaderboard_batting {
            batter_name
            exit_velocity
            launch_angle
            distance
            batter_datraks_id
            age
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
        }
      }`,
    variables: { input: { ...query } },
  });

  return res.data.data.leaderboard_batting.leaderboard_batting;
};

export const getPitchingLeaderboard = async (query: GetLeaderboardQuery) => {
  const res = await fetchAPI.post<GetPitchingLeaderboardResponse>('/graphql', {
    query: `query LeaderboardPitching($input:FilterLeaderboardInput!) {
        leaderboard_pitching(input: $input) {
          leaderboard_pitching {
            pitcher_name
            pitch_type
            velocity
            spin_rate
            vertical_break
            horizontal_break
            pitcher_datraks_id
            age
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
        }
      }`,
    variables: { input: { ...query } },
  });

  return res.data.data.leaderboard_pitching.leaderboard_pitching;
};
