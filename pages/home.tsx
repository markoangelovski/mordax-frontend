import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import Layout from "../components/Layout/Layout";

import * as urls from "../config";

import {
  Container,
  ContentContainer
} from "../components/Containers/Containers";
import useUser from "../lib/hooks/useUser";
import Meta from "../components/Meta/Meta";

const Home: NextPage = () => {
  const router = useRouter();

  const user = useUser();
  if (!user) return null;

  return (
    <Layout>
      <Meta
        title="Mordax."
        description="Welcome to Mordax! Keep all your websites, pages and E-Commerce tools in one place."
        canonical={urls.front + "/home"}
      />

      <section className="">
        <Container className="border-t border-slate-200">
          <ContentContainer>
            <div className="max-w-4xl">
              <div className="my-8">
                <div className="mb-3 inline-block max-w-xl pr-16 align-top">
                  <span className="text-xl font-light leading-8">
                    Welcome to <strong>Mordax!</strong> <br /> Keep all your
                    websites, pages and E-Commerce tools in one place.
                  </span>
                </div>
                <div className="inline-block w-64 align-top text-base font-normal leading-6">
                  <div className="mb-2 text-lg font-bold">
                    <svg
                      className="-mt-0.5 mr-2 box-content inline-block h-6 w-6 py-0.5 px-1 align-middle text-sky-700"
                      fill="currentColor"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 40 40"
                    >
                      <g>
                        <path d="m25.9 30.7v-3.6q0-0.3-0.2-0.5t-0.6-0.2h-2.1v-11.4q0-0.3-0.2-0.5t-0.5-0.2h-7.2q-0.3 0-0.5 0.2t-0.2 0.5v3.6q0 0.3 0.2 0.5t0.5 0.2h2.2v7.1h-2.2q-0.3 0-0.5 0.2t-0.2 0.5v3.6q0 0.3 0.2 0.5t0.5 0.2h10q0.4 0 0.6-0.2t0.2-0.5z m-2.9-20v-3.6q0-0.3-0.2-0.5t-0.5-0.2h-4.3q-0.3 0-0.5 0.2t-0.2 0.5v3.6q0 0.3 0.2 0.5t0.5 0.2h4.3q0.3 0 0.5-0.2t0.2-0.5z m14.3 9.3q0 4.7-2.3 8.6t-6.3 6.2-8.6 2.3-8.6-2.3-6.2-6.2-2.3-8.6 2.3-8.6 6.2-6.2 8.6-2.3 8.6 2.3 6.3 6.2 2.3 8.6z"></path>
                      </g>
                    </svg>
                    <span>Quick Links</span>
                  </div>
                  <div className="mb-1">
                    The features you depend on are always available from the
                    <strong> MENU</strong>, but can also be accessed here.
                  </div>
                  <div>
                    <button
                      className="mb-1 text-base font-semibold text-sky-700"
                      onClick={() =>
                        router.push("/locales", undefined, {
                          shallow: true
                        })
                      }
                    >
                      <span>Locales</span>
                      <span>&nbsp;▸</span>
                    </button>
                  </div>
                  <div>
                    <button
                      className="mb-1 text-base font-semibold text-sky-700"
                      onClick={() =>
                        router.push("/pages", undefined, {
                          shallow: true
                        })
                      }
                    >
                      <span>Pages</span>
                      <span>&nbsp;▸</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ContentContainer>
        </Container>
      </section>
    </Layout>
  );
};

export default Home;
