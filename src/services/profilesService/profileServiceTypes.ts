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
