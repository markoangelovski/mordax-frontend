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

import CurrentSection from "../../components/CurrentSection/CurrentSection";
import {
  Container,
  ContentContainer
} from "../../components/Containers/Containers";
import { handleLinkClick } from "../../lib/helpers/utils";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Details from "../../components/Details/Details";
import { InputsRow } from "../../components/LayoutElements/LayoutElements";
import { Input } from "../../components/Inputs/Inputs";

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
            <Breadcrumbs
              breadcrumbs={[
                { label: "Pages", endpoint: `/pages?l=${router.query.l}` },
                { label: router.query.p as string }
              ]}
            />
            <Details />
            <InputsRow>
              <Input
                label="Brand"
                defaultValue={router.query.l as string}
                disabled={true}
                className="w-3/12"
              />
              <Input
                label="URL"
                placeholder="Page URL"
                defaultValue={page?.url}
                disabled={true}
                className="w-9/12"
              />
            </InputsRow>
            <InputsRow>
              <Input
                label="In XML Sitemap"
                defaultValue={`${page?.inXmlSitemap || ""}`}
                disabled={true}
                className="w-3/12"
              />
              <Input
                label="SKU"
                placeholder="Page SKU"
                value={page?.SKU}
                disabled={false}
                className="w-3/12"
              />
              <Input
                label="Created"
                defaultValue={
                  page?.createdAt && new Date(page?.createdAt).toDateString()
                }
                disabled={true}
                className="w-3/12"
              />
              <Input
                label="Created"
                defaultValue={
                  page?.updatedAt && new Date(page?.updatedAt).toDateString()
                }
                disabled={true}
                className="w-3/12"
              />
            </InputsRow>
            Edit page Edit page
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
          </ContentContainer>
        </Container>
      </section>
    </Layout>
  );
};

export default EditPage;
