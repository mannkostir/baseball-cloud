import { School } from '@/types/commonTypes';

export type GetSchoolsQuery = {
  search: '';
};
export type GetSchoolsResponse = {
  data: {
    schools: {
      schools: School[];
    };
  };
};
