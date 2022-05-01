import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

import type { NextPage } from "next";

import Layout from "../components/Layout/Layout";

import * as urls from "../config";

import { usePage } from "../lib/hooks/usePage";
import useXmlSitemap from "../lib/hooks/useXmlSitemap";
import useBinLite, { useBinLiteSingleProduct } from "../lib/hooks/useBinLite";
import CurrentSection from "../components/CurrentSection/CurrentSection";
import {
  Container,
  ContentContainer
} from "../components/Containers/Containers";
import TableTextJsonSwitch from "../components/TableTextJsonSwitch/TableTextJsonSwitch";
import MicroLinks from "../components/MicroLinks/MicroLinks";
import { BinLiteProduct } from "../lib/interfaces/binLite";
import TextView from "../components/TextView/TextView";
import JsonView from "../components/JsonView/JsonView";
import Meta from "../components/Meta/Meta";
import ContentTable from "../components/ContentTable/ContentTable";
import {
  LinesSkeleton,
  TableSkeleton
} from "../components/Skeletons/Skeletons";
import useLocale from "../lib/hooks/useLocale";
import { InputsRow } from "../components/LayoutElements/LayoutElements";
import { SelectInput, SelectProductInput } from "../components/Inputs/Inputs";

const binLite: NextPage = () => {
  // Currently selected active section
  const [active, setActive] = useState<string>("retailers");
  // Set default active switch to table
  const [activeSwitch, setActiveSwitch] = useState<string>("table");

  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState<{ id: string; url: string }>(
    { id: "", url: "" }
  );

  const router = useRouter();

  const locale = useLocale(router.query.l as string, true, "type:product");

  const retailerData = useBinLite(router.query.l as string);

  const bnlSku = locale?.result[0].pages?.find(
    page => page.id === selectedPage.id
  )?.data[selectedField || ""].value;

  const productData = useBinLiteSingleProduct(
    router.query.l as string,
    bnlSku || ""
  );

  useEffect(
    () => () => {
      // Clear state every time a new locale is selected from the Select Locales dropdown
      setSelectedField(null);
      setSelectedPage({ id: "", url: "" });
    },
    [locale]
  );

  return (
    <Layout>
      <Meta
        title="BIN Lite Inspector"
        description="BIN Lite Inspector"
        canonical={urls.front + "/binlite"}
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
              label: "Product",
              active: active === "product",
              action: () => {
                setActive("product");
                setActiveSwitch(activeSwitch);
              }
            }
          ]}
        />
        <CurrentSection label="BIN Lite Inspector" />
        <TableTextJsonSwitch
          showTable={true}
          activeSwitch={activeSwitch}
          setActiveSwitch={setActiveSwitch}
        />
        <Container>
          <ContentContainer>
            {locale?.result[0]?.BINLite ? (
              active === "product" ? (
                <InputsRow>
                  <SelectInput
                    currentField={selectedField || ""}
                    setCurrentField={setSelectedField}
                    label="BIN Lite SKU Field"
                    placeholder="Select BNL SKU Field..."
                    className="w-3/12"
                    data={locale?.result[0]?.fields || []}
                  />
                  <SelectProductInput
                    currentField={selectedPage.url}
                    setCurrentField={setSelectedPage}
                    label="Product page"
                    placeholder="Select product page URL..."
                    className="w-9/12"
                    data={
                      locale?.result[0]?.pages?.map(page => ({
                        id: page.id,
                        url: page.url
                      })) || []
                    }
                  />
                </InputsRow>
              ) : null
            ) : (
              <div>
                Locale{" "}
                <strong>
                  {locale?.result[0].brand.value}{" "}
                  {locale?.result[0].locale.value}{" "}
                </strong>
                does not have PS-related data.
              </div>
            )}

            {/* Displays all retailers */}
            {active === "retailers" && activeSwitch === "table" ? (
              retailerData ? (
                <div className="mt-4">
                  <ContentTable
                    data={retailerData?.result.map(seller => ({
                      RetailerName: seller.RetailerName,
                      BuyNowUrl: seller.BuyNowUrl,
                      Retailerlogo:
                        "data:image/png;base64," + seller.Retailerlogo
                    }))}
                    sortDisabled={true}
                  />
                </div>
              ) : (
                <TableSkeleton numRows={10} />
              )
            ) : null}

            {active === "retailers" && activeSwitch === "text" ? (
              retailerData ? (
                <TextView data={retailerData?.result} />
              ) : (
                <LinesSkeleton numRows={10} />
              )
            ) : null}

            {active === "retailers" && activeSwitch === "json" ? (
              retailerData ? (
                <JsonView data={retailerData?.result} />
              ) : (
                <LinesSkeleton numRows={10} />
              )
            ) : null}

            {/* Displays retailers for single product */}
            {active === "product" &&
            activeSwitch === "table" &&
            selectedField &&
            selectedPage.id ? (
              productData ? (
                <div className="mt-4">
                  <ContentTable
                    data={productData?.result.map(seller => ({
                      RetailerName: seller.RetailerName,
                      BuyNowUrl: seller.BuyNowUrl,
                      Retailerlogo:
                        "data:image/png;base64," + seller.Retailerlogo
                    }))}
                    sortDisabled={true}
                  />
                </div>
              ) : (
                <TableSkeleton numRows={10} />
              )
            ) : null}

            {active === "product" && activeSwitch === "text" ? (
              productData ? (
                <TextView data={productData?.result} />
              ) : (
                <LinesSkeleton numRows={40} />
              )
            ) : null}

            {active === "product" && activeSwitch === "json" ? (
              productData ? (
                <JsonView data={productData?.result} />
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

export default binLite;
