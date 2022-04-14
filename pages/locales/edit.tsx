import Head from "next/head";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useMutation } from "react-query";
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
import { Input } from "../../components/Inputs/Inputs";
import { useEffect, useRef, useState } from "react";
import { Result } from "../../lib/interfaces/interfaces";
import { Locale } from "../../lib/interfaces/locales";
import { InputSkeleton } from "../../components/Skeletons/Skeletons";

const EditLocale: NextPage = () => {
  const [trigger, setTrigger] = useState<boolean>(false);

  const [current3rdParty, setCurrent3rdParty] = useState<string>("");
  const [thirdParties, setThirdParties] = useState<string[]>([]);
  const [currentField, setCurrentField] = useState<string>("");
  const [fields, setFields] = useState<string[]>([]);

  const templateRef = useRef<HTMLFormElement>(null);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();

  const locale = useLocale(router.query.l as string);

  const { oldKey } = useKey();

  const {
    mutate: deleteLocale,
    isLoading: isDlLoading,
    isSuccess: isDlSuccess
  } = useMutation((endpoint: string) => fetchData(endpoint, "DELETE"));

  interface Payload {
    endpoint: string;
    body: BodyInit | undefined;
  }

  const {
    mutate: postLocale,
    isLoading: isPlLoading,
    isSuccess: isPlSuccess
  } = useMutation(({ endpoint, body }: Payload) =>
    fetchData(endpoint, "POST", body)
  );

  useEffect(() => {
    console.log("locale", locale);
    locale && setTrigger(true); // TODO: Stavljen ovdje jer se formik nije re-renderao kad se locale fetcha i nije prikazao polja od localea u formi. Kad se dodaju skeletoni možda ovo neće bit potrebno, probaj.
    // Formik will not re-render when the page is fetched, hence these values are set in useEffect hook.
    formik.values.brand = locale?.result[0].brand.value || "";
    formik.values.locale = locale?.result[0].locale.value || "";
    formik.values.url = locale?.result[0].url.value || "";
    formik.values.capitol = locale?.result[0].capitol?.value || "";

    // formik.values.scButtonKey = locale?.result[0].SC.scButtonKey.value || "";
    // formik.values.scCarouselKey =
    //   locale?.result[0].SC.scCarouselKey.value || "";
    // formik.values.scEcEndpointKey =
    //   locale?.result[0].SC.scEcEndpointKey.value || "";
    // formik.values.BINLiteKey = locale?.result[0].BINLite.BINLiteKey.value || "";
    // formik.values.psKey =
    //   locale?.result[0].PS.psAccountId.value +
    //     "-" +
    //     locale?.result[0].PS.psCid.value || "";
  }, [locale]);

  const formik = useFormik({
    initialValues: {
      // Formik will not re-render when the page is fetched, hence these values are set in useEffect hook.
      brand: locale?.result[0].brand.value || "",
      locale: locale?.result[0].locale.value || "",
      url: locale?.result[0].url.value || "",
      capitol: locale?.result[0].capitol?.value || "",
      // brand: "",
      // locale: "",
      // url: "",
      // capitol: "",
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
        thirdParties: thirdParties.join(),
        fields: fields.join()
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

            // handleLinkClick2(
            //   router,
            //   `locales/edit?l=${data.result[0].url.value}`
            // );
            // TODO: refetch locales query
            // queryClient.invalidateQueries('locales')

            // return router.push(
            //   `/locales/edit?l=${router.query.l}`
            // );
          }
        }
      );
    }
  });
  progressBar(isPlLoading, false, isPlSuccess);

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
              <div>Stats skeleton</div>
            )}
            <div>Display locale metadata placeholder</div>
            <form>
              {locale ? (
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
                      disabled={false}
                      id="url"
                      name="url"
                      required={true}
                    />
                    <span className="text-sm text-red-600/50">
                      {formik.errors.url}
                    </span>
                  </div>
                </InputsRow>
              ) : (
                <InputsRow>
                  <InputSkeleton className="w-3/12" />
                  <InputSkeleton className="w-3/12" />
                  <InputSkeleton className="w-3/12" />
                </InputsRow>
              )}
            </form>
            Edit locale
            <br />
            <button
              onClick={() => {
                deleteLocale(
                  `/locales/single?key=${oldKey}&url=${locale?.result[0].url.value}`,
                  {
                    onSettled: data => {
                      console.log("data", data);
                    }
                  }
                );

                // progressBar(isLoading, isLoading, isSuccess);
              }}
            >
              Delete locale
            </button>
            <a
              href={
                urls.api +
                `/locales/single/download?key=${oldKey}&url=${router.query.l}`
              }
              download
            >
              Download locale details
            </a>
            <pre>{JSON.stringify(locale, null, 2)}</pre>
          </ContentContainer>
        </Container>
      </section>
    </Layout>
  );
};

export default EditLocale;
