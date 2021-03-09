import { leaderboardAPI } from '@/api/leaderboard';
import { LeaderboardMode, Unpromise } from '@/types/commonTypes';
import { useState } from 'react';
import { GetLeaderboardQuery } from '@/api/leaderboard/leaderboardAPITypes';

type LeaderoardItemsType = Unpromise<
  ReturnType<typeof leaderboardAPI.getLeaderboard>
>;

type LeaderboardPitchingItemsType = Unpromise<
  ReturnType<typeof leaderboardAPI.getPitchingLeaderboard>
>;

export const useLeaderboard = () => {
  const defaultQuery: GetLeaderboardQuery = {
    type: 'exit_velocity',
  };
  const defaultPitchingQuery: GetLeaderboardQuery = {
    type: 'pitch_velocity',
  };

  const [leaderboardItems, setLeaderboardItems] = useState<LeaderoardItemsType>(
    []
  );
  const [
    leaderboardPitchingItems,
    setLeaderboardPitchingItems,
  ] = useState<LeaderboardPitchingItemsType>([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchLeaderboard = async (
    fetchQuery: Partial<GetLeaderboardQuery>,
    mode: LeaderboardMode = 'batting'
  ) => {
    try {
      setIsLoading(true);

      if (mode === 'batting') {
        const leaders = await leaderboardAPI.getLeaderboard({
          ...defaultQuery,
          ...fetchQuery,
        });

        setLeaderboardItems(leaders);
      } else {
        const leaders = await leaderboardAPI.getPitchingLeaderboard({
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
