import { useQuery } from "react-query";

import useKey from "./useKey";

import { Result } from "../interfaces/interfaces";

import fetchData from "../drivers/fetchData";

const useLocale = (locale: string, pages: boolean) => {
  const { oldKey } = useKey();

  const { data } = useQuery<Result, Error>(
    ["locale", locale],
    () =>
      fetchData(
        `/locales/single?key=${oldKey}&url=${locale}&includePages=${pages}`
      ),
    {
      enabled: !!oldKey && !!locale && locale !== "undefined",
      refetchOnWindowFocus: false,
    }
  );

  return data;
  // return locale;
};

export default useLocale;
