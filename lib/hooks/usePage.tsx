import { useQuery } from "react-query";

import useKey from "./useKey";

import { Result } from "../interfaces/interfaces";
import { Page } from "../interfaces/pages";

import fetchData from "../drivers/fetchData";
import progressBar from "../helpers/progressBar";

export const usePages = (localeUrl: string, sort: string) => {
  const { oldKey } = useKey();

  const { data, isLoading, isFetching, isFetched } = useQuery<
    Result<Page>,
    Error
  >(
    ["pages", localeUrl + sort],
    () =>
      fetchData(
        `/pages?key=${oldKey}&localeUrl=${localeUrl}&sort=${sort}`,
        "GET"
      ),
    {
      enabled: !!oldKey && !!localeUrl,
      refetchOnWindowFocus: false
    }
  );

  progressBar(isLoading, isFetching, isFetched);

  return data;
};

export const usePage = (pageId: string) => {
  const { oldKey } = useKey();

  const { data, isLoading, isFetching, isFetched } = useQuery<
    Result<Page>,
    Error
  >(
    ["page", pageId],
    () => fetchData(`/pages/single?key=${oldKey}&id=${pageId}`, "GET"),
    {
      enabled: !!oldKey && !!pageId,
      refetchOnWindowFocus: false
    }
  );

  progressBar(isLoading, isFetching, isFetched);

  return data?.result[0];
};
