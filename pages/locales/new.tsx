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
import Details from "../../components/Details/Details";
import { InputsRow } from "../../components/LayoutElements/LayoutElements";
import { Input } from "../../components/Inputs/Inputs";
import Button from "../../components/Button/Button";
import { DeleteEntryIcon } from "../../components/Inputs/Inputs.icons";

const NewPage: NextPage = () => {
  const [current3rdParty, setCurrent3rdParty] = useState<string>("");
  const [thirdParties, setThirdParties] = useState<string[]>([]);
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
    remove: (item: string) => void;
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
        setThirdParties(parties => [...parties, current3rdParty]);
        setCurrent3rdParty("");
      }

      if (this.fieldName === "fields") {
        if (!currentField) return;
        setFields(fields => [...fields, currentField]);
        setCurrentField("");
      }
    },
    remove(item) {
      if (!this.fieldName.length) return;

      if (this.fieldName === "thirdParties")
        setThirdParties(thirdParties.filter(party => party !== item));

      if (this.fieldName === "fields")
        setFields(fields.filter(field => field !== item));
    }
  };

  // NProgress.start();
  console.log("field", field);
  console.log("thirdParties", thirdParties);
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
            <Details />
            <h2>Details</h2>
            <form className="" onSubmit={formik.handleSubmit} ref={templateRef}>
              <InputsRow>
                <Input
                  label="Brand"
                  placeholder="Enter Brand name"
                  value={formik.values.brand}
                  onChange={formik.handleChange}
                  disabled={false}
                  className="w-3/12"
                  id="brand"
                  name="brand"
                  required={true}
                />
                <Input
                  label="Locale* (ex. en-us)"
                  placeholder="Enter locale"
                  value={formik.values.locale}
                  onChange={formik.handleChange}
                  disabled={false}
                  className="w-3/12"
                  id="locale"
                  name="locale"
                  required={true}
                />
                <Input
                  label="URL*"
                  placeholder="https://www.website.com/en-us"
                  value={formik.values.url}
                  onChange={formik.handleChange}
                  disabled={false}
                  className="w-3/12"
                  id="url"
                  name="url"
                  required={true}
                />
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
                  {thirdParties.map((party, i) => (
                    <InputsRow key={i + party} className="pr-4">
                      <Input
                        defaultValue={party}
                        disabled={true}
                        className="w-[90%]"
                      />
                      <DeleteEntryIcon
                        className="mt-1"
                        onClick={() => field.name("thirdParties").remove(party)}
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
                  {fields.map(cfield => (
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
