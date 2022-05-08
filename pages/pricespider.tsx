import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

import type { NextPage } from "next";

import Layout from "../components/Layout/Layout";

import * as urls from "../config";

import { usePage } from "../lib/hooks/usePage";
import useXmlSitemap from "../lib/hooks/useXmlSitemap";
import useBinLite from "../lib/hooks/useBinLite";
import useLocale from "../lib/hooks/useLocale";
import useSmartCommerce from "../lib/hooks/useSmartCommerce";
import {
  usePsCidConfig,
  usePsCidResLang,
  usePsConfig,
  usePsDataFamiliesCountryInstance,
  usePsDataProductsPid,
  usePsDataSkusCountrySku,
  usePsDataSkusMap,
  usePsDataStoresCountryRegionPid,
  usePsPostalMapCountry
} from "../lib/hooks/usePriceSpider";
import MicroLinks from "../components/MicroLinks/MicroLinks";
import CurrentSection from "../components/CurrentSection/CurrentSection";
import {
  Container,
  ContentContainer
} from "../components/Containers/Containers";
import TableTextJsonSwitch from "../components/TableTextJsonSwitch/TableTextJsonSwitch";
import JsonView from "../components/JsonView/JsonView";
import TextView from "../components/TextView/TextView";
import Meta from "../components/Meta/Meta";
import { InputsRow } from "../components/LayoutElements/LayoutElements";
import { SelectInput } from "../components/Inputs/Inputs";
import {
  LinesSkeleton,
  TableSkeleton
} from "../components/Skeletons/Skeletons";
import ContentTable from "../components/ContentTable/ContentTable";

