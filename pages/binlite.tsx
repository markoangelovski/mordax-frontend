import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

import type { NextPage } from "next";

import Layout from "../components/Layout/Layout";

import usePage from "../lib/hooks/usePage";
import useXmlSitemap from "../lib/hooks/useXmlSitemap";
import useBinLite from "../lib/hooks/useBinLite";
import CurrentSection from "../components/CurrentSection/CurrentSection";
import {
  Container,
  ContentContainer
} from "../components/Containers/Containers";

const binLite: NextPage = () => {
  const router = useRouter();

  const xmlSitemap = useBinLite(router.query.l as string);

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="">
        <CurrentSection label="BIN Lite Inspector" />
        <Container>
          <ContentContainer>
            BIN Lite Inspector
            <pre>{JSON.stringify(xmlSitemap, null, 2)}</pre>
          </ContentContainer>
        </Container>
      </section>
    </Layout>
  );
};

export default binLite;
