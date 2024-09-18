import { useQuery } from "@tanstack/react-query";
import api from "@/api";

export const useModule = (userToken: string) => {
  const contextPath = import.meta.env.VITE_API_CONTEXT_PATH;
  const pageSize = 500;

  /**
   * Get all modules from the api
   * @param param0
   * @returns
   */
  const getModule = async () =>
    await api(userToken).get(`${contextPath}/setup/module/all/0/${pageSize}`);

  /**
   * Query function from @tanstack to retrieve the modules with infer types
   * and loading, cache and error handling.
   */
  const query = useQuery({ queryKey: ["entities"], queryFn: getModule, gcTime: 0 });
  const { isLoading, error, data } = query;

  return {
    isLoading,
    error,
    data,
  };
};
