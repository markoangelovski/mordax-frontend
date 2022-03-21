import Head from "next/head";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useMutation } from "react-query";

import type { NextPage } from "next";

import Layout from "../../components/Layout/Layout";

import useLocale from "../../lib/hooks/useLocale";
import fetchData from "../../lib/drivers/fetchData";
import useKey from "../../lib/hooks/useKey";
import progressBar from "../../lib/helpers/progressBar";
import MicroLinks from "../../components/MicroLinks/MicroLinks";
import { handleMicroLink } from ".";
import CurrentSection from "../../components/CurrentSection/CurrentSection";

const EditLocale: NextPage = () => {
  const router = useRouter();
  // console.log("router", router);

  const locale = useLocale(router.query.l as string, false);

  const { oldKey } = useKey();

  const { mutate, isLoading, isIdle, isSuccess } = useMutation(
    (endpoint: string) => fetchData(endpoint, "DELETE")
  );

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
        Edit locale
        <br />
        <button
          onClick={() => {
            mutate(`/locales/single?key=${oldKey}&url=${locale?.url.value}`, {
              onSettled: data => {
                console.log("data", data);
              }
            });

            progressBar(isLoading, isLoading, isSuccess);
          }}
        >
          Delete locale
        </button>
        <pre>{JSON.stringify(locale, null, 2)}</pre>
      </section>
    </Layout>
  );
};

export default EditLocale;
