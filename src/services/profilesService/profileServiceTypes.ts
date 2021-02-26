import {
  Facility,
  PlayerPosition,
  School,
  SchoolYear,
  Team,
} from '@/types/commonTypes';

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
  school: School;
  school_year: SchoolYear;
  teams: Team[];
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
  facilities: Facility[];
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
  position2: PlayerPosition | null;
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
  school: School;
  school_year: SchoolYear;
  teams: Team[];
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
  facilities: Facility[];
  feet: number;
  first_name: string;
  id: string;
  inches: number;
  last_name: string;
  position: PlayerPosition;
  position2: PlayerPosition | null;
  school: School;
  school_year: SchoolYear;
  teams: Team[];
  throws_hand: 'l' | 'r';
  weight: number;
};

export type GetProfilesQuery = {
  profiles_count: number;
  offset: number;
  school?: School;
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

export type UpdateProfileQuery = {
  avatar?: string | null;
  feet?: number;
  inches?: number;
  weight?: number;
  age?: number;
  school_year?: SchoolYear;
  bats_hand?: 'l' | 'r';
  biography?: string;
  first_name?: string;
  id: string;
  last_name?: string;
  position?: PlayerPosition;
  position2?: PlayerPosition | null;
  school?: School;
  teams: Team[];
  throws_hand?: 'l' | 'r';
  facilities: Facility[];
};
export type UpdateProfileResponse = {
  data: {
    update_profile: {
      profile: {
        age: number;
        avatar: string | null;
        bats_hand: 'l' | 'r';
        biography: string;
        facilities: Facility[];
        feet: number;
        first_name: string;
        id: string;
        inches: number;
        last_name: string;
        position: PlayerPosition;
        position2: PlayerPosition | null;
        recentEvents: any[];
        school: School;
        school_year: SchoolYear;
        teams: Team[];
        throws_hand: 'l' | 'r';
        weight: number;
      };
    };
  };
};
