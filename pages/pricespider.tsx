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

const priceSpider: NextPage = () => {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedInstance, setSelectedInstance] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const [active, setActive] = useState<string>(""); // Currently selected active section

  const router = useRouter();

  const locale = useLocale(router.query.l as string, true);

  const accountId = locale?.PS?.psAccountId.value as string;
  const cid = locale?.PS?.psCid.value as string;

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
              action: () => setActive("dataSkusMap")
            }
          ]}
        />
        <CurrentSection label="PriceSpider Inspector" />
        <Container>
          <ContentContainer>
            PriceSpider Inspector
            <div>Select PriceSpider SKU field: </div>
            {locale?.fields.map(field => (
              <div key={field} onClick={e => setSelectedField(field)}>
                {field}
              </div>
            ))}
            <div>Select language: </div>
            {locale?.PS?.psLanguages.map(lang => (
              <div key={lang} onClick={e => setSelectedLang(lang)}>
                {lang}
              </div>
            ))}
            <div>Select country: </div>
            {locale?.PS?.psCountries.map(country => (
              <div key={country} onClick={e => setSelectedCountry(country)}>
                {country}
              </div>
            ))}
            <div>Select instance: </div>
            {locale?.PS?.psInstances.map(instance => (
              <div key={instance} onClick={e => setSelectedInstance(instance)}>
                {instance}
              </div>
            ))}
            <div>Select product: </div>
            {locale?.pages?.map(page => (
              <div key={page.id} onClick={e => setSelectedPage(page.url)}>
                {page.url}
              </div>
            ))}
            {active === "config" && (
              <pre>{JSON.stringify(config, null, 2)}</pre>
            )}
            {active === "cidConfig" && (
              <pre>{JSON.stringify(cidConfig, null, 2)}</pre>
            )}
            {active === "dataSkusMap" && (
              <pre>{JSON.stringify(dataSkusMap, null, 2)}</pre>
            )}
          </ContentContainer>
        </Container>
      </section>
    </Layout>
  );
};

export default priceSpider;
