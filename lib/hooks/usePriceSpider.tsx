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
      refetchOnWindowFocus: false
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
      refetchOnWindowFocus: false
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
      refetchOnWindowFocus: false
    }
  );

  progressBar(isLoading, isFetching, isFetched);

  return data?.result[0];
};

export const usePsCidResLang = (
  active: string,
  accountId: string,
  cid: string,
  lang: string | null
) => {
  const { oldKey } = useKey();

  const trigger = active === "cidResLang";

  const { data, isLoading, isFetching, isFetched } = useQuery<
    Result<object>,
    Error
  >(
    ["cidResLang", trigger, accountId, cid, lang],
    () =>
      fetchData(
        `/ps/int/1/${accountId}/${cid}/res/${lang}.js?key=${oldKey}`,
        "GET"
      ),
    {
      enabled: !!trigger && !!oldKey && !!accountId && !!cid && !!lang,
      refetchOnWindowFocus: false
    }
  );

  progressBar(isLoading, isFetching, isFetched);

  return data?.result[0];
};

interface PsDataSkusCountrySkuResult {
  productId: number;
}

export const usePsDataSkusCountrySku = (
  active: string,
  accountId: string,
  countryCode: string | null,
  sku: string | undefined
) => {
  const { oldKey } = useKey();

  const trigger = active === "dataSkusCountrySku";

  const { data, isLoading, isFetching, isFetched } = useQuery<
    Result<PsDataSkusCountrySkuResult>,
    Error
  >(
    ["dataSkusCountrySku", trigger, accountId, countryCode, sku],
    () =>
      fetchData(
        `/ps/int/1/${accountId}/data/skus/${countryCode}/${sku}.js?key=${oldKey}`,
        "GET"
      ),
    {
      enabled: !!trigger && !!oldKey && !!accountId && !!countryCode && !!sku,
      refetchOnWindowFocus: false
    }
  );

  progressBar(isLoading, isFetching, isFetched);

  if (data?.hasErrors) return data.errors[0];

  return data?.result[0];
};

export const usePsDataProductsPid = (
  active: string,
  accountId: string,
  countryCode: string | null,
  sku: string | undefined
) => {
  const { oldKey } = useKey();

  const trigger = active === "dataProductsPid";

  const { data: dataSkusCountrySku } = useQuery<
    Result<PsDataSkusCountrySkuResult>,
    Error
  >(
    ["dataSkusCountrySku", trigger, accountId, countryCode, sku],
    () =>
      fetchData(
        `/ps/int/1/${accountId}/data/skus/${countryCode}/${sku}.js?key=${oldKey}`,
        "GET"
      ),
    {
      enabled: !!trigger && !!oldKey && !!accountId && !!countryCode && !!sku,
      refetchOnWindowFocus: false
    }
  );

  const pid = dataSkusCountrySku?.result[0]?.productId;

  const { data, isLoading, isFetching, isFetched } = useQuery<
    Result<object>,
    Error
  >(
    ["dataProductsPid", trigger, accountId, pid],
    () =>
      fetchData(
        `/ps/int/1/${accountId}/data/products/${pid}.js?key=${oldKey}`,
        "GET"
      ),
    {
      enabled: !!trigger && !!oldKey && !!accountId && !!pid,
      refetchOnWindowFocus: false
    }
  );

  progressBar(isLoading, isFetching, isFetched);

  if (dataSkusCountrySku?.hasErrors) return dataSkusCountrySku.errors[0];

  if (data?.hasErrors) return data.errors[0];

  return data?.result[0];
};

interface PsDataFamiliesCountryInstanceResult {
  skus: {
    key: string;
    product: { id: number; title: string };
    attributes: { "Product Type": string; Size: string };
  }[];
}

