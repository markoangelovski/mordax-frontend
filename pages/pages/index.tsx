import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import type { NextPage } from "next";

import * as urls from "../../config";

import Layout from "../../components/Layout/Layout";

import useLocale from "../../lib/hooks/useLocale";
import MicroLinks from "../../components/MicroLinks/MicroLinks";
import CurrentSection from "../../components/CurrentSection/CurrentSection";
import {
  Container,
  ContentContainer
} from "../../components/Containers/Containers";
import { handleLinkClick, toStdCase } from "../../lib/helpers/utils";
import AddEntryButton from "../../components/AddEntryButton/AddEntryButton";
import SearchEntries from "../../components/SearchEntries/SearchEntries";
import ContentTable from "../../components/ContentTable/ContentTable";
import { usePages } from "../../lib/hooks/usePage";
import { TableSkeleton } from "../../components/Skeletons/Skeletons";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Meta from "../../components/Meta/Meta";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import SortSummary from "../../components/SortSummary/SortSummary";
import Filters from "../../components/Filters/Filters";

type Payload = { [key: string]: string | boolean };

interface DataItem {
  URL: {
    label: string;
    endpoint: string;
  };
  Type: string | undefined;
  "In XML Sitemap": boolean | undefined;
  Active: boolean | undefined;
  SKU: string | undefined;
}

const Page: NextPage = () => {
  const [sortItem, setSortItem] = useState<{ label: string; sort: boolean }>({
    label: "type",
    sort: false
  });
  const [filterFields, setFilterFields] = useState<string[]>([]);
  const [displayFields, setDisplayFields] = useState<string[]>([]);

  const [paginationPage, setPaginationPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(25);

  const router = useRouter();

  const locale = useLocale(router.query.l as string);
  const pagesData = usePages(
    router.query.l as string,
    sortItem.sort ? sortItem.label : "-" + sortItem.label,
    paginationPage,
    perPage
  );

  useEffect(() => {
    const mappedLabels = sortLabels.map(label => {
      if (label === "url") return "URL";
      if (label === "type") return "Type";
      if (label === "inXmlSitemap") return "In XML Sitemap";
      if (label === "active") return "Active";
      if (label === "ok" && locale?.result[0].PS) return "PriceSpider OK";
      if (label === "matches" && locale?.result[0].PS)
        return "PriceSpider matches";
      if (label === "ok" && locale?.result[0].SC) return "SmartCommerce OK";
      if (label === "matches" && locale?.result[0].SC)
        return "SmartCommerce matches";
      if (label === "ok" && locale?.result[0].BINLite) return "BIN Lite OK";
      if (label === "matches" && locale?.result[0].BINLite)
        return "BIN Lite matches";
      if (label === "lastScan") return "Last scan";
      return label;
    });
    setFilterFields(mappedLabels);
    setDisplayFields(mappedLabels);
  }, [locale]);

  const pages = pagesData?.result;

  const skipped = pagesData?.info.skipped || 0;
  const fetchedEntries = pagesData?.info.entries || 0;
  const total = pagesData?.info.total || 0;

  const minEntriesCount = locale?.result.length ? 1 : 0;

  const sortLabels = [
    "url",
    "type",
    "inXmlSitemap",
    "active",
    "SKU",
    ...(locale?.result[0]?.fields || []),
    "ok",
    "matches", // Not used for sorting, kept for preserving order of elements in array
    "lastScan"
  ];

  const data = pages
    ?.map(page => {
      const pageDataPayload: Payload = {};
      locale?.result[0].fields.forEach(key => {
        pageDataPayload[key] = page.data?.[key]?.value;
      });

      const psPayload: Payload = {};
      if (locale?.result[0].PS) {
        psPayload["PriceSpider OK"] = page.PS?.ok;
        psPayload["PriceSpider matches"] = page.PS?.matches
          .map(match => match.retailerName)
          .join(", ");
        psPayload["Last scan"] =
          page.PS && new Date(page.PS?.lastScan).toDateString();
      }

      const binLitePayload: Payload = {};
      if (locale?.result[0].BINLite) {
        binLitePayload["BIN Lite OK"] = page.BINLite?.ok;
        binLitePayload["BIN Lite matches"] = page.BINLite?.matches
          .map(match => match.retailerName)
          .join(", ");
        binLitePayload["Last scan"] =
          page.BINLite && new Date(page.BINLite?.lastScan).toDateString();
      }

      const scPayload: Payload = {};
      if (locale?.result[0].SC) {
        scPayload["SmartCommerce OK"] = page.SC?.ok;
        scPayload["SmartCommerce matches"] = page.SC?.matches
          .map(match => match.retailerName)
          .join(", ");
        scPayload["Last scan"] =
          page.SC && new Date(page.SC?.lastScan).toDateString();
      }

      return {
        URL: {
          label: page.url,
          endpoint: `/pages/edit?l=${router.query.l}&p=${page.id}`
        },
        Type: page.type,
        "In XML Sitemap": page.inXmlSitemap,
        Active: page.active,
        SKU: page.SKU,
        ...pageDataPayload,
        ...psPayload,
        ...binLitePayload,
        ...scPayload
      };
    })
    .map(item => {
      Object.keys(item).forEach(key => {
        if (filterFields?.indexOf(key) === -1)
          delete item[key as keyof DataItem];
      });
      return item;
    });

  return (
    <Layout>
      <Meta
        title={
          locale
            ? `${locale?.result[0]?.brand.value} ${locale?.result[0]?.locale.value} pages`
            : "Loading..."
        }
        description="Locale pages"
        canonical={urls.front + "/pages"}
      />

      <section className="">
        <MicroLinks
          items={[
            {
              label: "Locales",
              active: false,
              action: () => handleLinkClick(router, "locales")
            },
            {
              label: "Pages",
              active: true,
              action: () => handleLinkClick(router, "pages")
            }
          ]}
        />
        <CurrentSection label="Pages" />
        <Container>
          <ContentContainer>
            <Breadcrumbs
              breadcrumbs={[
                {
                  label: "Locales",
                  endpoint: `/locales?l=${router.query.l}`
                },
                {
                  label: router.query.l as string,
                  endpoint: `/locales/edit?l=${router.query.l}`
                },
                {
                  label: "Pages"
                }
              ]}
            />
            <div className="mb-6 flex items-center justify-between">
              <div className="mt-6 flex max-w-2xl items-center text-sm text-gray-400">
                <span>
                  {locale?.result[0]?.brand.value}{" "}
                  {locale?.result[0]?.locale.value} pages
                </span>
              </div>
              <AddEntryButton
                label="Add a page"
                action={() => handleLinkClick(router, "pages/new")}
              />
            </div>
            <div className="mb-4">
              <Filters
                fields={filterFields || []}
                setFilterFields={setFilterFields}
                displayFields={displayFields}
              />
              <SortSummary
                type="Pages"
                sortItem={sortItem}
                fetchedEntries={fetchedEntries}
                minEntriesCount={minEntriesCount}
                skipped={skipped}
                total={total}
                setPerPage={setPerPage}
              />
            </div>
            {data ? (
              <ContentTable
                data={data}
                sortItem={sortItem}
                setSortItem={setSortItem}
                sortLabels={sortLabels}
              />
            ) : (
              <TableSkeleton numRows={25} />
            )}
          </ContentContainer>
        </Container>
      </section>
    </Layout>
  );
};

export default Page;
