import { profilesAPI } from '.';

export const useProfileService = () => {
  const toggleMyHolyFavor = async (id: number, isInFavor: boolean) => {
    await profilesAPI.updateFavoriteProfile({
      profile_id: id,
      favorite: isInFavor ? false : true,
    });
  };

  return { toggleMyHolyFavor };
};
