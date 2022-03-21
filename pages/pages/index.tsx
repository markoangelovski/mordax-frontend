import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import type { NextPage } from "next";

import Layout from "../../components/Layout/Layout";

import useLocale from "../../lib/hooks/useLocale";
import MicroLinks from "../../components/MicroLinks/MicroLinks";
import { handleMicroLink } from "../locales";

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
        <MicroLinks
          items={[
            {
              label: "Locales",
              active: false,
              action: () => handleMicroLink(router, "locales")
            },
            {
              label: "Pages",
              active: true,
              action: () => handleMicroLink(router, "pages")
            }
          ]}
        />
        Pages
        <Link href={`/pages/new?l=${router.query.l}`}>+ Add a page</Link>
        {locale?.pages?.map(page => (
          <div key={page.id}>
            <Link href={`/pages/edit?l=${router.query.l}&p=${page.id}`}>
              {page.url}
            </Link>
          </div>
        ))}
      </section>
    </Layout>
  );
};

export default EditPage;
