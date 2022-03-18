import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

import type { NextPage } from "next";

import Layout from "../components/Layout/Layout";

import usePage from "../lib/hooks/usePage";
import useXmlSitemap from "../lib/hooks/useXmlSitemap";

const inspectXmlSitemap: NextPage = () => {
  const router = useRouter();

  const xmlSitemap = useXmlSitemap(router.query.l as string);

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="">
        XML Sitemap Inspector
        <pre>{JSON.stringify(xmlSitemap, null, 2)}</pre>
      </section>
    </Layout>
  );
};

export default inspectXmlSitemap;
