import { useEffect } from 'react';

export const useMount = (callback: () => void) => useEffect(callback, []); // eslint-disable-line react-hooks/exhaustive-deps