const priceSpider: NextPage = () => {
  // Set default active switch to text
  const [activeSwitch, setActiveSwitch] = useState<string>("text");

  const [selectedField, setSelectedField] = useState<string>("");
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedInstance, setSelectedInstance] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const [active, setActive] = useState<string>("config"); // Currently selected active section

  const router = useRouter();

  const locale = useLocale(
    router.query.l as string,
    true,
    "type:product",
    "url"
  );

  useEffect(
    () => () => {
      // Clear all state when switching between locales in the /locales/edit page
      setSelectedField("");
      setSelectedLang(null);
      setSelectedCountry(null);
      setSelectedInstance(null);
      setSelectedPage(null);
      setSelectedRegion(null);
    },
    [locale]
  );

  const accountId = locale?.result[0].PS?.psAccountId.value as string;
  const cid = locale?.result[0].PS?.psCid.value as string;
  const sku = locale?.result[0].pages?.find(page => page.url === selectedPage)
    ?.data[selectedField]?.value;

  const config = usePsConfig(active, accountId);

  const cidConfig = usePsCidConfig(active, accountId, cid);

  const dataSkusMap = usePsDataSkusMap(active, accountId);

  const cidResLang = usePsCidResLang(active, accountId, cid, selectedLang);

  const dataSkusCountrySku = usePsDataSkusCountrySku(
    active,
    accountId,
    selectedCountry,
    sku
  );

  const dataProductsPid = usePsDataProductsPid(
    active,
    accountId,
    selectedCountry,
    sku
  );

  const dataFamiliesCountryInstance = usePsDataFamiliesCountryInstance(
    active,
    accountId,
    selectedCountry,
    selectedInstance
  );

  const postalMapCountry = usePsPostalMapCountry(active, selectedCountry);

  const dataStoresCountryRegionPid = usePsDataStoresCountryRegionPid(
    active,
    accountId,
    selectedCountry,
    selectedRegion,
    sku
  );

  return (
    <Layout>
      <Meta
        title="PriceSpider Inspector"
        description="PriceSpider Inspector"
        canonical={urls.front + "/pricespider"}
      />

      <section className="">
        <MicroLinks
          items={[
            {
              label: "Config.js",
              active: active === "config",
              action: () => {
                setActiveSwitch("text");
                setActive("config");
              }
            },
            {
              label: "CID/Config.js",
              active: active === "cidConfig",
              action: () => {
                setActiveSwitch("text");
                setActive("cidConfig");
              }
            },
            {
              label: "Data/SKUs/map.js",
              active: active === "dataSkusMap",
              action: () => {
                setActiveSwitch("text");
                confirm(
                  "Warning, it will take some time to fetch this data. Are you sure you want to proceed?"
                ) && setActive("dataSkusMap");
              }
            },
            {
              label: "CID/res/lang.js",
              active: active === "cidResLang",
              action: () => {
                setActiveSwitch("text");
                setActive("cidResLang");
              }
            },
            {
              label: "Data/SKUs/Country/SKU.js",
              active: active === "dataSkusCountrySku",
              action: () => {
                setActiveSwitch("text");
                setActive("dataSkusCountrySku");
              }
            },
            {
              label: "Data/products/PID.js",
              active: active === "dataProductsPid",
              action: () => {
                setActiveSwitch("text");
                setActive("dataProductsPid");
              }
            },
            {
              label: "Data/families/Country/Instance.js",
              active: active === "dataFamiliesCountryInstance",
              action: () => {
                setActiveSwitch("table");
                setActive("dataFamiliesCountryInstance");
              }
            },
            {
              label: "PostalMap/Country.js",
              active: active === "postalMapCountry",
              action: () => {
                setActiveSwitch("text");
                setActive("postalMapCountry");
              }
            },
            {
              label: "Data/stores/Country/Region/PID.js",
              active: active === "dataStoresCountryRegionPid",
              action: () => {
                setActiveSwitch("text");
                setActive("dataStoresCountryRegionPid");
              }
            },
            {
              label: "Data/stock/Country/Region/PID.js",
              active: active === "dataStockCountryRegionPid",
              action: () => {
                setActiveSwitch("text");
                setActive("dataStockCountryRegionPid");
              }
            },
            {
              label: "Data/regionalPricing/Country/Region/PID.js",
              active: active === "dataRegionalPricingCountryRegionPid",
              action: () => {
                setActiveSwitch("text");
                setActive("dataRegionalPricingCountryRegionPid");
              }
            }
          ]}
        />
        <CurrentSection label="PriceSpider Inspector" />
        <TableTextJsonSwitch
          showTable={active === "dataFamiliesCountryInstance"}
          activeSwitch={activeSwitch}
          setActiveSwitch={setActiveSwitch}
        />
        <Container>
          <ContentContainer>
            {locale?.result[0]?.PS ? (
              <>
                <InputsRow>
                  <SelectInput
                    currentField={selectedField || ""}
                    setCurrentField={setSelectedField}
                    label="PriceSpider SKU Field"
                    placeholder="Select PS SKU Field..."
                    className="w-3/12"
                    data={locale?.result[0]?.fields || []}
                  />
                  <SelectInput
                    currentField={selectedPage || ""}
                    setCurrentField={setSelectedPage}
                    label="Product page"
                    placeholder="Select product page URL..."
                    className="w-9/12"
                    data={locale?.result[0].pages?.map(page => page.url) || []}
                  />
                </InputsRow>
                <InputsRow>
                  <SelectInput
                    currentField={selectedCountry || ""}
                    setCurrentField={setSelectedCountry}
                    label="PriceSpider Country"
                    placeholder="Select PS country..."
                    className="w-4/12"
                    data={locale?.result[0]?.PS?.psCountries || []}
                  />
                  <SelectInput
                    currentField={selectedInstance || ""}
                    setCurrentField={setSelectedInstance}
                    label="PriceSpider Instance"
                    placeholder="Select PS instance..."
                    className="w-4/12"
                    data={locale?.result[0]?.PS?.psInstances || []}
                  />
                  <SelectInput
                    currentField={selectedLang || ""}
                    setCurrentField={setSelectedLang}
                    label="PriceSpider Language"
                    placeholder="Select PS language..."
                    className="w-4/12"
                    data={locale?.result[0]?.PS?.psLanguages || []}
                  />
                </InputsRow>
                {active === "dataStoresCountryRegionPid" ||
                active === "dataStockCountryRegionPid" ||
                active === "dataRegionalPricingCountryRegionPid" ? (
                  <InputsRow>
                    <SelectInput
                      currentField={selectedRegion || ""}
                      setCurrentField={setSelectedRegion}
                      label="PriceSpider Region"
                      placeholder="Select PS region..."
                      className="w-4/12"
                      data={dataStoresCountryRegionPid.regions}
                      disabled={!dataStoresCountryRegionPid.regions.length}
                    />
                  </InputsRow>
                ) : null}
              </>
            ) : (
              <div>
                Locale{" "}
                <strong>
                  {locale?.result[0].brand.value}{" "}
                  {locale?.result[0].locale.value}{" "}
                </strong>
                does not have PS-related data.
              </div>
            )}

            {active === "config" &&
            activeSwitch === "text" &&
            locale?.result[0].PS?.psAccountId ? (
              config ? (
                <TextView className="mt-4" data={config} />
              ) : (
                <LinesSkeleton numRows={13} />
              )
            ) : null}
            {active === "config" &&
            activeSwitch === "json" &&
            locale?.result[0].PS?.psAccountId ? (
              config ? (
                <JsonView data={config} />
              ) : (
                <LinesSkeleton numRows={13} />
              )
            ) : null}

            {active === "cidConfig" &&
            activeSwitch === "text" &&
            locale?.result[0].PS?.psAccountId ? (
              cidConfig ? (
                <TextView className="mt-4" data={cidConfig} />
              ) : (
                <LinesSkeleton numRows={45} />
              )
            ) : null}
            {active === "cidConfig" &&
            activeSwitch === "json" &&
            locale?.result[0].PS?.psAccountId ? (
              cidConfig ? (
                <JsonView data={cidConfig} />
              ) : (
                <LinesSkeleton numRows={45} />
              )
            ) : null}

            {active === "dataSkusMap" &&
            activeSwitch === "text" &&
            locale?.result[0].PS?.psAccountId ? (
              dataSkusMap ? (
                <TextView className="mt-4" data={dataSkusMap} />
              ) : (
                <LinesSkeleton numRows={45} />
              )
            ) : null}
            {active === "dataSkusMap" &&
            activeSwitch === "json" &&
            locale?.result[0].PS?.psAccountId ? (
              dataSkusMap ? (
                <JsonView data={dataSkusMap} />
              ) : (
                <LinesSkeleton numRows={45} />
              )
            ) : null}

            {active === "cidResLang" &&
            activeSwitch === "text" &&
            locale?.result[0].PS?.psAccountId ? (
              selectedLang ? (
                cidResLang ? (
                  <TextView className="mt-4" data={cidResLang} />
                ) : (
                  <LinesSkeleton numRows={45} />
                )
              ) : (
                <span className="mt-4 block">
                  Please select <strong>language</strong>.
                </span>
              )
            ) : null}
            {active === "cidResLang" &&
            activeSwitch === "json" &&
            locale?.result[0].PS?.psAccountId ? (
              selectedLang ? (
                cidResLang ? (
                  <JsonView data={cidResLang} />
                ) : (
                  <LinesSkeleton numRows={45} />
                )
              ) : (
                <span className="mt-4 block">
                  Please select <strong>language</strong>.
                </span>
              )
            ) : null}

            {active === "dataSkusCountrySku" &&
            activeSwitch === "text" &&
            locale?.result[0].PS?.psAccountId ? (
              selectedField && selectedCountry && sku ? (
                dataSkusCountrySku ? (
                  <TextView className="mt-4" data={dataSkusCountrySku} />
                ) : (
                  <LinesSkeleton numRows={45} />
                )
              ) : (
                <span className="mt-4 block">
                  Please select <strong>PS SKU field</strong>,{" "}
                  <strong>product page</strong> and <strong>country</strong>.
                </span>
              )
            ) : null}
            {active === "dataSkusCountrySku" &&
            activeSwitch === "json" &&
            locale?.result[0].PS?.psAccountId ? (
              selectedField && selectedCountry && sku ? (
                dataSkusCountrySku ? (
                  <JsonView data={dataSkusCountrySku} />
                ) : (
                  <LinesSkeleton numRows={45} />
                )
              ) : (
                <span className="mt-4 block">
                  Please select <strong>PS SKU field</strong>,{" "}
                  <strong>product page</strong> and <strong>country</strong>.
                </span>
              )
            ) : null}

            {active === "dataProductsPid" &&
            activeSwitch === "text" &&
            locale?.result[0].PS?.psAccountId ? (
              selectedField && selectedCountry && sku ? (
                dataProductsPid ? (
                  <TextView className="mt-4" data={dataProductsPid} />
                ) : (
                  <LinesSkeleton numRows={45} />
                )
              ) : (
                <span className="mt-4 block">
                  Please select <strong>PS SKU field</strong>,{" "}
                  <strong>product page</strong> and <strong>country</strong>.
                </span>
              )
            ) : null}
            {active === "dataProductsPid" &&
            activeSwitch === "json" &&
            locale?.result[0].PS?.psAccountId ? (
              selectedField && selectedCountry && sku ? (
                dataProductsPid ? (
                  <JsonView data={dataProductsPid} />
                ) : (
                  <LinesSkeleton numRows={45} />
                )
              ) : (
                <span className="mt-4 block">
                  Please select <strong>PS SKU field</strong>,{" "}
                  <strong>product page</strong> and <strong>country</strong>.
                </span>
              )
            ) : null}

            {active === "dataFamiliesCountryInstance" &&
            activeSwitch === "table" &&
            locale?.result[0].PS?.psAccountId ? (
              selectedCountry && selectedInstance ? (
                dataFamiliesCountryInstance ? (
                  <div className="mt-4">
                    <ContentTable
                      data={
                        !dataFamiliesCountryInstance.hasErrors
                          ? dataFamiliesCountryInstance.result[0]?.skus.map(
                              sku => ({
                                SKU: sku.key,
                                PID: sku.product.id,
                                Title: sku.product.title,
                                Type: sku.attributes["Product Type"],
                                Size: sku.attributes.Size
                              })
                            )
                          : dataFamiliesCountryInstance.errors
                      }
                      sortDisabled={true}
                    />
                  </div>
                ) : (
                  <TableSkeleton numRows={10} />
                )
              ) : (
                <span className="mt-4 block">
                  Please select <strong>country</strong> and{" "}
                  <strong>instance</strong>.
                </span>
              )
            ) : null}
            {active === "dataFamiliesCountryInstance" &&
            activeSwitch === "text" &&
            locale?.result[0].PS?.psAccountId ? (
              selectedCountry && selectedInstance ? (
                dataFamiliesCountryInstance ? (
                  <TextView
                    className="mt-4"
                    data={
                      !dataFamiliesCountryInstance.hasErrors
                        ? dataFamiliesCountryInstance.result[0]
                        : dataFamiliesCountryInstance.errors[0]
                    }
                  />
                ) : (
                  <LinesSkeleton numRows={45} />
                )
              ) : (
                <span className="mt-4 block">
                  Please select <strong>country</strong> and{" "}
                  <strong>instance</strong>.
                </span>
              )
            ) : null}
            {active === "dataFamiliesCountryInstance" &&
            activeSwitch === "json" &&
            locale?.result[0].PS?.psAccountId ? (
              selectedCountry && selectedInstance ? (
                dataFamiliesCountryInstance ? (
                  <JsonView
                    data={
                      !dataFamiliesCountryInstance.hasErrors
                        ? dataFamiliesCountryInstance.result[0]
                        : dataFamiliesCountryInstance.errors[0]
                    }
                  />
                ) : (
                  <LinesSkeleton numRows={45} />
                )
              ) : (
                <span className="mt-4 block">
                  Please select <strong>country</strong> and{" "}
                  <strong>instance</strong>.
                </span>
              )
            ) : null}

            {active === "postalMapCountry" &&
            activeSwitch === "text" &&
            locale?.result[0].PS?.psAccountId ? (
              selectedCountry ? (
                postalMapCountry ? (
                  <TextView className="mt-4" data={postalMapCountry} />
                ) : (
                  <LinesSkeleton numRows={45} />
                )
              ) : (
                <span className="mt-4 block">
                  Please select <strong>country</strong>.
                </span>
              )
            ) : null}
            {active === "postalMapCountry" &&
            activeSwitch === "json" &&
            locale?.result[0].PS?.psAccountId ? (
              selectedCountry ? (
                postalMapCountry ? (
                  <JsonView data={postalMapCountry} />
                ) : (
                  <LinesSkeleton numRows={45} />
                )
              ) : (
                <span className="mt-4 block">
                  Please select <strong>country</strong>.
                </span>
              )
            ) : null}

            {active === "dataStoresCountryRegionPid" &&
            activeSwitch === "text" &&
            locale?.result[0].PS?.psAccountId ? (
              selectedField &&
              selectedCountry &&
              selectedRegion &&
              selectedPage ? (
                dataStoresCountryRegionPid ? (
                  <TextView
                    className="mt-4"
                    data={dataStoresCountryRegionPid.data}
                  />
                ) : (
                  <LinesSkeleton numRows={45} />
                )
              ) : (
                <span className="mt-4 block">
                  Please select <strong>PS SKU field</strong>,{" "}
                  <strong>country</strong>, <strong>region</strong> and{" "}
                  <strong>product page</strong>.
                </span>
              )
            ) : null}
            {active === "dataStoresCountryRegionPid" &&
            activeSwitch === "json" &&
            locale?.result[0].PS?.psAccountId ? (
              selectedField &&
              selectedCountry &&
              selectedRegion &&
              selectedPage ? (
                dataStoresCountryRegionPid ? (
                  <JsonView data={dataStoresCountryRegionPid.data} />
                ) : (
                  <LinesSkeleton numRows={45} />
                )
              ) : (
                <span className="mt-4 block">
                  Please select <strong>PS SKU field</strong>,{" "}
                  <strong>country</strong> and <strong>instance</strong>.
                </span>
              )
            ) : null}

            {active === "dataStockCountryRegionPid" &&
            activeSwitch === "text" &&
            locale?.result[0].PS?.psAccountId ? (
              selectedField &&
              selectedCountry &&
              selectedRegion &&
              selectedPage ? (
                dataStoresCountryRegionPid ? (
                  <TextView
                    className="mt-4"
                    data={dataStoresCountryRegionPid.data}
                  />
                ) : (
                  <LinesSkeleton numRows={45} />
                )
              ) : (
                <span className="mt-4 block">
                  Please select <strong>PS SKU field</strong>,{" "}
                  <strong>country</strong>, <strong>region</strong> and{" "}
                  <strong>product page</strong>.
                </span>
              )
            ) : null}
            {active === "dataStockCountryRegionPid" &&
            activeSwitch === "json" &&
            locale?.result[0].PS?.psAccountId ? (
              selectedField &&
              selectedCountry &&
              selectedRegion &&
              selectedPage ? (
                dataStoresCountryRegionPid ? (
                  <JsonView data={dataStoresCountryRegionPid.data} />
                ) : (
                  <LinesSkeleton numRows={45} />
                )
              ) : (
                <span className="mt-4 block">
                  Please select <strong>PS SKU field</strong>,{" "}
                  <strong>country</strong> and <strong>instance</strong>.
                </span>
              )
            ) : null}

            {active === "dataRegionalPricingCountryRegionPid" &&
            activeSwitch === "text" &&
            locale?.result[0].PS?.psAccountId ? (
              selectedField &&
              selectedCountry &&
              selectedRegion &&
              selectedPage ? (
                dataStoresCountryRegionPid ? (
                  <TextView
                    className="mt-4"
                    data={dataStoresCountryRegionPid.data}
                  />
                ) : (
                  <LinesSkeleton numRows={45} />
                )
              ) : (
                <span className="mt-4 block">
                  Please select <strong>PS SKU field</strong>,{" "}
                  <strong>country</strong>, <strong>region</strong> and{" "}
                  <strong>product page</strong>.
                </span>
              )
            ) : null}
            {active === "dataRegionalPricingCountryRegionPid" &&
            activeSwitch === "json" &&
            locale?.result[0].PS?.psAccountId ? (
              selectedField &&
              selectedCountry &&
              selectedRegion &&
              selectedPage ? (
                dataStoresCountryRegionPid ? (
                  <JsonView data={dataStoresCountryRegionPid.data} />
                ) : (
                  <LinesSkeleton numRows={45} />
                )
              ) : (
                <span className="mt-4 block">
                  Please select <strong>PS SKU field</strong>,{" "}
                  <strong>country</strong> and <strong>instance</strong>.
                </span>
              )
            ) : null}
          </ContentContainer>
        </Container>
      </section>
    </Layout>
  );
};

export default priceSpider;
