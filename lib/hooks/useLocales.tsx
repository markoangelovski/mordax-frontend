import { useQuery } from "react-query";

import useKey from "./useKey";

// import fetchData from "./useFetchData";

import fetchData from "../drivers/fetchData";

import { Result } from "../interfaces/interfaces";
import { Locale } from "../interfaces/locales";
import progressBar from "../helpers/progressBar";

const useLocales = (sort: string): Result<Locale> | undefined => {
  const { oldKey } = useKey();

  const { data, isLoading, isFetching, isFetched } = useQuery<
    Result<Locale>,
    Error
  >(
    ["locales", sort],
    () => fetchData(`/locales?key=${oldKey}&sort=${sort}`, "GET"),
    {
      enabled: !!oldKey,
      refetchOnWindowFocus: false
    }
  );

  progressBar(isLoading, isFetching, isFetched);

  return data;
};

export default useLocales;
