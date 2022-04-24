import { useQuery } from "react-query";

import useKey from "./useKey";

// import fetchData from "./useFetchData";

import fetchData from "../drivers/fetchData";

import { Result } from "../interfaces/interfaces";
import { Locale } from "../interfaces/locales";
import progressBar from "../helpers/progressBar";

const useLocales = (
  sort: string,
  paginationPage?: number,
  perPage?: number
): Result<Locale> | undefined => {
  const skip = 0;
  const { oldKey } = useKey();

  const { data, isLoading, isFetching, isFetched } = useQuery<
    Result<Locale>,
    Error
  >(
    ["locales", sort, perPage],
    () =>
      fetchData(
        `/locales?key=${oldKey}&sort=${sort}&skip=${skip}&limit=${perPage}`,
        "GET"
      ),
    {
      enabled: !!oldKey,
      refetchOnWindowFocus: false,
      keepPreviousData: true
    }
  );

  progressBar(isLoading, isFetching, isFetched);

  return data;
};

export default useLocales;
