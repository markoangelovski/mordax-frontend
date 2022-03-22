import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import type { NextPage } from "next";

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

const Page: NextPage = () => {
  const router = useRouter();

  const locale = useLocale(router.query.l as string, true);

  const skip = locale?.info.skip || 0;
  const fetchedEntries = locale?.info.entries || 0;
  const total = locale?.info.total || 0;

  const minEntriesCount = locale?.result.length ? 1 : 0;

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
            <div className="mb-6 flex items-center justify-between">
              <div className="mb-6 flex max-w-2xl items-center text-sm text-gray-400">
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
                <div>search</div>
              </div>
            </div>
            Pages
            <Link href={`/pages/new?l=${router.query.l}`}>+ Add a page</Link>
            {locale?.result[0].pages?.map(page => (
              <div key={page.id}>
                <Link href={`/pages/edit?l=${router.query.l}&p=${page.id}`}>
                  {page.url}
                </Link>
              </div>
            ))}
          </ContentContainer>
        </Container>
      </section>
    </Layout>
  );
};

export default Page;
