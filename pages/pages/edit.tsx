import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useMutation } from "react-query";

import type { NextPage } from "next";

import Layout from "../../components/Layout/Layout";

import usePage from "../../lib/hooks/usePage";
import fetchData from "../../lib/drivers/fetchData";
import useKey from "../../lib/hooks/useKey";
import progressBar from "../../lib/helpers/progressBar";
import MicroLinks from "../../components/MicroLinks/MicroLinks";
import { handleMicroLink } from "../locales";
import CurrentSection from "../../components/CurrentSection/CurrentSection";

const EditPage: NextPage = () => {
  const router = useRouter();

  const { oldKey } = useKey();

  const page = usePage(router.query.p as string);

  const { mutate, isLoading, isIdle, isSuccess } = useMutation(
    (endpoint: string) => fetchData(endpoint, "DELETE")
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const existingLocale = queryParams.get("l");
    const existingPage = queryParams.get("p");

    // In case some other locale is selected from Locales Dropdown while the user is on Edit Page page
    if (!existingPage) {
      router.push(`/pages?l=${existingLocale}`, undefined, {
        shallow: true
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
        <CurrentSection label="Pages" />
        Edit page
        <br />
        <button
          onClick={() => {
            mutate(`/pages?key=${oldKey}&id=${page?.id}`, {
              onSettled: data => {
                console.log("data", data);
                // TODO: add a message that page is deleted.
              }
            });

            progressBar(isLoading, isLoading, isSuccess);
          }}
        >
          Delete page
        </button>
        <pre>{JSON.stringify(page, null, 2)}</pre>
      </section>
    </Layout>
  );
};

export default EditPage;
