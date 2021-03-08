export type ProfileState = {
  firstName: string;
  lastName: string;
  fullName: string;
  currentProfileId: string;
  avatar: string | null;
  isLoading: boolean;
  error: string;
};
