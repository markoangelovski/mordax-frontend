import Head from "next/head";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

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
import ResultsTable from "../../components/ResultsTable/ContentTable";
import { TableSkeleton } from "../../components/Skeletons/Skeletons";

const Locales: NextPage = () => {
  const router = useRouter();
  const locales = useLocales();

  const skip = locales?.info.skip || 0;
  const fetchedLocales = locales?.info.locales || 0;
  const total = locales?.info.total || 0;

  const minLocaleCount = locales?.result.length ? 1 : 0;

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
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
            <div className="mb-6 flex items-center justify-between">
              <div className="mb-6 flex max-w-2xl items-center text-sm text-gray-400">
                <span>Available locales</span>
              </div>
              <AddEntryButton
                label="Add locale"
                action={() => handleLinkClick(router, "locales/new")}
              />
            </div>
            <div className="mb-4">
              {/* Filter products by active status - dropdown placeholder */}
              <div className="box-content flex h-14 items-center justify-between bg-slate-100 px-4 text-sm tracking-wide">
                <div className="flex items-center">
                  <div className="text-sm tracking-wide">
                    <span>
                      {`${skip ? skip : minLocaleCount} - ${
                        skip ? skip + fetchedLocales : fetchedLocales
                      } of
                      ${total}
                      Locales`}
                    </span>
                  </div>
                  <div className="ml-2 box-content h-6 border-l border-slate-300 pl-2 leading-6">
                    <span>Sort: Brand, A–Z</span>
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

export default Locales;
