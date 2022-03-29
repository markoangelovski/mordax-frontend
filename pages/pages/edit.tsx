import { ChangeEvent, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useMutation } from "react-query";

import type { NextPage } from "next";

import Layout from "../../components/Layout/Layout";

import { usePage } from "../../lib/hooks/usePage";
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
import { Input, SelectInput } from "../../components/Inputs/Inputs";
import useLocale from "../../lib/hooks/useLocale";
import Button from "../../components/Button/Button";

const EditPage: NextPage = () => {
  const [currentField, setCurrentField] = useState<string>("");
  const [currentFieldValue, setCurrentFieldValue] = useState<string>("");
  const [fields, setFields] = useState<object[]>([]);

  const [currentPsCountry, setCurrentPsCountry] = useState<string>("");
  const [currentPsInstance, setCurrentPsInstance] = useState<string>("");
  const [currentPsSkuField, setCurrentPsSkuField] = useState<string>("");

  const router = useRouter();

  const { oldKey } = useKey();

  const locale = useLocale(router.query.l as string);

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

  const handleAddField = () => {
    if (!currentField || !currentFieldValue) return;
    setFields(fields => [...fields, { [currentField]: currentFieldValue }]);
    setCurrentField("");
    setCurrentFieldValue("");
  };

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
                value={page?.SKU || ""}
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
                label="Modified"
                defaultValue={
                  page?.updatedAt && new Date(page?.updatedAt).toDateString()
                }
                disabled={true}
                className="w-3/12"
              />
            </InputsRow>
            <InputsRow>
              <SelectInput
                currentField={currentField}
                setCurrentField={setCurrentField}
                label="Field"
                className="w-3/12"
                data={locale?.result[0].fields || []}
              />
              <Input
                label="Value"
                placeholder="Enter value"
                value={currentFieldValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCurrentFieldValue(e.currentTarget.value)
                }
                disabled={false}
                className="w-6/12"
              />
            </InputsRow>
            {fields.map((field, i) => (
              <InputsRow key={i}>
                <Input
                  defaultValue={Object.keys(field)[0]}
                  disabled={true}
                  className="w-3/12"
                />
                <Input
                  defaultValue={Object.values(field)[0]}
                  disabled={true}
                  className="w-6/12"
                />
              </InputsRow>
            ))}
            <InputsRow className="mr-[25%] justify-end pr-4">
              <Button
                className="h-10 px-4 text-sky-700 hover:border-sky-900 hover:text-sky-900"
                label="Add"
                handler={handleAddField}
              />
            </InputsRow>
            <InputsRow className="justify-end">
              <Input label="Created" className="w-3/12" />
            </InputsRow>
            {Object.keys(page?.data || {}).map((item, i) => (
              <InputsRow key={i}>
                <Input defaultValue={item} disabled={true} className="w-3/12" />
                <Input
                  defaultValue={page?.data[item].value}
                  disabled={true}
                  className="w-6/12"
                />
                <Input
                  defaultValue={new Date(
                    page?.data[item].createdAt || ""
                  ).toDateString()}
                  disabled={true}
                  className="w-3/12"
                />
              </InputsRow>
            ))}
            {page?.PS ? (
              <>
                <InputsRow>
                  <Input
                    label="PriceSpider OK"
                    defaultValue={`${page?.PS.ok || ""}`}
                    disabled={true}
                    className="w-3/12"
                  />
                  <Input
                    label="Last Scan"
                    defaultValue={new Date(
                      page?.PS.lastScan || ""
                    ).toDateString()}
                    disabled={true}
                    className="w-3/12"
                  />
                </InputsRow>
                <InputsRow>
                  <Input label="Retailer name" className="w-3/12" />
                  <Input label="Price" className="w-3/12" />
                  <Input label="PMID" className="w-3/12" />
                  <Input label="SID" className="w-3/12" />
                </InputsRow>
                {page.PS.matches.map((match, i) => (
                  <InputsRow key={i}>
                    <Input
                      defaultValue={match.retailerName}
                      disabled={true}
                      className="w-3/12"
                    />
                    <Input
                      defaultValue={match.price}
                      disabled={true}
                      className="w-3/12"
                    />
                    <Input
                      defaultValue={match.pmid}
                      disabled={true}
                      className="w-3/12"
                    />
                    <Input
                      defaultValue={match.sid}
                      disabled={true}
                      className="w-3/12"
                    />
                  </InputsRow>
                ))}
                <InputsRow>
                  <SelectInput
                    currentField={currentPsCountry}
                    setCurrentField={setCurrentPsCountry}
                    label="PriceSpider Country"
                    placeholder="PS country..."
                    className="w-2/12"
                    data={locale?.result[0].PS.psCountries || []}
                  />
                  <SelectInput
                    currentField={currentPsInstance}
                    setCurrentField={setCurrentPsInstance}
                    label="PriceSpider Instance"
                    placeholder="PS instance..."
                    className="w-2/12"
                    data={locale?.result[0].PS.psInstances || []}
                  />
                  <SelectInput
                    currentField={currentPsSkuField}
                    setCurrentField={setCurrentPsSkuField}
                    label="PriceSpider SKU Field"
                    placeholder="PS SKU Field..."
                    className="w-2/12"
                    data={locale?.result[0].fields || []}
                  />
                  <div className="flex w-3/12 flex-col">
                    <Button
                      className="mr-4 mt-7 h-10 grow text-sky-700 hover:border-sky-900 hover:text-sky-900"
                      label="Refresh seller matches"
                      // handler={handleCancelForm}
                    />
                    <div className="relative">
                      <span className="absolute text-sm text-green-600/50">
                        Sellers refreshed successfully.
                      </span>
                      <span className="absolute text-sm text-red-600/50">
                        Error occurred while refreshing sellers.
                      </span>
                    </div>
                  </div>
                  <div className="flex w-3/12">
                    <Button
                      className="mr-4 mt-7 h-10 grow text-sky-700 hover:border-sky-900 hover:text-sky-900"
                      label="Inspect seller details"
                      // handler={handleCancelForm}
                    />
                  </div>
                </InputsRow>
              </>
            ) : null}
            <InputsRow className="justify-end">
              <Button
                className="mr-4 mt-4 h-10 px-4 text-red-500 hover:border-red-700 hover:text-red-700"
                label="Delete page"
                handler={() => {
                  mutate(`/pages?key=${oldKey}&id=${page?.id}`, {
                    onSettled: data => {
                      console.log("data", data);
                      // TODO: add a message that page is deleted.
                    }
                  });

                  progressBar(isLoading, isLoading, isSuccess);
                }}
              />
              <Button
                className="mr-4 mt-4 h-10 px-4 text-sky-700 hover:border-sky-900 hover:text-sky-900"
                label="Cancel"
                // handler={handleCancelForm}
              />
              <Button
                className="mr-4 mt-4 h-10 px-4 text-sky-700 hover:border-sky-900 hover:text-sky-900"
                label="Save"
                // handler={handleCancelForm}
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
