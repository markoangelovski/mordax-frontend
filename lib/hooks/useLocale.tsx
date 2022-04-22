import { useQuery } from "react-query";

import useKey from "./useKey";

import { Result } from "../interfaces/interfaces";
import { Locale, Metadata } from "../interfaces/locales";

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

  // When any errors occurr with the selected locale, refresh the URL to /locales in order to reload to first default locale.
  // if (data?.hasErrors) window.location.href = "/locales";

  progressBar(isLoading, isFetching, isFetched);

  return data;
};

export default useLocale;

export const useLocaleMetadata = (
  locale: string,
  trigger: boolean
): Result<Metadata> | undefined => {
  const { oldKey } = useKey();

  const { data, isLoading, isFetching, isFetched } = useQuery<
    Result<Metadata>,
    Error
  >(
    ["metadata", locale],
    () => fetchData(`/locales/metadata?key=${oldKey}&url=${locale}`, "GET"),
    {
      enabled: !!oldKey && !!locale && locale !== "undefined" && trigger,
      refetchOnWindowFocus: false
    }
  );

  progressBar(isLoading, isFetching, isFetched);

  return data;
};
