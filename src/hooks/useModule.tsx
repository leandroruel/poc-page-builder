import { useQuery } from "@tanstack/react-query";
import api from "@/api";

export const useModule = () => {
  const contextPath = import.meta.env.VITE_API_CONTEXT_PATH;
  const pageSize = 500;

  /**
   * Get all modules from the api
   * @param param0
   * @returns
   */
  const getModule = async () =>
    await api.get(`${contextPath}/setup/module/all/0/${pageSize}`);

  /**
   * Query function from @tanstack to retrieve the modules with infer types
   * and loading, cache and error handling.
   */
  const query = useQuery({ queryKey: ["entities"], queryFn: getModule });
  const { isLoading, error, data } = query;

  return {
    isLoading,
    error,
    data,
  };
};
