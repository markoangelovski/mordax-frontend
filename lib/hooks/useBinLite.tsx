import { useQuery } from "react-query";

import useKey from "./useKey";

import { Result } from "../interfaces/interfaces";
import { BinLiteProduct } from "../interfaces/binLite";

import fetchData from "../drivers/fetchData";
import progressBar from "../helpers/progressBar";

const useBinLite = (locale: string, hasBnl?: boolean) => {
  const { oldKey } = useKey();

  // If hasBnl argument is not passed, set it to true in order to fetch BNL data.
  // /binlite page uses this hook without the hasBnl flag in order to fetch BIN Lite data for all locales.
  // /pages/edit uses this hook with hasBnl flag in order to fetch BIN Lite data only for locales that have BIN Lite
  if (typeof hasBnl === "undefined") hasBnl = true;

  const { data, isLoading, isFetching, isFetched } = useQuery<
    Result<BinLiteProduct>,
    Error
  >(
    ["binLite", locale],
    () => fetchData(`/binlite/retailers?key=${oldKey}&url=${locale}`, "GET"),
    {
      enabled: !!oldKey && !!locale && hasBnl,
      refetchOnWindowFocus: false
    }
  );

  progressBar(isLoading, isFetching, isFetched);

  return data;
};

export default useBinLite;

export const useBinLiteSingleProduct = (locale: string, BINLiteSku: string) => {
  const { oldKey } = useKey();

  const { data, isLoading, isFetching, isFetched } = useQuery<
    Result<BinLiteProduct>,
    Error
  >(
    ["binLite", locale, BINLiteSku],
    () =>
      fetchData(
        `/binlite/product?key=${oldKey}&url=${locale}&BINLiteSku=${BINLiteSku}`,
        "GET"
      ),
    {
      enabled: !!oldKey && !!locale && !!BINLiteSku,
      refetchOnWindowFocus: false
    }
  );

  progressBar(isLoading, isFetching, isFetched);

  return data;
};
