import fetchAPI from '@/services';
import { GetSignedUrlQuery, GetSignedUrlResponse } from './utilsServiceTypes';

export const getSignedUrl = async (query: GetSignedUrlQuery) => {
  const res = await fetchAPI.post<GetSignedUrlResponse>('s3/signed_url', {
    name: query.name,
  });

  await fetchAPI.put(
    res.data.signedUrl,
    {},
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );

  return res.data;
};
