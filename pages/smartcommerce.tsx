import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

import type { NextPage } from "next";

import Layout from "../components/Layout/Layout";

import { usePage } from "../lib/hooks/usePage";
import useXmlSitemap from "../lib/hooks/useXmlSitemap";
import useBinLite from "../lib/hooks/useBinLite";
import useLocale from "../lib/hooks/useLocale";
import useSmartCommerce from "../lib/hooks/useSmartCommerce";
import CurrentSection from "../components/CurrentSection/CurrentSection";
import {
  Container,
  ContentContainer
} from "../components/Containers/Containers";
import MicroLinks from "../components/MicroLinks/MicroLinks";
import TextJsonSwitch from "../components/TextJsonSwitch/TextJsonSwitch";
import JsonView from "../components/JsonView/JsonView";
import TextView from "../components/TextView/TextView";

const smartCommerce: NextPage = () => {
  // Set default active switch to text
  const [activeSwitch, setActiveSwitch] = useState<string>("text");

  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const [active, setActive] = useState<string>("retailers"); // Currently selected active section

  const router = useRouter();

  const locale = useLocale(router.query.l as string, true);

  const result = useSmartCommerce(
    // selectedEndpoint as string,
    active,
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
        <MicroLinks
          items={[
            {
              label: "Retailers",
              active: active === "retailers",
              action: () => setActive("retailers")
            },
            {
              label: "Button",
              active: active === "button",
              action: () => setActive("button")
            },
            {
              label: "Carousel",
              active: active === "carousel",
              action: () => setActive("carousel")
            }
          ]}
        />
        <CurrentSection label="SmartCommerce Inspector" />
        <TextJsonSwitch
          activeSwitch={activeSwitch}
          setActiveSwitch={setActiveSwitch}
        />
        <Container>
          <ContentContainer>
            <label htmlFor="mpid-field">
              Select SmartCommerce MP ID field:{" "}
            </label>
            <select
              name="mpid-field"
              id="mpid-field"
              onInput={e => setSelectedField(e.currentTarget.value)}
            >
              <option value="">--Please choose an option--</option>
              {locale?.result[0].fields.map(field => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
            <br />
            <label htmlFor="sc-product">Select product: </label>
            <select
              name="sc-product"
              id="sc-product"
              onInput={e => setSelectedPage(e.currentTarget.value)}
            >
              <option value="">--Please choose an option--</option>
              {locale?.result[0].pages?.map(page => (
                <option key={page.id} value={page.url}>
                  {page.url}
                </option>
              ))}
            </select>
            <br />
            {activeSwitch === "text" ? <TextView data={result} /> : null}
            {activeSwitch === "json" ? <JsonView data={result} /> : null}
          </ContentContainer>
        </Container>
      </section>
    </Layout>
  );
};

export default smartCommerce;
