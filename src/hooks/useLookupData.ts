import { useState, useEffect, useCallback } from "react";

export interface IOption {
  name: string;
  description?: string;
  _id: string;
}

interface IUseLookupData<T> {
  options: IOption[];
  loading: boolean;
  error: Error | null;
  fetchData: (searchTerm: string) => Promise<void>;
}

export function useLookupData<T>(
  fetchFunction: () => Promise<unknown>,
  mapOption: (item: T) => IOption,
): IUseLookupData<T> {
  const [options, setOptions] = useState<IOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const data = (await fetchFunction()) as
        | { data: T[] }
        | {
            data: {
              data: T[];
            };
          };
      const dataArray = "data" in data.data ? data.data.data : data.data;
      if (dataArray.length === 0) {
        setOptions([]);
        return;
      }
      const mappedOptions = dataArray.map(mapOption);
      setOptions(mappedOptions);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, mapOption]);
  useEffect(() => {
    fetchData(); // Fetch data when the hook is initialized
  }, [fetchData]);

  return {
    options,
    loading,
    error,
    fetchData,
  };
}
