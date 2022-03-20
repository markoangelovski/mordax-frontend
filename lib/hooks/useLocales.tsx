import { useQuery } from "react-query";

import useKey from "./useKey";

// import fetchData from "./useFetchData";

import fetchData from "../drivers/fetchData";

import { Result } from "../interfaces/interfaces";
import { Locale } from "../interfaces/locales";
import progressBar from "../helpers/progressBar";

const useLocales = (): Locale[] | undefined => {
  const { oldKey } = useKey();

  const { data, isLoading, isFetching, isFetched } = useQuery<
    Result<Locale>,
    Error
  >("locales", () => fetchData(`/locales?key=${oldKey}`, "GET"), {
    enabled: !!oldKey,
    refetchOnWindowFocus: false,
  });

  progressBar(isLoading, isFetching, isFetched);

  return data?.result;
};

export default useLocales;
