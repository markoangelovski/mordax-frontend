import { ChangeEvent, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import * as Yup from "yup";

import Layout from "../../components/Layout/Layout";

import fetchData from "../../lib/drivers/fetchData";

import useKey from "../../lib/hooks/useKey";
import useUser from "../../lib/hooks/useUser";
import useLocale from "../../lib/hooks/useLocale";
import { Result } from "../../lib/interfaces/interfaces";
import { Page } from "../../lib/interfaces/pages";
import Modal from "../../components/Modal/Modal";
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
import Button from "../../components/Button/Button";

const NewPage: NextPage = () => {
  const [currentField, setCurrentField] = useState<string>("");
  const [currentFieldValue, setCurrentFieldValue] = useState<string>("");
  const [fields, setFields] = useState<object[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [response, setResponse] = useState<Result<Page>>();

  const { oldKey } = useKey();

  const router = useRouter();

  const locale = useLocale(router.query.l as string, true);

  const { mutate, isLoading, isIdle, isSuccess } = useMutation(
    (endpoint: string) => fetchData(endpoint, "POST")
  );
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      pageUrl: "",
      type: ""
    },
    validationSchema: Yup.object({
      pageUrl: Yup.string().url().required("Page URL is required."),
      type: Yup.string()
    }),
    onSubmit: values => {
      setErrorMessage("");
      mutate(
        `/pages?key=${oldKey}&localeUrl=${
          locale?.result[0]?.url.value
        }&pageUrl=${values.pageUrl}&type=${values.type}&data=${makeDataPayload(
          fields
        )}`,
        {
          onSettled: (data: Result<Page>, error) => {
            if (data instanceof Error || error)
              return setErrorMessage("Error occurred. Please try again later.");
            if (data.hasErrors) return setErrorMessage("Invalid access key.");

            // TODO: Prikaži rezultat responsea u Modal
            setResponse(data);

            return router.push(
              `/pages/edit?l=${router.query.l}&p=${data.result[0].id}`
            );
          }
        }
      );

      progressBar(isLoading, isLoading, isSuccess);
    }
  });

  const isSaveActive = !!formik.values.pageUrl;

  const makeDataPayload = (data: object[]) =>
    data.reduce(
      (acc, curr) => acc + `${Object.keys(curr)[0]}:${Object.values(curr)[0]};`,
      ""
    );

  const handleAddField = () => {
    if (!currentField || !currentFieldValue) return;
    setFields(fields => [...fields, { [currentField]: currentFieldValue }]);
    setCurrentField("");
    setCurrentFieldValue("");
  };

  const handleCancelForm = () => {
    formik.values.type = "";
    formik.values.pageUrl = "";
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
                { label: "Add page" }
              ]}
            />
            <Details />
            <form className="" onSubmit={formik.handleSubmit}>
              <InputsRow>
                <Input
                  label="Locale url"
                  defaultValue={router.query.l as string}
                  disabled={true}
                  className="w-3/12"
                />
                <Input
                  label="URL*"
                  placeholder="Page URL"
                  value={formik.values.pageUrl}
                  onChange={formik.handleChange}
                  disabled={false}
                  className="w-3/12"
                  id="pageUrl"
                  name="pageUrl"
                  required={true}
                />
                <Input
                  label="Type"
                  placeholder="product, article, etc."
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  disabled={false}
                  className="w-3/12"
                  id="type"
                  name="type"
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

              <InputsRow className="mr-64 justify-end pr-5">
                <Button
                  className="text-sky-700 hover:border-sky-900 hover:text-sky-900"
                  label="Add"
                  handler={handleAddField}
                />
              </InputsRow>
              <InputsRow className="mr-64 justify-end pr-5">
                <Button
                  className="mr-2 text-sky-700 hover:border-sky-900 hover:text-sky-900"
                  label="Cancel"
                  handler={handleCancelForm}
                />
                <Button
                  className={`text-white ${
                    isSaveActive ? "bg-sky-700 hover:bg-sky-900" : "bg-gray-500"
                  }`}
                  label="Save"
                  type="submit"
                  disabled={!isSaveActive}
                />
              </InputsRow>
            </form>
            {response ? <Modal /> : null}
          </ContentContainer>
        </Container>
      </section>
    </Layout>
  );
};

export default NewPage;
