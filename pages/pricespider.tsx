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
import usePriceSpider from "../lib/hooks/usePriceSpider";

const priceSpider: NextPage = () => {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedInstance, setSelectedInstance] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const router = useRouter();

  const locale = useLocale(router.query.l as string, true);

  const psAccountData = usePriceSpider(locale?.PS?.psAccountId.value as string);

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="">
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
        <pre>{JSON.stringify(psAccountData, null, 2)}</pre>
      </section>
    </Layout>
  );
};

export default priceSpider;
