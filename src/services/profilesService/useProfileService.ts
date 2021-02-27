import { profilesService } from '.';

export const useProfileService = () => {
  const toggleMyHolyFavor = async (
    id: number,
    isInFavor: boolean,
    onToggleFinished?: ({ isFavorite }: { isFavorite: boolean }) => void
  ) => {
    const data = await profilesService.updateFavoriteProfile({
      profile_id: id,
      favorite: isInFavor ? false : true,
    });

    onToggleFinished && onToggleFinished({ isFavorite: data.favorite });
  };

  return { toggleMyHolyFavor };
};
