import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

import type { NextPage } from "next";

import Layout from "../components/Layout/Layout";

import { usePage } from "../lib/hooks/usePage";
import useXmlSitemap from "../lib/hooks/useXmlSitemap";
import useBinLite from "../lib/hooks/useBinLite";
import CurrentSection from "../components/CurrentSection/CurrentSection";
import {
  Container,
  ContentContainer
} from "../components/Containers/Containers";
import TextJsonSwitch from "../components/TextJsonSwitch/TextJsonSwitch";
import MicroLinks from "../components/MicroLinks/MicroLinks";
import { BinLiteProduct } from "../lib/interfaces/binLite";
import TextView from "../components/TextView/TextView";
import JsonView from "../components/JsonView/JsonView";

const binLite: NextPage = () => {
  // Set default active switch to text
  const [activeSwitch, setActiveSwitch] = useState<string>("text");

  const router = useRouter();

  const sellers = useBinLite(router.query.l as string);

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="">
        <CurrentSection label="BIN Lite Inspector" />
        <TextJsonSwitch
          activeSwitch={activeSwitch}
          setActiveSwitch={setActiveSwitch}
        />
        <Container>
          <ContentContainer>
            {activeSwitch === "text" ? <TextView data={sellers} /> : null}
            {activeSwitch === "json" ? <JsonView data={sellers} /> : null}
          </ContentContainer>
        </Container>
      </section>
    </Layout>
  );
};

export default binLite;
