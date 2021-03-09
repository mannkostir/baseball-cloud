import { PlayerPosition, School, Team } from '@/types/commonTypes';

export type GetLeaderboardQuery = {
  type: 'exit_velocity' | 'carry_distance' | 'pitch_velocity' | 'spin_rate';
  date?: 'last_week' | 'last_month';
  school?: string;
  team?: string;
  position?: PlayerPosition;
  age?: number;
  favorite?: 1;
};
export type GetLeaderboardResponse = {
  data: {
    leaderboard_batting: {
      leaderboard_batting: {
        age: number;
        batter_datraks_id: number;
        batter_name: string;
        distance: number;
        exit_velocity: number;
        favorite: boolean;
        launch_angle: number;
        school: { id: string; name: string };
        teams: { id: string; name: string }[];
      }[];
    };
  };
};

export type GetPitchingLeaderboardResponse = {
  data: {
    leaderboard_pitching: {
      leaderboard_pitching: {
        age: number;
        favorite: boolean;
        horizontal_break: number | null;
        pitch_type: string;
        pitcher_datraks_id: number;
        pitcher_name: string;
        school: School;
        spin_rate: number;
        teams: Team[];
        velocity: number;
        vertical_break: number | null;
      }[];
    };
  };
};
