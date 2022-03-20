import { useQuery } from "react-query";

import useKey from "./useKey";

import { Result } from "../interfaces/interfaces";
import { Page } from "../interfaces/pages";

import fetchData from "../drivers/fetchData";
import progressBar from "../helpers/progressBar";

const usePage = (pageId: string) => {
  const { oldKey } = useKey();

  const { data, isLoading, isFetching, isFetched } = useQuery<
    Result<Page>,
    Error
  >(
    ["page", pageId],
    () => fetchData(`/pages?key=${oldKey}&id=${pageId}`, "GET"),
    {
      enabled: !!oldKey && !!pageId,
      refetchOnWindowFocus: false,
    }
  );

  progressBar(isLoading, isFetching, isFetched);

  return data?.result[0];
};

export default usePage;
