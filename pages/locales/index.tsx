import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import type { NextPage } from "next";

import Layout from "../../components/Layout/Layout";

import useLocales from "../../lib/hooks/useLocales";

const Locales: NextPage = () => {
  const router = useRouter();
  const locales = useLocales();
  // console.log("locales from /locales", locales);
  // console.log("router", router);
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="">
        Locales:
        {locales?.result.map((locale, i) => (
          <div key={i}>
            {/* <Link href={`/locales/edit?locale=${locale.url.value}`}> */}
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
