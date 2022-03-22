import { useQuery } from "react-query";

import useKey from "./useKey";

import fetchData from "../drivers/fetchData";

import { Result } from "../interfaces/interfaces";
import { User } from "../interfaces/user";
import progressBar from "../helpers/progressBar";
import { useRouter } from "next/router";

const useUser = (): User | undefined => {
  const router = useRouter();

  const { oldKey } = useKey();

  const { data, isLoading, isFetching, isFetched } = useQuery<
    Result<User>,
    Error
  >(
    "user",
    () => fetchData(`/keys/key-info?key=${oldKey}&checkKey=${oldKey}`, "GET"),
    { enabled: !!oldKey, refetchOnWindowFocus: false }
  );

  progressBar(isLoading, isFetching, isFetched);

  // TODO: Add check if backend returns error and redirect to login
  if (data?.hasErrors)
    router.push("/login", undefined, {
      shallow: true
    });

  return data?.result[0];
};

export default useUser;
