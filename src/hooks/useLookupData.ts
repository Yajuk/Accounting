import { useState, useEffect, useCallback } from "react";

export interface IOption<T> {
  name: string;
  description?: string;
  _id: string;
  details: T;
}

interface IUseLookupData<T> {
  options: IOption<T>[];
  loading: boolean;
  error: Error | null;
  fetchData: () => Promise<void>;
}

export function useLookupData<T>(
  fetchFunction: () => Promise<unknown>,
): IUseLookupData<T> {
  const [options, setOptions] = useState<IOption<T>[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = (await fetchFunction()) as
        | { data: T[] }
        | {
            data: {
              data: T[];
            };
          };
      const data = "data" in result ? result.data : result;
      const dataArray = Array.isArray(data) ? data : data.data || [];

      const mappedOptions = dataArray.map((item: any) => ({
        name: item.name || item.groupName || item.ledgerName,
        _id: item._id,
        description: item.description,
        details: item,
      }));

      setOptions(mappedOptions);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { options, loading, error, fetchData };
}
