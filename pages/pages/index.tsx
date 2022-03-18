import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import type { NextPage } from "next";

import Layout from "../../components/Layout/Layout";

import useLocale from "../../lib/hooks/useLocale";

const EditPage: NextPage = () => {
  const router = useRouter();
  // console.log("router", router);

  const locale = useLocale(router.query.l as string, true);

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="">
        Edit Page
        <pre>{JSON.stringify(locale, null, 2)}</pre>
      </section>
    </Layout>
  );
};

export default EditPage;
