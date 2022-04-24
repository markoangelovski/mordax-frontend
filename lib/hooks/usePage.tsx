import { useQuery } from "react-query";

import useKey from "./useKey";

import { Result } from "../interfaces/interfaces";
import { Page } from "../interfaces/pages";

import fetchData from "../drivers/fetchData";
import progressBar from "../helpers/progressBar";

export const usePages = (
  localeUrl: string,
  sort: string,
  paginationPage: number,
  perPage: number
) => {
  const skip = paginationPage * perPage;
  const { oldKey } = useKey();

  const { data, isLoading, isFetching, isFetched } = useQuery<
    Result<Page>,
    Error
  >(
    ["pages", localeUrl + sort, perPage],
    () =>
      fetchData(
        `/pages?key=${oldKey}&localeUrl=${localeUrl}&sort=${sort}&skip=${skip}&limit=${perPage}`,
        "GET"
      ),
    {
      enabled: !!oldKey && !!localeUrl,
      refetchOnWindowFocus: false,
      keepPreviousData: true
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
