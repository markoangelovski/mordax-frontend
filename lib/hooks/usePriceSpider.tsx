import { useQuery } from "react-query";

import useKey from "./useKey";

import { Result } from "../interfaces/interfaces";
import { BinLiteProduct } from "../interfaces/binLite";

import fetchData from "../drivers/fetchData";

const usePriceSpider = (accountId: string) => {
  const { oldKey } = useKey();

  const { data } = useQuery<Result<object>, Error>(
    ["priceSpider", accountId],
    () => fetchData(`/ps/int/1/${accountId}/config.js?key=${oldKey}`),
    {
      enabled: !!oldKey && !!accountId,
      refetchOnWindowFocus: false,
    }
  );

  return data?.result[0];
};

export default usePriceSpider;
