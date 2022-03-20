import { useQuery } from "react-query";

import useKey from "./useKey";

import { Result } from "../interfaces/interfaces";
import { BinLiteProduct } from "../interfaces/binLite";

import fetchData from "../drivers/fetchData";
import { SmartCommerceProduct } from "../interfaces/smartCommerce";

const useSmartCommerce = (
  endpoint: string,
  page: string,
  mpIdFieldName: string
) => {
  const { oldKey } = useKey();

  const { data } = useQuery<Result<SmartCommerceProduct | object>, Error>(
    [endpoint, page],
    () =>
      fetchData(
        `/sc/${endpoint}?key=${oldKey}&url=${page}&mpIdFieldName=${mpIdFieldName}`,
        "GET"
      ),
    {
      enabled: !!endpoint && !!oldKey && !!page && !!mpIdFieldName,
      refetchOnWindowFocus: false,
    }
  );

  return data?.result;
};

export default useSmartCommerce;