export const usePsDataFamiliesCountryInstance = (
  active: string,
  accountId: string,
  countryCode: string | null,
  instance: string | null
) => {
  const { oldKey } = useKey();

  const trigger = active === "dataFamiliesCountryInstance";

  const { data, isLoading, isFetching, isFetched } = useQuery<
    Result<PsDataFamiliesCountryInstanceResult>,
    Error
  >(
    ["dataFamiliesCountryInstance", trigger, accountId, countryCode, instance],
    () =>
      fetchData(
        `/ps/int/1/${accountId}/data/families/${countryCode}/${instance}.js?key=${oldKey}`,
        "GET"
      ),
    {
      enabled:
        !!trigger && !!oldKey && !!accountId && !!countryCode && !!instance,
      refetchOnWindowFocus: false
    }
  );

  progressBar(isLoading, isFetching, isFetched);

  // if (data?.hasErrors) return data.errors[0];

  // return data?.result[0];
  return data;
};

export const usePsPostalMapCountry = (
  active: string,
  countryCode: string | null
) => {
  const { oldKey } = useKey();

  const trigger = active === "postalMapCountry";

  const { data, isLoading, isFetching, isFetched } = useQuery<
    Result<object>,
    Error
  >(
    ["postalMapCountry", trigger, countryCode],
    () =>
      fetchData(`/ps/int/1/postal-map/${countryCode}.js?key=${oldKey}`, "GET"),
    {
      enabled: !!trigger && !!oldKey && !!countryCode,
      refetchOnWindowFocus: false
    }
  );

  progressBar(isLoading, isFetching, isFetched);

  if (data?.hasErrors) return data.errors[0];

  return data?.result[0];
};

export const usePsDataStoresCountryRegionPid = (
  active: string,
  accountId: string,
  countryCode: string | null,
  areaCode: string | null,
  sku: string | undefined
) => {
  const { oldKey } = useKey();

  // const trigger = active === "dataStoresCountryRegionPid";

  const { data: dataSkusCountrySku } = useQuery<
    Result<PsDataSkusCountrySkuResult>,
    Error
  >(
    ["dataSkusCountrySku", /* trigger, */ accountId, countryCode, sku],
    () =>
      fetchData(
        `/ps/int/1/${accountId}/data/skus/${countryCode}/${sku}.js?key=${oldKey}`,
        "GET"
      ),
    {
      enabled:
        /* !!trigger && */ !!oldKey && !!accountId && !!countryCode && !!sku,
      refetchOnWindowFocus: false
    }
  );

  const pid = dataSkusCountrySku?.result[0]?.productId;

  const { data: postalMapCountry } = useQuery<Result<object>, Error>(
    ["postalMapCountry", /* trigger, */ countryCode],
    () =>
      fetchData(`/ps/int/1/postal-map/${countryCode}.js?key=${oldKey}`, "GET"),
    {
      enabled: /* !!trigger && */ !!oldKey && !!countryCode,
      refetchOnWindowFocus: false
    }
  );

  let slug = "";
  switch (active) {
    case "dataStoresCountryRegionPid":
      slug = "stores";
      break;
    case "dataStockCountryRegionPid":
      slug = "stock";
      break;
    case "dataRegionalPricingCountryRegionPid":
      slug = "regionalPricing";
      break;
  }

  const {
    data: dataStoresCountryRegionPid,
    isLoading,
    isFetching,
    isFetched
  } = useQuery<Result<object>, Error>(
    [
      "dataStoresCountryRegionPid",
      /* trigger, */ slug,
      countryCode,
      areaCode,
      pid
    ],
    () =>
      fetchData(
        `/ps/int/1/${accountId}/data/${slug}/${countryCode}/${areaCode}/${pid}.js?key=${oldKey}`,
        "GET"
      ),
    {
      enabled:
        /* !!trigger && */ !!oldKey &&
        !!slug &&
        !!countryCode &&
        !!areaCode &&
        !!pid,
      refetchOnWindowFocus: false
    }
  );

  progressBar(isLoading, isFetching, isFetched);

  const hasErrors =
    dataSkusCountrySku?.hasErrors ||
    postalMapCountry?.hasErrors ||
    dataStoresCountryRegionPid?.hasErrors;
  let errorsData = {};
  if (hasErrors)
    errorsData = {
      ...dataSkusCountrySku?.errors[0],
      ...postalMapCountry?.errors[0],
      ...dataStoresCountryRegionPid?.errors[0]
    };

  return {
    regions: Object.keys(postalMapCountry?.result[0] || {}),
    data: hasErrors ? errorsData : dataStoresCountryRegionPid?.result[0]
  };
};
