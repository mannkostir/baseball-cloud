export type ProfileState = {
  firstName: string;
  lastName: string;
  fullName: string;
  currentProfileId: string;
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
  isLoading: boolean;
  error: string;
};
