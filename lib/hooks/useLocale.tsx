import { useQuery } from "react-query";

import useKey from "./useKey";

import { Result } from "../interfaces/interfaces";
import { Locale } from "../interfaces/locales";

import fetchData from "../drivers/fetchData";
import progressBar from "../helpers/progressBar";

const useLocale = (
  locale: string,
  pages?: boolean
): Result<Locale> | undefined => {
  const { oldKey } = useKey();

  const { data, isLoading, isFetching, isFetched } = useQuery<
    Result<Locale>,
    Error
  >(
    ["locale", locale],
    () =>
      fetchData(
        `/locales/single?key=${oldKey}&url=${locale}&includePages=${pages}`,
        "GET"
      ),
    {
      enabled: !!oldKey && !!locale && locale !== "undefined",
      refetchOnWindowFocus: false
    }
  );

  progressBar(isLoading, isFetching, isFetched);

  return data;
};

export default useLocale;
