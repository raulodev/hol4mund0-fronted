import useSWR from "swr";
import { clientApi } from "@/services/api-client";

const fetcher = (url) => clientApi(url).then((res) => res.data);

function useFetch(url) {


  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    isLoading,
    isError: error,
    mutate
  };
}

export default useFetch;
