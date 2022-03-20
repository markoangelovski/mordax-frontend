import NProgress from "nprogress";

const progressBar = (
  isLoading: boolean,
  isFetching: boolean,
  isFetched: boolean
) => {
  if (typeof document !== "undefined") {
    isLoading && NProgress.start();
    isFetching && NProgress.inc();
    isFetched && NProgress.done();
  }
};

export default progressBar;
