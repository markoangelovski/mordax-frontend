import { useQuery } from "react-query";

import useKey from "./useKey";

// import fetchData from "./useFetchData";

import fetchData from "../drivers/fetchData";

import { Result } from "../interfaces/interfaces";

const useLocales = () => {
  const { oldKey } = useKey();

  const { data } = useQuery<Result, Error>(
    "locales",
    () => fetchData(`/locales?key=${oldKey}`),
    { enabled: !!oldKey, refetchOnWindowFocus: false }
  );

  return data;
};

export default useLocales;
