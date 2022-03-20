import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";
import NProgress from "nprogress";

import "../styles/globals.css";

import "nprogress/nprogress.css";

const queryClient = new QueryClient();

NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
