import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useCurrentUser = () => {
  // const { data, error, isLoading, mutate } = useSWR(
  //   "http://localhost:4000/api/current",
  //   fetcher
  // );

  //   const { data, error, isLoading, mutate } = useSWR("/api/currnet", fetcher);
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
