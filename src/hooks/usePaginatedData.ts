import { useState, useEffect, useCallback } from "react";

interface FetchFunctionResult<T> {
  data: { data: T[]; totalPages: number };
  success: boolean;
  statusCode: number;
}

type FetchFunction<T> = (
  page: number,
  limit: number,
  searchTerm: string
) => Promise<FetchFunctionResult<T>>;

interface UsePaginatedDataOptions {
  initialPage?: number;
  initialLimit?: number;
  initialSearchTerm?: string;
}

export function usePaginatedData<T>(
  fetchFunction: FetchFunction<T>,
  options: UsePaginatedDataOptions = {}
) {
  const {
    initialPage = 1,
    initialLimit = 10,
    initialSearchTerm = "",
  } = options;

  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetchFunction(currentPage, limit, searchTerm);

      const { data: responseData, totalPages } = response.data;
      console.log(response);
      setData(responseData);
      setTotalPages(totalPages);

      setError(null);
    } catch (err) {
      setError("Failed to fetch data.");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, limit, searchTerm, fetchFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    currentPage,
    totalPages,
    limit,
    searchTerm,
    setCurrentPage,
    setLimit,
    setSearchTerm,
    refetch: fetchData,
  };
}
