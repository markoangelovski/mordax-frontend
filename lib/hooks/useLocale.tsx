import { useQuery } from "react-query";

import useKey from "./useKey";

import { Result } from "../interfaces/interfaces";
import { Locale, Metadata } from "../interfaces/locales";

import fetchData from "../drivers/fetchData";
import progressBar from "../helpers/progressBar";
import { useRouter } from "next/router";

const useLocale = (
  locale: string,
  pages?: boolean,
  filter?: string
): Result<Locale> | undefined => {
  const { oldKey } = useKey();

  const router = useRouter();

  const queryParams = new URLSearchParams({
    key: oldKey as string,
    url: locale,
    includePages: pages?.toString() || "false"
  });
  if (filter) queryParams.append("filter", filter);

  const { data, isLoading, isFetching, isFetched } = useQuery<
    Result<Locale>,
    Error
  >(
    ["locale", locale],
    () =>
      fetchData(
        // `/locales/single?key=${oldKey}&url=${locale}&includePages=${pages}`,
        `/locales/single?${queryParams}`,
        "GET"
      ),
    {
      enabled: !!oldKey && !!locale && locale !== "undefined",
      refetchOnWindowFocus: false
    }
  );

  // When any errors occurr with the selected locale, refresh the URL to /locales in order to reload to first default locale.
  if (data?.hasErrors)
    router.push("/locales", undefined, {
      shallow: true
    });

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
