import Head from "next/head";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

import type { NextPage } from "next";

import Layout from "../../components/Layout/Layout";
import MicroLinks from "../../components/MicroLinks/MicroLinks";
import CurrentSection from "../../components/CurrentSection/CurrentSection";

import useLocales from "../../lib/hooks/useLocales";
import AddEntryButton from "../../components/AddEntryButton/AddEntryButton";
import {
  Container,
  ContentContainer
} from "../../components/Containers/Containers";
import { handleLinkClick } from "../../lib/helpers/utils";

export interface MicroLink {
  label: string;
  active: boolean;
  action: () => void;
}

const Locales: NextPage = () => {
  const router = useRouter();
  const locales = useLocales();

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
                      {`${locales?.info.skip ? locales?.info.skip : 1} - ${
                        locales?.info.skip
                          ? locales?.info.limit + locales?.info.skip
                          : locales?.info.locales
                      } of
                      ${locales?.info.total}
                      Locales`}
                    </span>
                  </div>
                  <div className="ml-2 box-content h-6 border-l border-slate-300 pl-2 leading-6">
                    <span>Sort: Brand, A–Z</span>
                  </div>
                </div>
                <div>search</div>
              </div>
            </div>
            Locales:
            <Link href={`/locales/new?l=${router.query.l}`}>+ Add locale</Link>
            {locales?.result.map((locale, i) => (
              <div key={i}>
                <Link href={`/locales/edit?l=${locale.url.value}`}>
                  {locale.brand.value}
                </Link>{" "}
                {locale.locale.value}
              </div>
            ))}
          </ContentContainer>
        </Container>
      </section>
    </Layout>
  );
};

export default Locales;
