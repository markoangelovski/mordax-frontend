import { useRef, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import * as Yup from "yup";
import NProgress from "nprogress";

import * as urls from "../../config";

import Layout from "../../components/Layout/Layout";

import fetchData from "../../lib/drivers/fetchData";

import useKey from "../../lib/hooks/useKey";
import useUser from "../../lib/hooks/useUser";
import useLocale from "../../lib/hooks/useLocale";
import { Result } from "../../lib/interfaces/interfaces";
import { Page } from "../../lib/interfaces/pages";
import progressBar from "../../lib/helpers/progressBar";
import MicroLinks from "../../components/MicroLinks/MicroLinks";

import CurrentSection from "../../components/CurrentSection/CurrentSection";
import {
  Container,
  ContentContainer
} from "../../components/Containers/Containers";
import { handleLinkClick } from "../../lib/helpers/utils";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const NewPage: NextPage = () => {
  const [current3rdParty, setCurrent3rdParty] = useState<string>("");
  const [thirdParties, setthirdParties] = useState<string[]>([]);
  const [currentField, setCurrentField] = useState<string>("");
  const [fields, setFields] = useState<string[]>([]);

  const templateRef = useRef<HTMLFormElement>(null);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const { oldKey } = useKey();

  const router = useRouter();

  // const locale = useLocale(router.query.l as string, true);

  interface Payload {
    endpoint: string;
    body: BodyInit | undefined;
  }

  const { mutate, isLoading, isIdle, isSuccess } = useMutation(
    ({ endpoint, body }: Payload) => fetchData(endpoint, "POST", body)
  );

  const formik = useFormik({
    initialValues: {
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
      url: Yup.string().url().required("Locale URL is required."),
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
      mutate(
        { endpoint: `/locales?` + queryParams.toString(), body },
        {
          onSettled: (data: Result<Page>, error) => {
            console.log("data", data);
            if (data instanceof Error || error)
              return setErrorMessage(
                "Error occurred while fetching data. Please try again later."
              );
            if (data.hasErrors) return setErrorMessage("Invalid access key.");

            // TODO: refetch locales query

            // return router.push(
            //   `/locales/edit?l=${router.query.l}`
            // );
          }
        }
      );

      progressBar(isLoading, isLoading, isSuccess);
    }
  });

  interface Field {
    fieldName: string;
    name: (fieldName: string) => Field;
    add: () => void;
  }

  const field: Field = {
    fieldName: "",
    name(name) {
      this.fieldName = name;
      return this;
    },
    add() {
      if (!this.fieldName.length) return;

      if (this.fieldName === "thirdParties") {
        if (!current3rdParty) return;
        setthirdParties(parties => [...parties, current3rdParty]);
        setCurrent3rdParty("");
      }

      if (this.fieldName === "fields") {
        if (!currentField) return;
        setFields(fields => [...fields, currentField]);
        setCurrentField("");
      }
    }
  };

  // NProgress.start();

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
                { label: "Add locale" }
              ]}
            />
            <h2>Details</h2>
            <form className="" onSubmit={formik.handleSubmit} ref={templateRef}>
              <span>Brand*</span>
              <input
                className=""
                value={formik.values.brand}
                onChange={formik.handleChange}
                type="text"
                name="brand"
                id="brand"
                required
              />
              <br />

              <span>Locale*</span>
              <input
                className=""
                value={formik.values.locale}
                onChange={formik.handleChange}
                type="text"
                name="locale"
                id="locale"
                required
              />
              <br />

              <span>URL*</span>
              <input
                className=""
                placeholder="Page URL"
                value={formik.values.url}
                onChange={formik.handleChange}
                type="url"
                name="url"
                id="url"
                required
              />
              <br />

              <span>Third parties</span>
              <input
                className=""
                placeholder="Enter 3rd party name"
                value={current3rdParty}
                onChange={e => setCurrent3rdParty(e.target.value)}
                type="text"
                name="type"
                id="type"
              />
              <button
                type="button"
                onClick={() => field.name("thirdParties").add()}
              >
                Add
              </button>
              {thirdParties}
              <br />

              <span>Custom fields</span>
              <input
                className=""
                placeholder="Enter field name"
                value={currentField}
                onChange={e => setCurrentField(e.target.value)}
                type="text"
                name="type"
                id="type"
              />
              <button type="button" onClick={() => field.name("fields").add()}>
                Add
              </button>
              {fields}
              <br />

              <span>Capitol</span>
              <input
                className=""
                placeholder="Washington"
                value={formik.values.capitol}
                onChange={formik.handleChange}
                type="text"
                name="capitol"
                id="capitol"
              />
              <br />

              <span>SmartCommerce button key</span>
              <input
                className=""
                placeholder="2b6fa9fb-a075-4aa3-b5b0-b4d3ae99c0cc"
                value={formik.values.scButtonKey}
                onChange={formik.handleChange}
                type="text"
                name="scButtonKey"
                id="scButtonKey"
              />
              <br />

              <span>SmartCommerce carousel key</span>
              <input
                className=""
                placeholder="c8bacf32-9250-4bcd-8a85-1de98e859a26"
                value={formik.values.scCarouselKey}
                onChange={formik.handleChange}
                type="text"
                name="scCarouselKey"
                id="scCarouselKey"
              />
              <br />

              <span>SmartCommerce EC endpoint key</span>
              <input
                className=""
                placeholder="4c4d8dc0-f852-4362-8131-4b55f6d559df"
                value={formik.values.scEcEndpointKey}
                onChange={formik.handleChange}
                type="text"
                name="scEcEndpointKey"
                id="scEcEndpointKey"
              />
              <br />

              <span>PriceSpider key</span>
              <input
                className=""
                placeholder="1766-123456789012345678901234"
                value={formik.values.psKey}
                onChange={formik.handleChange}
                type="text"
                name="psKey"
                id="psKey"
              />
              <br />

              <span>BIN Lite key</span>
              <input
                className=""
                placeholder="1f374124-0e33-4fa1-b4c5-899b009d4fd1"
                value={formik.values.BINLiteKey}
                onChange={formik.handleChange}
                type="text"
                name="BINLiteKey"
                id="BINLiteKey"
              />
              <br />

              <span>Hreflang</span>
              <input
                className=""
                placeholder="en-ca"
                value={formik.values.hrefLang}
                onChange={formik.handleChange}
                type="text"
                name="hrefLang"
                id="hrefLang"
              />
              <br />

              <p>Select a file containing page details.</p>

              <strong>Requirements:</strong>
              <ul>
                <li>.xlsx format</li>
                <li>5 MB maximum</li>
              </ul>

              <a href={urls.api + `/locales/template?key=${oldKey}`} download>
                Download example file
              </a>

              <input type="file" name="template" id="template" />

              <button>Cancel</button>
              <input type="submit" value="Save" />
            </form>
          </ContentContainer>
        </Container>
      </section>
    </Layout>
  );
};

export default NewPage;
