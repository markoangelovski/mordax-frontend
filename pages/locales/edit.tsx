import Head from "next/head";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";

import type { NextPage } from "next";

import * as urls from "../../config";

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
import LocaleStats from "../../components/LocaleStats/LocaleStats";
import { InputsRow } from "../../components/LayoutElements/LayoutElements";
import { Input, SelectInput } from "../../components/Inputs/Inputs";
import { useEffect, useRef, useState } from "react";
import { Result } from "../../lib/interfaces/interfaces";
import { Locale } from "../../lib/interfaces/locales";
import {
  InputSkeleton,
  LocaleStatsSkeleton
} from "../../components/Skeletons/Skeletons";
import { DeleteEntryIcon } from "../../components/Inputs/Inputs.icons";
import Button from "../../components/Button/Button";
import FileUpload from "../../components/FileUpload/FileUpload";
import LocaleMetadata from "../../components/LocaleMetadata/LocaleMetadata";
import RefreshSellerMatches from "../../components/RefreshSellerMatches/RefreshSellerMatches";

const EditLocale: NextPage = () => {
  const [reRender, setReRender] = useState<boolean>(false);

  const [current3rdParty, setCurrent3rdParty] = useState<string>("");
  const [thirdParties, setThirdParties] = useState<Set<string>>(new Set());
  const [currentField, setCurrentField] = useState<string>("");
  const [fields, setFields] = useState<Set<string>>(new Set());

  const [thirdPartiesToDelete, setThirdPartiesToDelete] = useState<Set<string>>(
    new Set()
  );
  const [fieldsToDelete, setFieldsToDelete] = useState<Set<string>>(new Set());

  const [currentSellerSkuField, setCurrentSellerSkuField] =
    useState<string>("");

  const [currentPsCountry, setCurrentPsCountry] = useState<string>("");
  const [currentPsInstance, setCurrentPsInstance] = useState<string>("");

  const [refreshSellersMsg, setRefreshSellersMsg] = useState<string>("");

  const templateRef = useRef<HTMLFormElement>(null);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();

  const locale = useLocale(router.query.l as string);

  const { oldKey } = useKey();

  // Delete locale hook
  const {
    mutate: deleteLocale,
    isLoading: isDlLoading,
    isSuccess: isDlSuccess
  } = useMutation((endpoint: string) => fetchData(endpoint, "DELETE"));

  interface Payload {
    endpoint: string;
    body: BodyInit | undefined;
  }

  // Create locale hook
  const {
    mutate: postLocale,
    isLoading: isPlLoading,
    isSuccess: isPlSuccess
  } = useMutation(({ endpoint, body }: Payload) =>
    fetchData(endpoint, "POST", body)
  );

  // Rerfresh sellers hook
  const {
    mutate: refreshSellers,
    isLoading: isRsLoading,
    isSuccess: isRsSuccess
  } = useMutation((endpoint: string) => fetchData(endpoint, "POST"));

  const queryClient = useQueryClient();

  useEffect(() => {
    locale && setReRender(!reRender); // TODO: Stavljen ovdje jer se formik nije re-renderao kad se locale fetcha i nije prikazao polja od localea u formi. Kad se dodaju skeletoni možda ovo neće bit potrebno, probaj.
    // Formik will not re-render when the page is fetched, hence these values are set in useEffect hook.
    formik.values.brand = locale?.result[0].brand.value || "";
    formik.values.locale = locale?.result[0].locale.value || "";
    formik.values.url = locale?.result[0].url.value || "";
    formik.values.capitol = locale?.result[0].capitol?.value || "";

    formik.values.scButtonKey = locale?.result[0].SC?.scButtonKey.value || "";
    formik.values.scCarouselKey =
      locale?.result[0].SC?.scCarouselKey.value || "";
    formik.values.scEcEndpointKey =
      locale?.result[0].SC?.scEcEndpointKey.value || "";
    formik.values.BINLiteKey =
      locale?.result[0].BINLite?.BINLiteKey.value || "";
    formik.values.psKey = locale?.result[0].PS
      ? `${locale.result[0].PS.psAccountId.value}-${locale.result[0].PS.psCid.value}`
      : "";

    // Clear all state when switching between locales in the /locales/edit page
    return handleCancelForm;
  }, [locale]);

  const formik = useFormik({
    initialValues: {
      // Formik will not re-render when the page is fetched, hence these values are set in useEffect hook.
      brand: "",
      locale: "",
      hrefLang: "",
      url: "",
      newUrl: "",
      capitol: "",
      scButtonKey: "",
      scCarouselKey: "",
      scEcEndpointKey: "",
      BINLiteKey: "",
      psKey: ""
    },
    validationSchema: Yup.object({
      brand: Yup.string()
        .required("Brand name is required.")
        .max(256, "Maximum 256 characters!"),
      locale: Yup.string()
        .required("Locale is required.")
        .max(256, "Maximum 256 characters!"),
      url: Yup.string()
        .url("URL needs to be in proper format.")
        .required("Locale URL is required."),
      newUrl: Yup.string().url(),
      capitol: Yup.string().max(256, "Maximum 256 characters!"),
      scButtonKey: Yup.string().max(256, "Maximum 256 characters!"),
      scCarouselKey: Yup.string().max(256, "Maximum 256 characters!"),
      scEcEndpointKey: Yup.string().max(256, "Maximum 256 characters!"),
      BINLiteKey: Yup.string().max(256, "Maximum 256 characters!"),
      psKey: Yup.string().max(256, "Maximum 256 characters!"),
      hrefLang: Yup.string().max(256, "Maximum 256 characters!")
    }),
    onSubmit: values => {
      const queryParams = new URLSearchParams({
        key: oldKey as string,
        ...values,
        thirdParties: [
          ...Array.from(thirdParties.values()),
          ...Array.from(thirdPartiesToDelete.values())
        ].join(),
        fields: [
          ...Array.from(fields.values()),
          ,
          ...Array.from(fieldsToDelete.values())
        ].join()
      });

      let body;
      if (templateRef.current) {
        body = new FormData(templateRef.current);
      }

      setErrorMessage("");
      postLocale(
        { endpoint: `/locales?` + queryParams.toString(), body },
        {
          onSettled: (data: Result<Locale>, error) => {
            console.log("data", data);
            if (data instanceof Error || error)
              return setErrorMessage(
                "Error occurred while fetching data. Please try again later."
              );
            if (data.hasErrors) return setErrorMessage("Invalid access key.");
            // Kad šalješ edit locale, provjeri ako je novi url isti kao i stari. Ako je onda pošalji pod url: url, ako nije pošalji pod newUrl: url

            queryClient.setQueryData(["locale", router.query.l], data);
            handleCancelForm(); // Display updated values in the form
          }
        }
      );
    }
  });
  progressBar(isPlLoading, false, isPlSuccess);

  interface Field {
    fieldName: string;
    name: (fieldName: string) => Field;
    add: () => void;
    remove: (item: string) => void;
  }

  const field: Field = {
    fieldName: "",
    name(name) {
      this.fieldName = name;
      return this;
    },
    add() {
      if (this.fieldName === "thirdParties") {
        if (!current3rdParty) return;
        setThirdParties(parties => parties.add(current3rdParty));
        setCurrent3rdParty("");
      }

      if (this.fieldName === "fields") {
        if (!currentField) return;
        setFields(fields => fields.add(currentField));
        setCurrentField("");
      }
    },
    remove(item) {
      if (this.fieldName === "thirdParties") thirdParties.delete(item);

      if (this.fieldName === "fields") fields.delete(item);

      if (this.fieldName === "existingThirdParties") {
        setThirdPartiesToDelete(parties => parties.add(`-${item}`));
        locale?.result[0].thirdParties.splice(
          locale?.result[0].thirdParties.indexOf(item),
          1
        );
        setReRender(!reRender);
      }

      if (this.fieldName === "existingFields") {
        setFieldsToDelete(fields => fields.add(`-${item}`));
        locale?.result[0].fields.splice(
          locale?.result[0].fields.indexOf(item),
          1
        );
        setReRender(!reRender);
      }
    }
  };

  const isSaveActive =
    !!formik.values.brand && !!formik.values.locale && !!formik.values.url;

  const handleCancelForm = () => {
    formik.values.brand = locale?.result[0].brand.value || "";
    formik.values.locale = locale?.result[0].locale.value || "";
    formik.values.hrefLang = "";
    formik.values.url = locale?.result[0].url.value || "";
    formik.values.newUrl = "";
    formik.values.capitol = locale?.result[0].capitol?.value || "";
    formik.values.scButtonKey = locale?.result[0].SC?.scButtonKey.value || "";
    formik.values.scCarouselKey =
      locale?.result[0].SC?.scCarouselKey.value || "";
    formik.values.scEcEndpointKey =
      locale?.result[0].SC?.scEcEndpointKey.value || "";
    formik.values.BINLiteKey =
      locale?.result[0].BINLite?.BINLiteKey.value || "";
    formik.values.psKey = locale?.result[0].PS
      ? `${locale.result[0].PS.psAccountId.value}-${locale.result[0].PS.psCid.value}`
      : "";
    setThirdParties(new Set());
    setFields(new Set());
    setCurrentField("");
    setCurrent3rdParty("");
    setCurrentSellerSkuField("");
    setCurrentPsCountry("");
    setCurrentPsInstance("");
    setRefreshSellersMsg("");
    setThirdPartiesToDelete(new Set());
    setFieldsToDelete(new Set());
  };

  // Gets the active status for Refresh seller matches button
  const getIsActive = () => {
    if (locale?.result[0].PS)
      return currentSellerSkuField.length &&
        currentPsCountry.length &&
        currentPsInstance.length
        ? true
        : false;

    if (locale?.result[0].BINLite || locale?.result[0].SC)
      return currentSellerSkuField.length ? true : false;

    return false;
  };

  // Gets the endpoint for Refresh seller matches button
  const getEndpoint = () => {
    if (locale?.result[0].PS)
      return `/ps/product-data?key=${oldKey}&url=${router.query.l}&psSkuFieldName=${currentSellerSkuField}&countryCode=${currentPsCountry}&psInstance=${currentPsInstance}`;

    if (locale?.result[0].BINLite)
      return `/binlite/product-data?key=${oldKey}&url=${router.query.l}&binliteIdFieldName=${currentSellerSkuField}`;

    if (locale?.result[0].SC)
      return `/sc/product-data?key=${oldKey}&url=${router.query.l}&mpIdFieldName=${currentSellerSkuField}`;

    return "";
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
            {locale?.result[0].stats ? (
              <LocaleStats stats={locale?.result[0].stats} />
            ) : (
              <LocaleStatsSkeleton />
            )}
            <LocaleMetadata />
            <form className="" onSubmit={formik.handleSubmit} ref={templateRef}>
              {locale ? (
                <>
                  <InputsRow>
                    <div className="w-3/12">
                      <Input
                        label="Brand"
                        placeholder="Enter Brand name"
                        value={formik.values.brand}
                        onChange={formik.handleChange}
                        disabled={false}
                        id="brand"
                        name="brand"
                        required={true}
                      />
                      <span className="text-sm text-red-600/50">
                        {formik.errors.brand}
                      </span>
                    </div>
                    <div className="w-3/12">
                      <Input
                        label="Locale* (ex. en-us)"
                        placeholder="Enter locale"
                        value={formik.values.locale}
                        onChange={formik.handleChange}
                        disabled={false}
                        id="locale"
                        name="locale"
                        required={true}
                      />
                      <span className="text-sm text-red-600/50">
                        {formik.errors.locale}
                      </span>
                    </div>
                    <div className="w-3/12">
                      <Input
                        label="URL*"
                        placeholder="https://www.website.com/en-us"
                        value={formik.values.url}
                        onChange={formik.handleChange}
                        disabled={true}
                        id="url"
                        name="url"
                        required={true}
                      />
                      <span className="text-sm text-red-600/50">
                        {formik.errors.url}
                      </span>
                    </div>
                    <div className="w-3/12">
                      <Input
                        label="New URL"
                        placeholder="Enter new URL..."
                        value={formik.values.newUrl}
                        onChange={formik.handleChange}
                        disabled={false}
                        id="newUrl"
                        name="newUrl"
                        required={false}
                      />
                      <span className="text-sm text-red-600/50">
                        {formik.errors.newUrl}
                      </span>
                    </div>
                  </InputsRow>
                  <InputsRow>
                    <div className="w-3/12">
                      <Input
                        label="Third parties"
                        placeholder="Bazaarvoice, PriceSpider, etc."
                        value={current3rdParty}
                        onChange={e => setCurrent3rdParty(e.target.value)}
                        disabled={false}
                        required={false}
                        // Iz nekog razloga makne zadnje dodani thirdParty u thirdParties array
                        // onKeyDown={e =>
                        //   e.key === "Enter" && field.name("thirdParties").add()
                        // }
                      />
                      {Array.from(thirdParties.values()).map((party, i) => (
                        <InputsRow key={i + party} className="pr-4">
                          <Input
                            defaultValue={party}
                            disabled={true}
                            className="w-[90%]"
                          />
                          <DeleteEntryIcon
                            className="mt-1"
                            onClick={() =>
                              field.name("thirdParties").remove(party)
                            }
                          />
                        </InputsRow>
                      ))}
                      {locale.result[0].thirdParties.map((party, i) => (
                        <InputsRow key={i + party} className="pr-4">
                          <Input
                            defaultValue={party}
                            disabled={true}
                            className="w-[90%]"
                          />
                          <DeleteEntryIcon
                            className="mt-1"
                            onClick={() =>
                              field.name("existingThirdParties").remove(party)
                            }
                          />
                        </InputsRow>
                      ))}
                    </div>
                    <div className="w-3/12">
                      <Input
                        label="Custom fields"
                        placeholder="Enter field name"
                        value={currentField}
                        onChange={e => setCurrentField(e.target.value)}
                        disabled={false}
                        required={false}
                        // Iz nekog razloga makne zadnje dodani field u fields array
                        // onKeyDown={e =>
                        //   e.key === "Enter" && field.name("fields").add()
                        // }
                      />
                      {Array.from(fields.values()).map(cfield => (
                        <InputsRow key={cfield} className="pr-4">
                          <Input
                            defaultValue={cfield}
                            disabled={true}
                            className="w-[90%]"
                          />
                          <DeleteEntryIcon
                            className="mt-1"
                            onClick={() => field.name("fields").remove(cfield)}
                          />
                        </InputsRow>
                      ))}
                      {locale.result[0].fields.map(cfield => (
                        <InputsRow key={cfield} className="pr-4">
                          <Input
                            defaultValue={cfield}
                            disabled={true}
                            className="w-[90%]"
                          />
                          <DeleteEntryIcon
                            className="mt-1"
                            onClick={() =>
                              field.name("existingFields").remove(cfield)
                            }
                          />
                        </InputsRow>
                      ))}
                    </div>
                    <Input
                      label="Capitol"
                      placeholder="Washington"
                      value={formik.values.capitol}
                      onChange={formik.handleChange}
                      disabled={false}
                      className="w-3/12"
                      id="capitol"
                      name="capitol"
                      required={false}
                    />
                    <Input
                      label="HrefLang"
                      placeholder="en-ca"
                      value={formik.values.hrefLang}
                      onChange={formik.handleChange}
                      disabled={false}
                      className="w-3/12"
                      id="hrefLang"
                      name="hrefLang"
                      required={false}
                    />
                  </InputsRow>
                  <InputsRow className="">
                    <div className="flex w-3/12 justify-end">
                      <Button
                        className={`mt-1 mr-4 h-10 px-4 ${
                          current3rdParty.length
                            ? "text-sky-700 hover:border-sky-900 hover:text-sky-900"
                            : "bg-gray-100 text-gray-400"
                        }`}
                        label="Add"
                        handler={() => field.name("thirdParties").add()}
                        disabled={current3rdParty.length ? false : true}
                      />
                    </div>
                    <div className="flex w-3/12 justify-end">
                      <Button
                        className={`mt-1 mr-4 h-10 px-4 ${
                          currentField.length
                            ? "text-sky-700 hover:border-sky-900 hover:text-sky-900"
                            : "bg-gray-100 text-gray-400"
                        }`}
                        label="Add"
                        handler={() => field.name("fields").add()}
                        disabled={currentField.length ? false : true}
                      />
                    </div>
                  </InputsRow>
                  <InputsRow>
                    <Input
                      label="SmartCommerce button key"
                      placeholder="2b6fa9fb-a075-4aa3-b5b0-b4d3ae99c0cc"
                      value={formik.values.scButtonKey}
                      onChange={formik.handleChange}
                      disabled={false}
                      className="w-3/12"
                      id="scButtonKey"
                      name="scButtonKey"
                      required={false}
                    />
                    <Input
                      label="SmartCommerce carousel key"
                      placeholder="c8bacf32-9250-4bcd-8a85-1de98e859a26"
                      value={formik.values.scCarouselKey}
                      onChange={formik.handleChange}
                      disabled={false}
                      className="w-3/12"
                      id="scCarouselKey"
                      name="scCarouselKey"
                      required={false}
                    />
                    <Input
                      label="SmartCommerce EC endpoint key"
                      placeholder="4c4d8dc0-f852-4362-8131-4b55f6d559df"
                      value={formik.values.scEcEndpointKey}
                      onChange={formik.handleChange}
                      disabled={false}
                      className="w-3/12"
                      id="scEcEndpointKey"
                      name="scEcEndpointKey"
                      required={false}
                    />
                    <Input
                      label="BIN Lite key"
                      placeholder="1f374124-0e33-4fa1-b4c5-899b009d4fd1"
                      value={formik.values.BINLiteKey}
                      onChange={formik.handleChange}
                      disabled={false}
                      className="w-3/12"
                      id="BINLiteKey"
                      name="BINLiteKey"
                      required={false}
                    />
                  </InputsRow>
                  <InputsRow>
                    <Input
                      label="PriceSpider key"
                      placeholder="1766-123456789012345678901234"
                      value={formik.values.psKey}
                      onChange={formik.handleChange}
                      disabled={false}
                      className="w-3/12"
                      id="psKey"
                      name="psKey"
                      required={false}
                    />
                    <SelectInput
                      currentField={currentPsCountry}
                      setCurrentField={setCurrentPsCountry}
                      label="PriceSpider Country"
                      placeholder="PS country..."
                      className="w-2/12"
                      data={locale?.result[0].PS?.psCountries || []}
                      disabled={!locale.result[0].PS}
                    />
                    <SelectInput
                      currentField={currentPsInstance}
                      setCurrentField={setCurrentPsInstance}
                      label="PriceSpider Instance"
                      placeholder="PS instance..."
                      className="w-2/12"
                      data={locale?.result[0].PS?.psInstances || []}
                      disabled={!locale.result[0].PS}
                    />
                    <SelectInput
                      currentField={currentSellerSkuField}
                      setCurrentField={setCurrentSellerSkuField}
                      label="Seller SKU Field"
                      placeholder="Seller SKU Field..."
                      className="w-2/12"
                      data={locale?.result[0].fields || []}
                    />
                    <RefreshSellerMatches
                      className="flex w-3/12 flex-col"
                      active={getIsActive()}
                      refreshSellersMsg={refreshSellersMsg}
                      isRsLoading={isRsLoading}
                      handler={() => {
                        refreshSellers(getEndpoint(), {
                          onSettled: (data, error) => {
                            if (
                              data instanceof Error ||
                              error ||
                              data.hasErrors
                            )
                              return setRefreshSellersMsg("false");

                            setRefreshSellersMsg("true");
                          }
                        });
                      }}
                    />
                  </InputsRow>
                  <a
                    className="mt-4 block text-sky-700 hover:text-sky-900"
                    href={
                      urls.api +
                      `/locales/single/download?key=${oldKey}&url=${router.query.l}`
                    }
                    download
                  >
                    Download locale details
                  </a>
                  <FileUpload />
                  <InputsRow className="justify-end">
                    <Button
                      className="mr-4 mt-4 h-10 px-4 text-red-500 hover:border-red-700 hover:text-red-700"
                      label="Delete locale"
                      handler={() => {
                        if (
                          confirm(
                            `Are you sure you want to delete locale ${locale.result[0].brand.value}-${locale.result[0].locale.value}?`
                          )
                        ) {
                          deleteLocale(
                            `/locales/single?key=${oldKey}&url=${locale?.result[0].url.value}`,
                            {
                              onSettled: data => {
                                console.log("data", data);
                                // TODO: add a message that locale is deleted.
                              }
                            }
                          );
                          progressBar(isDlLoading, isDlLoading, isDlSuccess);
                          handleLinkClick(router, "locales");
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
                </>
              ) : (
                <>
                  <InputsRow>
                    <InputSkeleton className="w-3/12" />
                    <InputSkeleton className="w-3/12" />
                    <InputSkeleton className="w-3/12" />
                    <InputSkeleton className="w-3/12" />
                  </InputsRow>
                  <InputsRow>
                    <InputSkeleton className="w-3/12" />
                    <InputSkeleton className="w-3/12" />
                    <InputSkeleton className="w-3/12" />
                    <InputSkeleton className="w-3/12" />
                  </InputsRow>
                  <InputsRow>
                    <InputSkeleton className="w-3/12" />
                    <InputSkeleton className="w-3/12" />
                    <InputSkeleton className="w-3/12" />
                    <InputSkeleton className="w-3/12" />
                  </InputsRow>
                  <InputsRow>
                    <InputSkeleton className="w-3/12" />
                    <InputSkeleton className="w-3/12" />
                    <InputSkeleton className="w-3/12" />
                    <InputSkeleton className="w-3/12" />
                  </InputsRow>
                </>
              )}
            </form>
          </ContentContainer>
        </Container>
      </section>
    </Layout>
  );
};

export default EditLocale;
