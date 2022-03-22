import { NextRouter } from "next/router";

export const handleLinkClick = (router: NextRouter, endpoint: string) =>
  router.push(`/${endpoint}?l=${router.query.l}`, undefined, {
    shallow: true
  });
