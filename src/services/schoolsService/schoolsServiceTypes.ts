import { School } from '@/types/commonTypes';

export type GetSchoolsQuery = {
  search: string;
};
export type GetSchoolsResponse = {
  data: {
    schools: {
      schools: School[];
    };
  };
};
