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
import CurrentSection from "../components/CurrentSection/CurrentSection";

const smartCommerce: NextPage = () => {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null);

  const router = useRouter();

  const locale = useLocale(router.query.l as string, true);

  const result = useSmartCommerce(
    selectedEndpoint as string,
    selectedPage as string,
    selectedField as string
  );

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="">
        <CurrentSection label="SmartCommerce Inspector" />
        SmartCommerce Inspector
        <div>Select SmartCommerce SKU field: </div>
        {locale?.fields.map(field => (
          <div key={field} onClick={e => setSelectedField(field)}>
            {field}
          </div>
        ))}
        <div>Select product: </div>
        {locale?.pages?.map(page => (
          <div key={page.id} onClick={e => setSelectedPage(page.url)}>
            {page.url}
          </div>
        ))}
        <button onClick={() => setSelectedEndpoint("retailers")}>
          Retailers
        </button>
        <button onClick={() => setSelectedEndpoint("button")}>Button</button>
        <button onClick={() => setSelectedEndpoint("carousel")}>
          Carousel
        </button>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </section>
    </Layout>
  );
};

export default smartCommerce;
