import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import * as Yup from "yup";

import Layout from "../components/Layout/Layout";

import * as urls from "../config";

import fetchData from "../lib/drivers/fetchData";

import useKey from "../lib/hooks/useKey";
import useUser from "../lib/hooks/useUser";
import progressBar from "../lib/helpers/progressBar";
import { logo } from "../lib/misc/logo";
import Meta from "../components/Meta/Meta";

const Login: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { setKey } = useKey();

  const router = useRouter();

  const { mutate, isLoading, isIdle, isSuccess } = useMutation(
    (endpoint: string) => fetchData(endpoint, "GET")
  );

  const formik = useFormik({
    initialValues: {
      key: ""
    },
    validationSchema: Yup.object({
      key: Yup.string()
        .required("Key is required")
        .min(32, "Key should have at least 32 characters")
        .max(32, "Key should not have more than 32 characters")
    }),
    onSubmit: values => {
      setErrorMessage("");
      mutate(`/keys/key-info?key=${values.key}&checkKey=${values.key}`, {
        onSettled: (data, error) => {
          if (data instanceof Error || error)
            return setErrorMessage("Error occurred. Please try again later.");
          if (data.hasErrors) return setErrorMessage("Invalid access key.");
          setKey(values.key);
          return router.push("/home");
        }
      });

      progressBar(isLoading, isLoading, isSuccess);
    }
  });

  // TODO: Dodaj loading screen dok se user provjerava
  // If user is logged in, redirect to Locales
  const user = useUser();
  if (user) router.push("/home");

  return (
    <Layout>
      <div className="mx-auto flex min-h-screen w-96 items-center">
        <Meta
          title="Mordax. Login"
          description="Mordax. Login"
          canonical={urls.front + "/login"}
        />

        <section className="flex-1">
          <Image
            src={logo}
            alt="Mordax Logo"
            title="Mordax."
            width={120}
            height={120}
          />

          <h1 className="mt-24 text-center text-5xl">Mordax.</h1>

          <form
            className="mt-24 flex flex-col"
            onSubmit={formik.handleSubmit}
            onBlur={formik.handleSubmit}
          >
            <input
              className="border-b border-b-black"
              value={formik.values.key}
              onChange={formik.handleChange}
              type="text"
              name="key"
              id="key"
              required
            />

            <span className="relative">
              {!formik.errors.key && !errorMessage ? (
                <span className="absolute text-sm text-black/25">
                  {!isLoading ? "Enter access key" : "Loading..."}
                </span>
              ) : null}

              {formik.errors.key ? (
                <span className="absolute right-0 text-sm text-red-600/50">
                  {formik.errors.key}
                </span>
              ) : null}

              {errorMessage && !formik.errors.key ? (
                <span className="absolute right-0 text-sm text-red-600/50">
                  {errorMessage}
                </span>
              ) : null}
            </span>
          </form>
        </section>
      </div>
    </Layout>
  );
};

export default Login;
