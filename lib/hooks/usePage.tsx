import { useQuery } from "react-query";

import useKey from "./useKey";

import { Result } from "../interfaces/interfaces";
import { Page } from "../interfaces/pages";

import fetchData from "../drivers/fetchData";

const usePage = (pageId: string) => {
  const { oldKey } = useKey();

  const { data } = useQuery<Result<Page>, Error>(
    ["page", pageId],
    () => fetchData(`/pages?key=${oldKey}&id=${pageId}`),
    {
      enabled: !!oldKey && !!pageId,
      refetchOnWindowFocus: false,
    }
  );

  return data?.result[0];
};

export default usePage;
