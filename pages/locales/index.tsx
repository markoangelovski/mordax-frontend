import Head from "next/head";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

import type { NextPage } from "next";

import Layout from "../../components/Layout/Layout";
import MicroLinks from "../../components/MicroLinks/MicroLinks";
import CurrentSection from "../../components/CurrentSection/CurrentSection";

import useLocales from "../../lib/hooks/useLocales";

export interface MicroLink {
  label: string;
  active: boolean;
  action: () => void;
}

export const handleMicroLink = (router: NextRouter, endpoint: string) =>
  router.push(`/${endpoint}?l=${router.query.l}`, undefined, {
    shallow: true
  });

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
              action: () => handleMicroLink(router, "locales")
            },
            {
              label: "Pages",
              active: false,
              action: () => handleMicroLink(router, "pages")
            }
          ]}
        />
        <CurrentSection label="Locales" />
        Locales:
        <Link href={`/locales/new?l=${router.query.l}`}>+ Add locale</Link>
        {locales?.map((locale, i) => (
          <div key={i}>
            <Link href={`/locales/edit?l=${locale.url.value}`}>
              {locale.brand.value}
            </Link>{" "}
            {locale.locale.value}
          </div>
        ))}
      </section>
    </Layout>
  );
};

export default Locales;
