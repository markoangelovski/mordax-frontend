import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

import type { NextPage } from "next";

import Layout from "../components/Layout/Layout";

import * as urls from "../config";

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
import Meta from "../components/Meta/Meta";
import ContentTable from "../components/ContentTable/ContentTable";
import {
  LinesSkeleton,
  TableSkeleton
} from "../components/Skeletons/Skeletons";

const binLite: NextPage = () => {
  // Currently selected active section
  const [active, setActive] = useState<string>("retailers");
  // Set default active switch to table
  const [activeSwitch, setActiveSwitch] = useState<string>("table");

  const router = useRouter();

  const data = useBinLite(router.query.l as string);

  return (
    <Layout>
      <Meta
        title="BIN Lite Inspector"
        description="BIN Lite Inspector"
        canonical={urls.front + "/binlite"}
      />

      <section className="">
        <CurrentSection label="BIN Lite Inspector" />
        <TextJsonSwitch
          showTable={active === "retailers"}
          activeSwitch={activeSwitch}
          setActiveSwitch={setActiveSwitch}
        />
        <Container>
          <ContentContainer>
            {!data?.hasErrors ? null : (
              <div>
                Locale <strong>{router.query.l} </strong>
                does not have BIN Lite-related data.
              </div>
            )}

            {activeSwitch === "table" ? (
              data ? (
                <div className="mt-4">
                  <ContentTable
                    data={data?.result.map(seller => ({
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

            {activeSwitch === "text" ? (
              data ? (
                <TextView data={data?.result} />
              ) : (
                <LinesSkeleton numRows={10} />
              )
            ) : null}

            {/* {activeSwitch === "text" ? <TextView data={data?.result} /> : null} */}
            {activeSwitch === "json" ? <JsonView data={data?.result} /> : null}
          </ContentContainer>
        </Container>
      </section>
    </Layout>
  );
};

export default binLite;
