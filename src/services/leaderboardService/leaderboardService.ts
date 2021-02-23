import fetchAPI from '@/services';
import {
  GetLeaderboardQuery,
  GetLeaderboardResponse,
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

  return res.data;
};
