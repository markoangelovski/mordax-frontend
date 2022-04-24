import Head from "next/head";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

import * as urls from "../../config";

import type { NextPage } from "next";

import useLocales from "../../lib/hooks/useLocales";

import Layout from "../../components/Layout/Layout";
import MicroLinks from "../../components/MicroLinks/MicroLinks";
import CurrentSection from "../../components/CurrentSection/CurrentSection";
import SearchEntries from "../../components/SearchEntries/SearchEntries";
import AddEntryButton from "../../components/AddEntryButton/AddEntryButton";
import {
  Container,
  ContentContainer
} from "../../components/Containers/Containers";

import { handleLinkClick } from "../../lib/helpers/utils";
import ContentTable from "../../components/ContentTable/ContentTable";
import { TableSkeleton } from "../../components/Skeletons/Skeletons";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Meta from "../../components/Meta/Meta";
import { useState } from "react";
import SortSummary from "../../components/SortSummary/SortSummary";

const Locales: NextPage = () => {
  const [sortItem, setSortItem] = useState<{ label: string; sort: boolean }>({
    label: "brand",
    sort: true
  });

  const [paginationPage, setPaginationPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(25);

  const router = useRouter();
  const locales = useLocales(
    sortItem.sort ? sortItem.label : "-" + sortItem.label,
    paginationPage,
    perPage
  );

  const skipped = locales?.info.skipped || 0;
  const fetchedEntries = locales?.info.entries || 0;
  const total = locales?.info.total || 0;

  const minEntriesCount = locales?.result.length ? 1 : 0;

  const sortLabels: string[] = [
    "brand",
    "locale",
    "url",
    "createdAt",
    "updatedAt"
  ];

  const data = locales?.result.map(locale => ({
    Brand: {
      label: locale.brand.value,
      endpoint: `/locales/edit?l=${locale.url.value}`
    },
    Locale: locale.locale.value,
    URL: { label: locale.url.value, endpoint: locale.url.value },
    Created: new Date(locale.createdAt).toDateString(),
    Updated: new Date(locale.updatedAt).toDateString()
  }));

  return (
    <Layout>
      <Meta
        title="Locales"
        description="Available locales"
        canonical={urls.front + "/locales"}
      />

      <section className="">
        <MicroLinks
          items={[
            {
              label: "Locales",
              active: true,
              action: () => handleLinkClick(router, "locales")
            },
            {
              label: "Pages",
              active: false,
              action: () => handleLinkClick(router, "pages")
            }
          ]}
        />
        <CurrentSection label="Locales" />
        <Container>
          <ContentContainer>
            <Breadcrumbs breadcrumbs={[{ label: "Locales" }]} />
            <div className="mb-6 flex items-center justify-between">
              <div className="mt-6 flex max-w-2xl items-center text-sm text-gray-400">
                <span>Available locales</span>
              </div>
              <AddEntryButton
                label="Add locale"
                action={() => handleLinkClick(router, "locales/new")}
              />
            </div>
            <div className="mb-4">
              {/* Filter products by active status - dropdown placeholder */}
              <SortSummary
                type="Locales"
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

export default Locales;
