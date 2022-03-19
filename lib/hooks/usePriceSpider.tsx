import { useQuery } from "react-query";

import useKey from "./useKey";

import { Result } from "../interfaces/interfaces";
import { BinLiteProduct } from "../interfaces/binLite";

import fetchData from "../drivers/fetchData";

export const usePsConfig = (active: string, accountId: string) => {
  const { oldKey } = useKey();

  const trigger = active === "config";

  const { data } = useQuery<Result<object>, Error>(
    ["psConfig", accountId],
    () => fetchData(`/ps/int/1/${accountId}/config.js?key=${oldKey}`),
    {
      enabled: !!trigger && !!oldKey && !!accountId,
      refetchOnWindowFocus: false,
    }
  );

  return data?.result[0];
};

export const usePsCidConfig = (
  active: string,
  accountId: string,
  cid: string
) => {
  const { oldKey } = useKey();

  const trigger = active === "cidConfig";

  const { data } = useQuery<Result<object>, Error>(
    ["psCidConfig", trigger, accountId, cid],
    () => fetchData(`/ps/int/1/${accountId}/${cid}/config.js?key=${oldKey}`),
    {
      enabled: !!trigger && !!oldKey && !!accountId && !!cid,
      refetchOnWindowFocus: false,
    }
  );

  return data?.result[0];
};

export const usePsDataSkusMap = (active: string, accountId: string) => {
  const { oldKey } = useKey();

  const trigger = active === "dataSkusMap";

  const { data } = useQuery<Result<object>, Error>(
    ["psDataSkusMap", trigger, accountId],
    () => fetchData(`/ps/int/1/${accountId}/data/skus/map.js?key=${oldKey}`),
    {
      enabled: !!trigger && !!oldKey && !!accountId,
      refetchOnWindowFocus: false,
    }
  );

  return data?.result[0];
};
