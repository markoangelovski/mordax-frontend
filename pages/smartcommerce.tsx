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
import ContentTable from "../components/ContentTable/ContentTable";
import {
  LinesSkeleton,
  TableSkeleton
} from "../components/Skeletons/Skeletons";

const smartCommerce: NextPage = () => {
  // Currently selected active section
  const [active, setActive] = useState<string>("retailers");
  // Set default active switch to table
  const [activeSwitch, setActiveSwitch] = useState<string>("table");

  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const router = useRouter();

  const locale = useLocale(router.query.l as string, true, "type:product");

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
                setActiveSwitch(activeSwitch);
              }
            },
            {
              label: "Button",
              active: active === "button",
              action: () => {
                setActive("button");
                setActiveSwitch(
                  activeSwitch === "table" ? "text" : activeSwitch
                );
              }
            },
            {
              label: "Carousel",
              active: active === "carousel",
              action: () => {
                setActive("carousel");
                setActiveSwitch(
                  activeSwitch === "table" ? "text" : activeSwitch
                );
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
            {locale?.result[0]?.SC ? (
              <InputsRow>
                <SelectInput
                  currentField={selectedField || ""}
                  setCurrentField={setSelectedField}
                  label="SmartCommerce MP ID Field"
                  placeholder="Select SC MP ID Field..."
                  className="w-3/12"
                  data={locale?.result[0]?.fields || []}
                />
                <SelectInput
                  currentField={selectedPage || ""}
                  setCurrentField={setSelectedPage}
                  label="Product page"
                  placeholder="Select product page URL..."
                  className="w-9/12"
                  data={locale?.result[0].pages?.map(page => page.url) || []}
                />
              </InputsRow>
            ) : (
              <div>
                Locale{" "}
                <strong>
                  {locale?.result[0].brand.value}{" "}
                  {locale?.result[0].locale.value}{" "}
                </strong>
                does not have SC-related data.
              </div>
            )}

            {activeSwitch === "table" && selectedField && selectedPage ? (
              data ? (
                <div className="mt-4">
                  <ContentTable data={data?.result} sortDisabled={true} />
                </div>
              ) : (
                <TableSkeleton numRows={10} />
              )
            ) : null}

            {activeSwitch === "text" && selectedField && selectedPage ? (
              data ? (
                <TextView data={data?.result} />
              ) : (
                <LinesSkeleton numRows={40} />
              )
            ) : null}

            {activeSwitch === "json" && selectedField && selectedPage ? (
              data ? (
                <JsonView data={data?.result} />
              ) : (
                <LinesSkeleton numRows={40} />
              )
            ) : null}
          </ContentContainer>
        </Container>
      </section>
    </Layout>
  );
};

export default smartCommerce;
