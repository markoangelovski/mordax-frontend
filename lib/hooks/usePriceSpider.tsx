import { useQuery } from "react-query";

import useKey from "./useKey";

import { Result } from "../interfaces/interfaces";
import { BinLiteProduct } from "../interfaces/binLite";

import fetchData from "../drivers/fetchData";
import progressBar from "../helpers/progressBar";

export const usePsConfig = (active: string, accountId: string) => {
  const { oldKey } = useKey();

  const trigger = active === "config";

  const { data, isLoading, isFetching, isFetched } = useQuery<
    Result<object>,
    Error
  >(
    ["psConfig", accountId],
    () => fetchData(`/ps/int/1/${accountId}/config.js?key=${oldKey}`, "GET"),
    {
      enabled: !!trigger && !!oldKey && !!accountId,
      refetchOnWindowFocus: false,
    }
  );

  progressBar(isLoading, isFetching, isFetched);

  return data?.result[0];
};

export const usePsCidConfig = (
  active: string,
  accountId: string,
  cid: string
) => {
  const { oldKey } = useKey();

  const trigger = active === "cidConfig";

  const { data, isLoading, isFetching, isFetched } = useQuery<
    Result<object>,
    Error
  >(
    ["psCidConfig", trigger, accountId, cid],
    () =>
      fetchData(`/ps/int/1/${accountId}/${cid}/config.js?key=${oldKey}`, "GET"),
    {
      enabled: !!trigger && !!oldKey && !!accountId && !!cid,
      refetchOnWindowFocus: false,
    }
  );

  progressBar(isLoading, isFetching, isFetched);

  return data?.result[0];
};

export const usePsDataSkusMap = (active: string, accountId: string) => {
  const { oldKey } = useKey();

  const trigger = active === "dataSkusMap";

  const { data, isLoading, isFetching, isFetched } = useQuery<
    Result<object>,
    Error
  >(
    ["psDataSkusMap", trigger, accountId],
    () =>
      fetchData(`/ps/int/1/${accountId}/data/skus/map.js?key=${oldKey}`, "GET"),
    {
      enabled: !!trigger && !!oldKey && !!accountId,
      refetchOnWindowFocus: false,
    }
  );

  progressBar(isLoading, isFetching, isFetched);

  return data?.result[0];
};
