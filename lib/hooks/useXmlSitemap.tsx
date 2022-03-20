import { useQuery } from "react-query";

import useKey from "./useKey";

import { Result } from "../interfaces/interfaces";
import { Page } from "../interfaces/pages";

import fetchData from "../drivers/fetchData";

const useXmlSitemap = (locale: string) => {
  const { oldKey } = useKey();

  const { data } = useQuery<Result<object>, Error>(
    ["xmlSitemap", locale],
    () => fetchData(`/locales/sitemap.xml?key=${oldKey}&url=${locale}`, "GET"),
    {
      enabled: !!oldKey && !!locale,
      refetchOnWindowFocus: false,
    }
  );

  return data?.result[0];
};

export default useXmlSitemap;
