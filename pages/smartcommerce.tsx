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
import CurrentSection from "../components/CurrentSection/CurrentSection";
import {
  Container,
  ContentContainer
} from "../components/Containers/Containers";
import MicroLinks from "../components/MicroLinks/MicroLinks";
import TextJsonSwitch from "../components/TextJsonSwitch/TextJsonSwitch";
import JsonView from "../components/JsonView/JsonView";
import TextView from "../components/TextView/TextView";
import Meta from "../components/Meta/Meta";
import { SelectInput } from "../components/Inputs/Inputs";
import { InputsRow } from "../components/LayoutElements/LayoutElements";
import ResultsTable from "../components/ResultsTable/ContentTable";
import { TableSkeleton } from "../components/Skeletons/Skeletons";

const smartCommerce: NextPage = () => {
  // Currently selected active section
  const [active, setActive] = useState<string>("retailers");
  // Set default active switch to table
  const [activeSwitch, setActiveSwitch] = useState<string>("table");

  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const router = useRouter();

  const locale = useLocale(router.query.l as string, true);

  const data = useSmartCommerce(
    // selectedEndpoint as string,
    active,
    selectedPage as string,
    selectedField as string
  );

  useEffect(
    () => () => {
      // Clear state every time a new locale is selected from the Select Locales dropdown
      setSelectedField(null);
      setSelectedPage(null);
    },
    [locale]
  );

  return (
    <Layout>
      <Meta
        title="SmartCommerce Inspector"
        description="SmartCommerce Inspector"
        canonical={urls.front + "/smartcommerce"}
      />

      <section className="">
        <MicroLinks
          items={[
            {
              label: "Retailers",
              active: active === "retailers",
              action: () => {
                setActive("retailers");
                setActiveSwitch("table");
              }
            },
            {
              label: "Button",
              active: active === "button",
              action: () => {
                setActive("button");
                setActiveSwitch("text");
              }
            },
            {
              label: "Carousel",
              active: active === "carousel",
              action: () => {
                setActive("carousel");
                setActiveSwitch("text");
              }
            }
          ]}
        />
        <CurrentSection label="SmartCommerce Inspector" />
        <TextJsonSwitch
          showTable={active === "retailers"}
          activeSwitch={activeSwitch}
          setActiveSwitch={setActiveSwitch}
        />
        <Container>
          <ContentContainer>
            <InputsRow>
              <SelectInput
                currentField={selectedField || ""}
                setCurrentField={setSelectedField}
                label="SmartCommerce MP ID Field"
                placeholder="SC MP ID Field..."
                className="w-3/12"
                data={locale?.result[0]?.fields || []}
              />
              <SelectInput
                currentField={selectedPage || ""}
                setCurrentField={setSelectedPage}
                label="Product page"
                placeholder="Product page URL..."
                className="w-9/12"
                data={locale?.result[0].pages?.map(page => page.url) || []}
              />
            </InputsRow>
            {activeSwitch === "table" && selectedField && selectedPage ? (
              data ? (
                <div className="mt-4">
                  <ResultsTable data={data?.result} />
                </div>
              ) : (
                <TableSkeleton numRows={10} />
              )
            ) : null}
            {activeSwitch === "text" ? <TextView data={data?.result} /> : null}
            {activeSwitch === "json" ? <JsonView data={data?.result} /> : null}
          </ContentContainer>
        </Container>
      </section>
    </Layout>
  );
};

export default smartCommerce;
