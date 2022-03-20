import { useState } from "react";
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

const NewPage: NextPage = () => {
  const [currentField, setCurrentField] = useState<string>("");
  const [currentFieldValue, setCurrentFieldValue] = useState<string>("");
  const [fields, setFields] = useState<object[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { oldKey } = useKey();

  const router = useRouter();

  const locale = useLocale(router.query.l as string, true);

  const mutation = useMutation((endpoint: string) =>
    fetchData(endpoint, "POST")
  );

  const formik = useFormik({
    initialValues: {
      pageUrl: "",
      type: "",
    },
    validationSchema: Yup.object({
      pageUrl: Yup.string().url().required("Page URL is required."),
      type: Yup.string(),
    }),
    onSubmit: values => {
      setErrorMessage("");
      mutation.mutate(
        `/pages?key=${oldKey}&localeUrl=${locale?.url.value}&pageUrl=${
          values.pageUrl
        }&type=${values.type}&data=${makeDataPayload(fields)}`,
        {
          onSettled: (data: Result<Page>, error) => {
            if (data instanceof Error || error)
              return setErrorMessage(
                "Error occurred while fetching data. Please try again later."
              );
            if (data.hasErrors) return setErrorMessage("Invalid access key.");

            return router.push(
              `/pages/edit?l=${router.query.l}&p=${data.result[0].id}`
            );
          },
        }
      );
    },
  });

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

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="">
        <h2>Details</h2>
        <form className="" onSubmit={formik.handleSubmit}>
          <span>Locale url</span>
          <input
            className=""
            defaultValue={locale?.url.value}
            type="text"
            name="localeUrl"
            id="localeUrl"
            disabled
          />

          <span>URL*</span>
          <input
            className=""
            placeholder="Page URL"
            value={formik.values.pageUrl}
            onChange={formik.handleChange} // TODO: Napravi validaciju da page URL pripada locale url. LocaleURL.test(pageUrl)
            type="url"
            name="pageUrl"
            id="pageUrl"
            required
          />

          <span>Type</span>
          <input
            className=""
            placeholder="product, article, etc."
            value={formik.values.type}
            onChange={formik.handleChange}
            type="text"
            name="type"
            id="type"
          />

          <span>Field</span>
          {locale?.fields.map(field => (
            <div key={field} onClick={() => setCurrentField(field)}>
              {field}
            </div>
          ))}

          <span>Value</span>
          <input
            className=""
            placeholder="Enter value"
            value={currentFieldValue}
            onChange={e => setCurrentFieldValue(e.target.value)}
            type="text"
          />

          <button type="button" onClick={handleAddField}>
            Add
          </button>

          <button>Cancel</button>
          <input type="submit" value="Save" />
        </form>
      </section>
    </Layout>
  );
};

export default NewPage;
