import { leaderboardService } from '@/services/leaderboardService';
import { LeaderboardMode, Unpromise } from '@/types/commonTypes';
import { useState } from 'react';
import { GetLeaderboardQuery } from '@/services/leaderboardService/leaderboardServiceTypes';

export const useLeaderboard = () => {
  const defaultQuery: GetLeaderboardQuery = {
    type: 'exit_velocity',
  };
  const defaultPitchingQuery: GetLeaderboardQuery = {
    type: 'pitch_velocity',
  };

  const [leaderboardItems, setLeaderboardItems] = useState<
    Unpromise<ReturnType<typeof leaderboardService.getLeaderboard>>
  >([]);
  const [leaderboardPitchingItems, setLeaderboardPitchingItems] = useState<
    Unpromise<ReturnType<typeof leaderboardService.getPitchingLeaderboard>>
  >([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchLeaderboard = async (
    fetchQuery: Partial<GetLeaderboardQuery>,
    mode: LeaderboardMode = 'batting'
  ) => {
    try {
      setIsLoading(true);

      if (mode === 'batting') {
        const leaders = await leaderboardService.getLeaderboard({
          ...defaultQuery,
          ...fetchQuery,
        });

        setLeaderboardItems(leaders);
      } else {
        const leaders = await leaderboardService.getPitchingLeaderboard({
          ...defaultPitchingQuery,
          ...fetchQuery,
        });

        setLeaderboardPitchingItems(leaders);
      }
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchLeaderboard,
    leaderboardItems,
    leaderboardPitchingItems,
    isLoading,
  };
};
