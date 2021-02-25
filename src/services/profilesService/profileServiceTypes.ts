import { PlayerPosition } from '@/types/commonTypes';

export type ProfileRecord = {
  age: number;
  events: any[];
  favorite: boolean;
  feet: number;
  first_name: string;
  id: string;
  inches: number | null;
  last_name: string;
  position: PlayerPosition;
  position2: PlayerPosition | '';
  school: {
    id: string;
    name: string;
  };
  school_year: string | null;
  teams: any[];
  weight: number;
};

export type ExtendedProfileRecord = {
  act_score: number;
  age: number;
  avatar: string | null;
  bats_hand: 'l' | 'r';
  batter_summary: {
    exit_velocity: number;
    distance: number;
    launch_angle: number;
  }[];
  batting_top_values: {
    distance: number;
    exit_velocity: number;
    launch_angle: number;
    pitch_type: string;
  }[];
  biography: string;
  broad_jump: number | null;
  events_opened: boolean;
  facilities: { email: string; id: string; u_name: string }[];
  favorite: boolean;
  feet: number;
  first_name: string;
  gpa_score: number;
  grip_left: number | null;
  grip_right: number | null;
  id: string;
  inches: number;
  last_name: string;
  paid: boolean;
  pitcher_summary: any[];
  pitching_top_values: any[];
  position: PlayerPosition;
  position2: PlayerPosition;
  recent_events: {
    data_rows_count: number;
    date: string;
    event_name: string;
    event_type: string;
    id: string;
    is_pitcher: boolean;
    recent_avatars: {
      avatar: string | null;
      first_name: string;
      id: string;
      last_name: string;
    }[];
  }[];
  sat_score: number;
  school: { id: string; name: string };
  school_year: string;
  teams: { id: string; name: string }[];
  throws_hand: 'l' | 'r';
  weight: number;
  wingspan: number | null;
  wrist_to_elbow: number | null;
};

export type CurrentProfileRecord = {
  age: number;
  avatar: {
    size_20_20: {
      url: string | null;
    };
    size_32_32: {
      url: string | null;
    };
    size_40_40: {
      url: string | null;
    };
    size_100_100: {
      url: string | null;
    };
    url: string | null;
  } | null;
  bats_hand: 'l' | 'r';
  biography: string;
  facilities: any[];
  feet: number;
  first_name: string;
  id: string;
  inches: number;
  last_name: string;
  position: PlayerPosition;
  position2: PlayerPosition | null;
  school: string | null;
  school_year: string | null;
  teams: any[];
  throws_hand: 'l' | 'r';
  weight: number;
};

export type GetProfilesQuery = {
  profiles_count: number;
  offset: number;
  school?: string;
  team?: string;
  position?: PlayerPosition;
  age?: number;
  favorite?: 1;
  player_name?: string;
};
export type GetProfilesResponse = {
  data: {
    profiles: {
      profiles: ProfileRecord[];
      total_count: number;
    };
  };
};

export type GetCurrentProfileResponse = {
  data: {
    current_profile: CurrentProfileRecord;
  };
};

export type GetProfileQuery = {
  id: string;
};
export type GetProfileResponse = {
  data: {
    profile: ExtendedProfileRecord;
  };
};
