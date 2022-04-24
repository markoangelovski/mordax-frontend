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
  usePsConfig,
  usePsDataSkusMap
} from "../lib/hooks/usePriceSpider";
import MicroLinks from "../components/MicroLinks/MicroLinks";
import CurrentSection from "../components/CurrentSection/CurrentSection";
import {
  Container,
  ContentContainer
} from "../components/Containers/Containers";
import TextJsonSwitch from "../components/TextJsonSwitch/TextJsonSwitch";
import JsonView from "../components/JsonView/JsonView";
import TextView from "../components/TextView/TextView";
import Meta from "../components/Meta/Meta";
import { InputsRow } from "../components/LayoutElements/LayoutElements";
import { SelectInput } from "../components/Inputs/Inputs";
import { LinesSkeleton } from "../components/Skeletons/Skeletons";

const priceSpider: NextPage = () => {
  // Set default active switch to text
  const [activeSwitch, setActiveSwitch] = useState<string>("text");

  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedInstance, setSelectedInstance] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const [active, setActive] = useState<string>("config"); // Currently selected active section

  const router = useRouter();

  const locale = useLocale(router.query.l as string, true, "type:product");

  const fields = locale?.result[0].fields;

  const accountId = locale?.result[0].PS?.psAccountId.value as string;
  const cid = locale?.result[0].PS?.psCid.value as string;

  const pages = locale?.result[0].pages;

  const config = usePsConfig(active, accountId);

  const cidConfig = usePsCidConfig(active, accountId, cid);

  const dataSkusMap = usePsDataSkusMap(active, accountId);

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
              action: () => setActive("config")
            },
            {
              label: "CID/Config.js",
              active: active === "cidConfig",
              action: () => setActive("cidConfig")
            },
            {
              label: "Data/SKUs/map.js",
              active: active === "dataSkusMap",
              action: () =>
                confirm(
                  "Warning, it will take some time to fetch this data. Are you sure you want to proceed?"
                ) && setActive("dataSkusMap")
            }
          ]}
        />
        <CurrentSection label="PriceSpider Inspector" />
        <TextJsonSwitch
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
                <TextView data={config} />
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
                <TextView data={cidConfig} />
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
                <TextView data={dataSkusMap} />
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
          </ContentContainer>
        </Container>
      </section>
    </Layout>
  );
};

export default priceSpider;
