import { useQuery } from "react-query";

import useKey from "./useKey";

import { Result } from "../interfaces/interfaces";
import { BinLiteProduct } from "../interfaces/binLite";

import fetchData from "../drivers/fetchData";
import progressBar from "../helpers/progressBar";

const useBinLite = (locale: string) => {
  const { oldKey } = useKey();

  const { data, isLoading, isFetching, isFetched } = useQuery<
    Result<BinLiteProduct>,
    Error
  >(
    ["binLite", locale],
    () => fetchData(`/binlite/retailers?key=${oldKey}&url=${locale}`, "GET"),
    {
      enabled: !!oldKey && !!locale,
      refetchOnWindowFocus: false,
    }
  );

  progressBar(isLoading, isFetching, isFetched);

  return data?.result;
};

export default useBinLite;