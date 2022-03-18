import { useQuery } from "react-query";

import useKey from "./useKey";

// import fetchData from "./useFetchData";

import fetchData from "../drivers/fetchData";

import { Result, Locale } from "../interfaces/interfaces";

const useLocales = (): Locale[] | undefined => {
  const { oldKey } = useKey();

  const { data } = useQuery<Result<Locale>, Error>(
    "locales",
    () => fetchData(`/locales?key=${oldKey}`),
    { enabled: !!oldKey, refetchOnWindowFocus: false }
  );

  return data?.result;
};

export default useLocales;