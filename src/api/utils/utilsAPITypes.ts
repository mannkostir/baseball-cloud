export type GetSignedUrlQuery = {
  name: string;
  avatarFile: File | null;
};
export type GetSignedUrlResponse = {
  fileKey: string;
  fileName: string;
  signedUrl: string;
};
