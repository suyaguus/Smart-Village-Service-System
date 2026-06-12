import { useState, useEffect } from 'react';
interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

interface UseFetchResult<T> extends FetchState<T> {
  refetch: () => void;
}

export function useFetch<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = [],
): UseFetchResult<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  // reloadKey dinaikkan saat refetch() dipanggil -> trigger useEffect
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    fetcher()
      .then((data) => {
        if (active) setState({ data, isLoading: false, error: null });
      })
      .catch((error: Error) => {
        if (active) setState({ data: null, isLoading: false, error });
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, reloadKey]);

  const refetch = () => setReloadKey((k) => k + 1);

  return { ...state, refetch };
}