import { profilesAPI } from '@/api/profiles';
import { GetProfilesQuery } from '@/api/profiles/profilesAPITypes';
import { Unpromise } from '@/types/commonTypes';
import { useState } from 'react';

type ProfilesType = Unpromise<
  ReturnType<typeof profilesAPI.getProfiles>
>['profiles'];

type ProfilesTotalCountType = Unpromise<
  ReturnType<typeof profilesAPI.getProfiles>
>['total_count'];

export const useNetwork = () => {
  const defaultQuery: GetProfilesQuery = {
    profiles_count: 10,
    offset: 0,
  };

  const [isLoading, setIsLoading] = useState(false);

  const [profiles, setProfiles] = useState<ProfilesType>([]);
  const [
    profilesTotalCount,
    setProfilesTotalCount,
  ] = useState<ProfilesTotalCountType>(0);

  const fetchNetwork = async (fetchQuery: Partial<GetProfilesQuery>) => {
    try {
      setIsLoading(true);

      const profilesResponse = await profilesAPI.getProfiles({
        ...defaultQuery,
        ...fetchQuery,
      });

      setProfiles(profilesResponse.profiles);
      setProfilesTotalCount(profilesResponse.total_count);
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchNetwork, profiles, profilesTotalCount, isLoading };
};
