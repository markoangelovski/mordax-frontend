import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

import type { NextPage } from "next";

import Layout from "../../components/Layout/Layout";

import usePage from "../../lib/hooks/usePage";

const EditPage: NextPage = () => {
  const router = useRouter();

  const page = usePage(router.query.p as string);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const existingLocale = queryParams.get("l");
    const existingPage = queryParams.get("p");

    // In case some other locale is selected from Locales Dropdown while the user is on Edit Page page
    if (!existingPage) {
      router.push(`/pages?l=${existingLocale}`, undefined, {
        shallow: true,
      });
    }
  }, [router.query.p]);

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="">
        Edit page
        <pre>{JSON.stringify(page, null, 2)}</pre>
      </section>
    </Layout>
  );
};

export default EditPage;
