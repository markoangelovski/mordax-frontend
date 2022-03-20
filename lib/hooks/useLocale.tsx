import { useQuery } from "react-query";

import useKey from "./useKey";

import { Result } from "../interfaces/interfaces";
import { Locale } from "../interfaces/locales";

import fetchData from "../drivers/fetchData";

const useLocale = (locale: string, pages: boolean) => {
  const { oldKey } = useKey();

  const { data } = useQuery<Result<Locale>, Error>(
    ["locale", locale],
    () =>
      fetchData(
        `/locales/single?key=${oldKey}&url=${locale}&includePages=${pages}`,
        "GET"
      ),
    {
      enabled: !!oldKey && !!locale && locale !== "undefined",
      refetchOnWindowFocus: false,
    }
  );

  return data?.result[0];
};

export default useLocale;
