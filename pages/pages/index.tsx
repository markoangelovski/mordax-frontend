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
import { handleLinkClick } from "../../lib/helpers/utils";
import AddEntryButton from "../../components/AddEntryButton/AddEntryButton";
import SearchEntries from "../../components/SearchEntries/SearchEntries";
import ResultsTable from "../../components/ResultsTable/ContentTable";
import { usePages } from "../../lib/hooks/usePage";
import { TableSkeleton } from "../../components/Skeletons/Skeletons";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Meta from "../../components/Meta/Meta";

type Payload = { [key: string]: string | boolean };

const Page: NextPage = () => {
  const router = useRouter();

  const locale = useLocale(router.query.l as string);
  const pagesData = usePages(router.query.l as string);
  const pages = pagesData?.result;

  const skip = pagesData?.info.skip || 0;
  const fetchedEntries = pagesData?.info.entries || 0;
  const total = pagesData?.info.total || 0;

  const minEntriesCount = locale?.result.length ? 1 : 0;

  const data = pages?.map(page => {
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
      psPayload["Refresh sellers"] = page.PS && "ok";
      psPayload["Last scan"] =
        page.PS && new Date(page.PS?.lastScan).toDateString();
    }

    const binLitePayload: Payload = {};
    if (locale?.result[0].BINLite) {
      binLitePayload["BIN Lite OK"] = page.BINLite?.ok;
      binLitePayload["BIN Lite matches"] = page.BINLite?.matches
        .map(match => match.retailerName)
        .join(", ");
      binLitePayload["Refresh sellers"] = page.BINLite && "ok";
      binLitePayload["Last scan"] =
        page.BINLite && new Date(page.BINLite?.lastScan).toDateString();
    }

    const scPayload: Payload = {};
    if (locale?.result[0].SC) {
      scPayload["SmartCommerce OK"] = page.SC?.ok;
      scPayload["SmartCommerce matches"] = page.SC?.matches
        .map(match => match.retailerName)
        .join(", ");
      scPayload["Refresh sellers"] = page.SC && "ok";
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
  });

  return (
    <Layout>
      <Meta
        title={
          locale
            ? `${locale?.result[0].brand.value} ${locale?.result[0].locale.value} pages`
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
                  {locale?.result[0].brand.value}{" "}
                  {locale?.result[0].locale.value} pages
                </span>
              </div>
              <AddEntryButton
                label="Add a page"
                action={() => handleLinkClick(router, "pages/new")}
              />
            </div>
            <div className="mb-4">
              {/* Filter products by active status - dropdown placeholder */}
              <div className="box-content flex h-14 items-center justify-between bg-slate-100 px-4 text-sm tracking-wide">
                <div className="flex items-center">
                  <div className="text-sm tracking-wide">
                    <span>
                      {/* TODO: normaliziraj pagination atribute u responsu, sad su svi različiti */}
                      {`${skip ? skip : minEntriesCount} - ${
                        skip ? skip + fetchedEntries : fetchedEntries
                      } of
                      ${total}
                      Pages`}
                    </span>
                  </div>
                  <div className="ml-2 box-content h-6 border-l border-slate-300 pl-2 leading-6">
                    <span>Sort: Type, A–Z</span>
                  </div>
                </div>
                <SearchEntries />
              </div>
            </div>
            {data ? (
              <ResultsTable data={data} />
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
