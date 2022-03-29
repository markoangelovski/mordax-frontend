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

import CurrentSection from "../../components/CurrentSection/CurrentSection";
import {
  Container,
  ContentContainer
} from "../../components/Containers/Containers";
import { handleLinkClick } from "../../lib/helpers/utils";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Details from "../../components/Details/Details";

const EditLocale: NextPage = () => {
  const router = useRouter();

  const locale = useLocale(router.query.l as string);

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
            <Breadcrumbs
              breadcrumbs={[
                { label: "Locales", endpoint: `/locales?l=${router.query.l}` },
                { label: router.query.l as string }
              ]}
            />
            <Details />
            Edit locale
            <br />
            <button
              onClick={() => {
                mutate(
                  `/locales/single?key=${oldKey}&url=${locale?.result[0].url.value}`,
                  {
                    onSettled: data => {
                      console.log("data", data);
                    }
                  }
                );

                progressBar(isLoading, isLoading, isSuccess);
              }}
            >
              Delete locale
            </button>
            <pre>{JSON.stringify(locale, null, 2)}</pre>
          </ContentContainer>
        </Container>
      </section>
    </Layout>
  );
};

export default EditLocale;
