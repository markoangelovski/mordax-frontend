import { useRouter } from "next/router";
import { useEffect } from "react";

import type { NextPage } from "next";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  }, []);

  return <div>Redirecting...</div>;
};

export default Home;
