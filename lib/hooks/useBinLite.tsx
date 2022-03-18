import { useQuery } from "react-query";

import useKey from "./useKey";

import { Result } from "../interfaces/interfaces";
import { BinLiteProduct } from "../interfaces/binLite";

import fetchData from "../drivers/fetchData";

const useBinLite = (locale: string) => {
  const { oldKey } = useKey();

  const { data } = useQuery<Result<BinLiteProduct>, Error>(
    ["binLite", locale],
    () => fetchData(`/binlite/retailers?key=${oldKey}&url=${locale}`),
    {
      enabled: !!oldKey && !!locale,
      refetchOnWindowFocus: false,
    }
  );

  return data?.result;
};

export default useBinLite;
