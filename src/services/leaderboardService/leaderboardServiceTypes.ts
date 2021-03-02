import { PlayerPosition } from '@/types/commonTypes';

type LeaderboardRecord = {
  age: number;
  batter_datraks_id: number;
  batter_name: string;
  distance: number;
  exit_velocity: number;
  favorite: boolean;
  launch_angle: number;
  school: { id: string; name: string };
  teams: { id: string; name: string }[];
};

export type GetLeaderboardQuery = {
  type: 'exit_velocity' | 'carry_distance';
  date?: 'last_week' | 'last_month';
  school?: string;
  team?: string;
  position?: PlayerPosition;
  age?: number;
  favorite?: 1;
};
export type GetLeaderboardResponse = {
  data: {
    leaderboard_batting: { leaderboard_batting: LeaderboardRecord[] };
  };
};
