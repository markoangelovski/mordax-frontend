import { useQuery } from "react-query";

import useKey from "./useKey";

import fetchData from "../drivers/fetchData";

import { Result } from "../interfaces/interfaces";
import { User } from "../interfaces/user";

const useUser = (): User | undefined => {
  const { oldKey } = useKey();

  // TODO: Add check if backend returns error and redirect to login
  const { data } = useQuery<Result<User>, Error>(
    "user",
    () => fetchData(`/keys/key-info?key=${oldKey}&checkKey=${oldKey}`),
    { enabled: !!oldKey, refetchOnWindowFocus: false }
  );

  return data?.result[0];
};

export default useUser;
