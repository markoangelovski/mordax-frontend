import { useQuery } from "react-query";

import useKey from "./useKey";

import { Result } from "../interfaces/interfaces";
import { Page } from "../interfaces/pages";

import fetchData from "../drivers/fetchData";
import progressBar from "../helpers/progressBar";

const useXmlSitemap = (locale: string) => {
  const { oldKey } = useKey();

  const { data, isLoading, isFetching, isFetched } = useQuery<
    Result<object>,
    Error
  >(
    ["xmlSitemap", locale],
    () => fetchData(`/locales/sitemap.xml?key=${oldKey}&url=${locale}`, "GET"),
    {
      enabled: !!oldKey && !!locale,
      refetchOnWindowFocus: false,
    }
  );

  progressBar(isLoading, isFetching, isFetched);

  return data?.result[0];
};

export default useXmlSitemap;
