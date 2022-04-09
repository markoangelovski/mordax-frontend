import { ChangeEvent, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";

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
import { handleLinkClick, makeDataPayload } from "../../lib/helpers/utils";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Details from "../../components/Details/Details";
import { InputsRow } from "../../components/LayoutElements/LayoutElements";
import { Input, SelectInput } from "../../components/Inputs/Inputs";
import useLocale from "../../lib/hooks/useLocale";
import Button from "../../components/Button/Button";
import ResultsTable from "../../components/ResultsTable/ContentTable";
import useBinLite from "../../lib/hooks/useBinLite";
import { DeleteEntryIcon } from "../../components/Inputs/Inputs.icons";
import { Result } from "../../lib/interfaces/interfaces";
import { Page } from "../../lib/interfaces/pages";
import { InputSkeleton } from "../../components/Skeletons/Skeletons";

const EditPage: NextPage = () => {
  const [currentField, setCurrentField] = useState<string>("");
  const [currentFieldValue, setCurrentFieldValue] = useState<string>("");
  const [fields, setFields] = useState<{ [key: string]: string }[]>([]);

  const [currentPsCountry, setCurrentPsCountry] = useState<string>("");
  const [currentPsInstance, setCurrentPsInstance] = useState<string>("");
  const [currentPsSkuField, setCurrentPsSkuField] = useState<string>("");

  const [currentScMpidField, setCurrentScMpidField] = useState<string>("");

  const [currentBnlSkuField, setCurrentBnlSkuField] = useState<string>("");

  const [refreshSellersMsg, setRefreshSellersMsg] = useState<string>("");

  const [active, setActive] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();

  const { oldKey } = useKey();

  const locale = useLocale(router.query.l as string);

  const page = usePage(router.query.p as string);

  const binLiteSellers = useBinLite(
    router.query.l as string,
    !!locale?.result[0].BINLite?.BINLiteKey
  );

  // Rerfresh sellers hook
  const {
    mutate: refreshSellers,
    isLoading: isRsLoading,
    isSuccess: isRsSuccess
  } = useMutation((endpoint: string) => fetchData(endpoint, "GET"));

  // Update page hook
  const {
    mutate: updatePage,
    isLoading: isUpLoading,
    isSuccess: isUpSuccess
  } = useMutation((endpoint: string) => fetchData(endpoint, "POST"));

  // Delete page hook
  const {
    mutate: deletePage,
    isLoading: isDpLoading,
    isSuccess: isDpSuccess
  } = useMutation((endpoint: string) => fetchData(endpoint, "DELETE"));

  const queryClient = useQueryClient();

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

  useEffect(() => {
    setActive(page?.active || false);
    // Formik will not re-render when the page is fetched, hence these values are set in useEffect hook.
    formik.values.sku = page?.SKU || "";
    formik.values.type = page?.type || "";
  }, [page]);

  const handleAddField = () => {
    if (!currentField || !currentFieldValue) return;

    let fieldExists = false;
    fields.forEach(cfield => {
      if (Object.keys(cfield)[0] === currentField) fieldExists = true;
    });

    setFields(cfields => {
      if (fieldExists) {
        return cfields.map(mfield => {
          if (Object.keys(mfield)[0] === currentField) {
            mfield[currentField] = currentFieldValue;
          }
          return mfield;
        });
      } else {
        return [...cfields, { [currentField]: currentFieldValue }];
      }
    });

    setCurrentField("");
    setCurrentFieldValue("");
  };

  const formik = useFormik({
    initialValues: {
      // Formik will not re-render when the page is fetched, hence these values are set in useEffect hook.
      sku: page?.SKU,
      type: page?.type
    },
    validationSchema: Yup.object({
      sku: Yup.string(),
      type: Yup.string()
    }),
    onSubmit: values => {
      setErrorMessage("");
      updatePage(
        `/pages/single?key=${oldKey}&localeUrl=${
          locale?.result[0]?.url.value
        }&id=${page?.id}&type=${
          values.type
        }&active=${active}&data=${makeDataPayload(fields)}`,
        {
          onSettled: (data: Result<Page>, error) => {
            if (data instanceof Error || error)
              return setErrorMessage("Error occurred. Please try again later.");
            if (data.hasErrors) return setErrorMessage("Invalid access key.");

            queryClient.setQueryData(["page", router.query.p], data);
            handleCancelForm(); // Display updated values in the form
          }
        }
      );

      progressBar(isUpLoading, isUpLoading, isUpSuccess);
    }
  });

  // For pages that do not have SKU or type values, set those values to empty string by default in order to be visible on the form.
  if (page) page.SKU = page?.SKU || "";
  if (page) page.type = page?.type || "";
  const isSaveActive =
    formik.values.sku !== page?.SKU ||
    formik.values.type !== page?.type ||
    active !== page?.active ||
    fields.length >= 1;

  const handleCancelForm = () => {
    setActive(page?.active || false);
    formik.values.sku = page?.SKU || "";
    formik.values.type = page?.type || "";
    setFields([]);
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
            <form className="" onSubmit={formik.handleSubmit}>
              <InputsRow>
                {router.query.l ? (
                  <Input
                    label="Brand"
                    defaultValue={router.query.l as string}
                    disabled={true}
                    className="w-3/12"
                  />
                ) : (
                  <InputSkeleton className="w-3/12" />
                )}
                {page ? (
                  <Input
                    label="URL"
                    placeholder="Page URL"
                    defaultValue={page?.url}
                    disabled={true}
                    className="w-9/12"
                  />
                ) : (
                  <InputSkeleton className="w-9/12" />
                )}
              </InputsRow>
              <InputsRow>
                {page?.inXmlSitemap ? (
                  <Input
                    label="In XML Sitemap"
                    defaultValue={page?.inXmlSitemap ? "true" : "false"}
                    disabled={true}
                    className="w-3/12"
                  />
                ) : null}
                <Input
                  id="sku"
                  name="sku"
                  label="SKU"
                  placeholder="Page SKU"
                  value={formik.values.sku}
                  onChange={formik.handleChange}
                  disabled={false}
                  className="w-3/12"
                />
                <Input
                  id="type"
                  name="type"
                  label="Type"
                  placeholder="Page type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  disabled={false}
                  className="w-2/12"
                />
                <Input
                  label="Created"
                  defaultValue={
                    page?.createdAt && new Date(page?.createdAt).toDateString()
                  }
                  disabled={true}
                  className="w-2/12"
                />
                <Input
                  label="Modified"
                  defaultValue={
                    page?.updatedAt && new Date(page?.updatedAt).toDateString()
                  }
                  disabled={true}
                  className="w-2/12"
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
                  disabled={!currentField}
                  className="w-6/12"
                  onKeyDown={e => e.key === "Enter" && handleAddField()}
                />
                <div className="mt-6 flex w-3/12 justify-evenly pr-4">
                  <button
                    type="button"
                    onClick={() => setActive(true)}
                    className="flex items-center focus:outline-0"
                  >
                    <div
                      className={`mr-2 inline-block h-4 w-4 rounded-full ${
                        active
                          ? "border-2 border-white bg-sky-700"
                          : "border border-slate-500"
                      }`}
                      style={{
                        boxShadow: `${active ? "0 0 0 2px #0c7994" : "none"}`
                      }}
                    ></div>
                    <span>Active</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActive(false)}
                    className="flex items-center focus:outline-0"
                  >
                    <div
                      className={`mr-2 inline-block h-4 w-4 rounded-full ${
                        !active
                          ? "border-2 border-white bg-sky-700"
                          : "border border-slate-500"
                      }`}
                      style={{
                        boxShadow: `${!active ? "0 0 0 2px #0c7994" : "none"}`
                      }}
                    ></div>
                    <span>Inactive</span>
                  </button>
                </div>
              </InputsRow>
              {fields.map(field => (
                <InputsRow key={JSON.stringify(field)}>
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
                  <DeleteEntryIcon
                    className="mt-1"
                    onClick={() => {
                      setFields(currentFields =>
                        currentFields.filter(
                          ffield =>
                            JSON.stringify(ffield) !== JSON.stringify(field)
                        )
                      );
                    }}
                  />
                </InputsRow>
              ))}
              <InputsRow className="mr-[25%] justify-end pr-4">
                <Button
                  className={`h-10 px-4 ${
                    currentField.length && currentFieldValue.length
                      ? "text-sky-700 hover:border-sky-900 hover:text-sky-900"
                      : "bg-gray-100 text-gray-400"
                  }`}
                  label="Add"
                  handler={handleAddField}
                  disabled={
                    currentField.length && currentFieldValue.length
                      ? false
                      : true
                  }
                />
              </InputsRow>
              {page?.data && Object.keys(page?.data).length ? (
                <InputsRow className="justify-end">
                  <Input label="Created" className="w-3/12" />
                </InputsRow>
              ) : null}
              {Object.keys(page?.data || {}).map((item, i) => (
                <InputsRow key={i}>
                  <Input
                    defaultValue={item}
                    disabled={true}
                    className="w-3/12"
                  />
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
                      defaultValue={page?.PS.ok ? "true" : "false"}
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
                        className={`mr-4 mt-7 h-10 grow ${
                          currentPsSkuField.length &&
                          currentPsCountry.length &&
                          currentPsInstance.length
                            ? "text-sky-700 hover:border-sky-900 hover:text-sky-900"
                            : "bg-gray-100 text-gray-400"
                        }`}
                        label="Refresh seller matches"
                        handler={() => {
                          refreshSellers(
                            `/ps/product-data/single?key=${oldKey}&id=${page?.id}&psSkuFieldName=${currentPsSkuField}&countryCode=${currentPsCountry}&psInstance=${currentPsInstance}`,
                            {
                              onSettled: (data, error) => {
                                if (data instanceof Error || error)
                                  return setRefreshSellersMsg("false");
                                setRefreshSellersMsg("true");

                                queryClient.setQueryData(
                                  ["page", router.query.p],
                                  data
                                );
                              }
                            }
                          );

                          // progressBar(isRsLoading, isRsLoading, isRsSuccess);
                        }}
                        disabled={
                          !currentPsSkuField.length &&
                          !currentPsCountry.length &&
                          !currentPsInstance.length
                        }
                        showSpinner={isRsLoading}
                      />
                      <div className="relative">
                        {refreshSellersMsg === "true" ? (
                          <span className="absolute text-sm text-green-600/50">
                            Sellers refreshed successfully.
                          </span>
                        ) : null}
                        {refreshSellersMsg === "false" ? (
                          <span className="absolute text-sm text-red-600/50">
                            Error occurred while refreshing sellers.
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex w-3/12">
                      <Button
                        className="mr-4 mt-7 h-10 grow text-sky-700 hover:border-sky-900 hover:text-sky-900"
                        label="Inspect seller details"
                        handler={() => handleLinkClick(router, `/pricespider`)}
                      />
                    </div>
                  </InputsRow>
                  <div className="mt-5 mr-4">
                    <ResultsTable
                      data={page.PS.matches.map(match => ({
                        Name: match.retailerName,
                        Price: match.price,
                        PMID: match.pmid,
                        SID: match.sid
                      }))}
                    />
                  </div>
                </>
              ) : null}
              {page?.SC ? (
                <>
                  <InputsRow>
                    <Input
                      label="SmartCommerce OK"
                      defaultValue={page?.SC.ok ? "true" : "false"}
                      disabled={true}
                      className="w-3/12"
                    />
                    <Input
                      label="Last Scan"
                      defaultValue={new Date(page.SC.lastScan).toDateString()}
                      disabled={true}
                      className="w-3/12"
                    />
                  </InputsRow>
                  <InputsRow>
                    <SelectInput
                      currentField={currentScMpidField}
                      setCurrentField={setCurrentScMpidField}
                      label="SmartCommerce MP ID Field"
                      placeholder="SC MP ID Field..."
                      className="w-2/12"
                      data={locale?.result[0].fields || []}
                    />
                    <div className="flex w-3/12 flex-col">
                      <Button
                        className={`mr-4 mt-7 h-10 grow ${
                          currentScMpidField.length
                            ? "text-sky-700 hover:border-sky-900 hover:text-sky-900"
                            : "bg-gray-100 text-gray-400"
                        }`}
                        label="Refresh seller matches"
                        handler={() => {
                          refreshSellers(
                            `/sc/product-data/single?key=${oldKey}&id=${page?.id}&mpIdFieldName=${currentScMpidField}`,
                            {
                              onSettled: (data, error) => {
                                if (data instanceof Error || error)
                                  return setRefreshSellersMsg("false");
                                setRefreshSellersMsg("true");

                                queryClient.setQueryData(
                                  ["page", router.query.p],
                                  data
                                );
                              }
                            }
                          );

                          // progressBar(isRsLoading, isRsLoading, isRsSuccess);
                        }}
                        disabled={!currentScMpidField.length}
                        showSpinner={isRsLoading}
                      />
                      <div className="relative">
                        {refreshSellersMsg === "true" ? (
                          <span className="absolute text-sm text-green-600/50">
                            Sellers refreshed successfully.
                          </span>
                        ) : null}
                        {refreshSellersMsg === "false" ? (
                          <span className="absolute text-sm text-red-600/50">
                            Error occurred while refreshing sellers.
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex w-3/12">
                      <Button
                        className="mr-4 mt-7 h-10 grow text-sky-700 hover:border-sky-900 hover:text-sky-900"
                        label="Inspect seller details"
                        handler={() =>
                          handleLinkClick(router, `/smartcommerce`)
                        }
                      />
                    </div>
                  </InputsRow>
                  <div className="mt-5 mr-4">
                    <ResultsTable
                      data={page.SC.matches.map(match => ({
                        Name: match.retailerName,
                        URL: {
                          label: match.url,
                          endpoint: match.url
                        },
                        "Product Name": match.productName,
                        Price: match.price,
                        Logo: match.logo,
                        "Mini Logo": match.miniLogo
                      }))}
                    />
                  </div>
                </>
              ) : null}
              {page?.BINLite ? (
                <>
                  <InputsRow>
                    <Input
                      label="BIN Lite OK"
                      defaultValue={page?.BINLite.ok ? "true" : "false"}
                      disabled={true}
                      className="w-3/12"
                    />
                    <Input
                      label="Last Scan"
                      defaultValue={new Date(
                        page?.BINLite.lastScan || ""
                      ).toDateString()}
                      disabled={true}
                      className="w-3/12"
                    />
                  </InputsRow>
                  <InputsRow>
                    <SelectInput
                      currentField={currentBnlSkuField}
                      setCurrentField={setCurrentBnlSkuField}
                      label="BIN Lite SKU Field"
                      placeholder="BNL SKU Field..."
                      className="w-2/12"
                      data={locale?.result[0].fields || []}
                    />
                    <div className="flex w-3/12 flex-col">
                      <Button
                        className={`mr-4 mt-7 h-10 grow ${
                          currentBnlSkuField.length
                            ? "text-sky-700 hover:border-sky-900 hover:text-sky-900"
                            : "bg-gray-100 text-gray-400"
                        }`}
                        label="Refresh seller matches"
                        handler={() => {
                          refreshSellers(
                            `/binlite/product-data/single?key=${oldKey}&id=${page?.id}&binliteIdFieldName=${currentBnlSkuField}`,
                            {
                              onSettled: (data, error) => {
                                if (data instanceof Error || error)
                                  return setRefreshSellersMsg("false");
                                setRefreshSellersMsg("true");

                                queryClient.setQueryData(
                                  ["page", router.query.p],
                                  data
                                );
                              }
                            }
                          );

                          // progressBar(isRsLoading, isRsLoading, isRsSuccess);
                        }}
                        disabled={!currentBnlSkuField.length}
                        showSpinner={isRsLoading}
                      />
                      <div className="relative">
                        {refreshSellersMsg === "true" ? (
                          <span className="absolute text-sm text-green-600/50">
                            Sellers refreshed successfully.
                          </span>
                        ) : null}
                        {refreshSellersMsg === "false" ? (
                          <span className="absolute text-sm text-red-600/50">
                            Error occurred while refreshing sellers.
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex w-3/12">
                      <Button
                        className="mr-4 mt-7 h-10 grow text-sky-700 hover:border-sky-900 hover:text-sky-900"
                        label="Inspect seller details"
                        handler={() => handleLinkClick(router, `/binlite`)}
                      />
                    </div>
                  </InputsRow>
                  <div className="mt-5 mr-4">
                    <ResultsTable
                      data={page.BINLite.matches.map(match => ({
                        Name: match.retailerName,
                        URL: {
                          label: match.buyNowUrl,
                          endpoint: match.buyNowUrl
                        },
                        Logo:
                          "data:image/png;base64," +
                          binLiteSellers?.find(
                            seller => seller.RetailerName === match.retailerName
                          )?.Retailerlogo
                      }))}
                    />
                  </div>
                </>
              ) : null}
              <InputsRow className="justify-end">
                <Button
                  className="mr-4 mt-4 h-10 px-4 text-red-500 hover:border-red-700 hover:text-red-700"
                  label="Delete page"
                  handler={() => {
                    if (confirm("Are you sure you want to delete this page?")) {
                      deletePage(`/pages/single?key=${oldKey}&id=${page?.id}`, {
                        onSettled: data => {
                          console.log("data", data);
                          // TODO: add a message that page is deleted.
                        }
                      });

                      progressBar(isDpLoading, isDpLoading, isDpSuccess);
                      handleLinkClick(router, "pages");
                    }
                  }}
                />
                <Button
                  className={`mr-4 mt-4 h-10 px-4 ${
                    isSaveActive
                      ? "text-sky-700 hover:border-sky-900 hover:text-sky-900"
                      : "bg-gray-100 text-gray-400"
                  }`}
                  label="Cancel"
                  disabled={!isSaveActive}
                  handler={handleCancelForm}
                />
                <Button
                  className={`mr-4 mt-4 h-10 px-4 ${
                    isSaveActive
                      ? "bg-sky-700 text-white hover:bg-sky-900"
                      : "bg-gray-100 text-gray-400"
                  }`}
                  type="submit"
                  label="Save"
                  disabled={!isSaveActive}
                />
              </InputsRow>
            </form>
            {/* <pre>{JSON.stringify(page, null, 2)}</pre> */}
          </ContentContainer>
        </Container>
      </section>
    </Layout>
  );
};

export default EditPage;
