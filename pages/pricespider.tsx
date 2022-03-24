import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

import type { NextPage } from "next";

import Layout from "../components/Layout/Layout";

import usePage from "../lib/hooks/usePage";
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

const priceSpider: NextPage = () => {
  // Set default active switch to text
  const [activeSwitch, setActiveSwitch] = useState<string>("json");

  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedInstance, setSelectedInstance] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const [active, setActive] = useState<string>("config"); // Currently selected active section

  const router = useRouter();

  const locale = useLocale(router.query.l as string, true);

  const fields = locale?.result[0].fields;

  const accountId = locale?.result[0].PS?.psAccountId.value as string;
  const cid = locale?.result[0].PS?.psCid.value as string;

  const psLanguages = locale?.result[0].PS?.psLanguages;
  const psCountries = locale?.result[0].PS?.psCountries;
  const psInstances = locale?.result[0].PS?.psInstances;

  const pages = locale?.result[0].pages;

  const config = usePsConfig(active, accountId);

  const cidConfig = usePsCidConfig(active, accountId, cid);

  const dataSkusMap = usePsDataSkusMap(active, accountId);

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
            {/* <div>Select PriceSpider SKU field: </div>
            {fields?.map(field => (
              <div key={field} onClick={e => setSelectedField(field)}>
                {field}
              </div>
            ))} */}

            <label htmlFor="ps-sku">Select PriceSpider SKU field: </label>
            <select
              name="ps-sku"
              id="ps-sku"
              onInput={e => setSelectedField(e.currentTarget.value)}
            >
              <option value="">--Please choose an option--</option>
              {fields?.map(field => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
            <br />
            {/* <div>Select language: </div>
            {psLanguages?.map(lang => (
              <div key={lang} onClick={e => setSelectedLang(lang)}>
                {lang}
              </div>
            ))} */}

            <label htmlFor="ps-language">Select language: </label>
            <select
              name="ps-language"
              id="ps-language"
              onInput={e => setSelectedLang(e.currentTarget.value)}
            >
              <option value="">--Please choose an option--</option>
              {psLanguages?.map(lang => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <br />
            {/* <div>Select country: </div>
            {psCountries?.map(country => (
              <div key={country} onClick={e => setSelectedCountry(country)}>
                {country}
              </div>
            ))} */}

            <label htmlFor="ps-country">Select country: </label>
            <select
              name="ps-country"
              id="ps-country"
              onInput={e => setSelectedCountry(e.currentTarget.value)}
            >
              <option value="">--Please choose an option--</option>
              {psCountries?.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <br />

            <label htmlFor="ps-instance">Select instance: </label>
            <select
              name="ps-instance"
              id="ps-instance"
              onInput={e => setSelectedCountry(e.currentTarget.value)}
            >
              <option value="">--Please choose an option--</option>
              {psInstances?.map(instance => (
                <option key={instance} value={instance}>
                  {instance}
                </option>
              ))}
            </select>
            <br />
            {/* <div>Select instance: </div>
            {psInstances?.map(instance => (
              <div key={instance} onClick={e => setSelectedInstance(instance)}>
                {instance}
              </div>
            ))} */}

            {/* <div>Select product: </div>
            {pages?.map(page => (
              <div key={page.id} onClick={e => setSelectedPage(page.url)}>
                {page.url}
              </div>
            ))} */}

            <label htmlFor="ps-product">Select product: </label>
            <select
              name="ps-product"
              id="ps-product"
              onInput={e => setSelectedPage(e.currentTarget.value)}
            >
              <option value="">--Please choose an option--</option>
              {pages?.map(page => (
                <option key={page.id} value={page.url}>
                  {page.url}
                </option>
              ))}
            </select>

            {active === "config" &&
              (activeSwitch === "json" ? <JsonView data={config} /> : null)}

            {active === "cidConfig" &&
              (activeSwitch === "json" ? <JsonView data={cidConfig} /> : null)}

            {active === "dataSkusMap" &&
              (activeSwitch === "json" ? (
                <JsonView data={dataSkusMap} />
              ) : null)}
          </ContentContainer>
        </Container>
      </section>
    </Layout>
  );
};

export default priceSpider;
