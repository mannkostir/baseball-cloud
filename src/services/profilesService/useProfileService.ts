import { profilesService } from '.';

export const useProfileService = () => {
  const toggleMyHolyFavor = async (id: number, isInFavor: boolean) => {
    await profilesService.updateFavoriteProfile({
      profile_id: id,
      favorite: isInFavor ? false : true,
    });
  };

  return { toggleMyHolyFavor };
};
