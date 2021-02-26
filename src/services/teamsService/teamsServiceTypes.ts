import { Team } from '@/types/commonTypes';

export type GetTeamsQuery = {
  search: string;
};
export type GetTeamsResponse = {
  data: {
    teams: {
      teams: Team[];
    };
  };
};
