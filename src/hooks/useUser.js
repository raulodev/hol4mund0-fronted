import useSWR from "swr";
import { clientApi } from "@/services/api-client";

function useUser(accessToken) {

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
  const fetcher = url => clientApi.post(url, {}, config).then((res) => res.data)

  const { data, error, isLoading, mutate } = useSWR("/getme/", fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
    mutate: mutate,
  };

}

export default useUser;
