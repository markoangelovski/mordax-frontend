import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

import type { NextPage } from "next";

import Layout from "../components/Layout/Layout";

import { usePage } from "../lib/hooks/usePage";
import useXmlSitemap from "../lib/hooks/useXmlSitemap";
import CurrentSection from "../components/CurrentSection/CurrentSection";
import {
  Container,
  ContentContainer
} from "../components/Containers/Containers";
import JsonView from "../components/JsonView/JsonView";
import TextJsonSwitch from "../components/TextJsonSwitch/TextJsonSwitch";
import TextView from "../components/TextView/TextView";

const inspectXmlSitemap: NextPage = () => {
  // Set default active switch to text
  const [activeSwitch, setActiveSwitch] = useState<string>("text");

  const router = useRouter();

  const xmlSitemap = useXmlSitemap(router.query.l as string);

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="">
        <CurrentSection label="XML Sitemap Inspector" />
        <TextJsonSwitch
          activeSwitch={activeSwitch}
          setActiveSwitch={setActiveSwitch}
        />
        <Container>
          <ContentContainer>
            {activeSwitch === "text" ? <TextView data={xmlSitemap} /> : null}
            {activeSwitch === "json" ? <JsonView data={xmlSitemap} /> : null}
          </ContentContainer>
        </Container>
      </section>
    </Layout>
  );
};

export default inspectXmlSitemap;
