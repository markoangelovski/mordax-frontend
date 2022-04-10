import { NextRouter } from "next/router";

export const handleLinkClick = (router: NextRouter, endpoint: string) =>
  router.push(`/${endpoint}?l=${router.query.l}`, undefined, {
    shallow: true
  });

export const handleLinkClick2 = (router: NextRouter, endpoint: string) =>
  router.push(`/${endpoint}`, undefined, {
    shallow: true
  });

// Creates data payload for new and edit page.
export const makeDataPayload = (data: object[]) =>
  data.reduce(
    (acc, curr) => acc + `${Object.keys(curr)[0]}:${Object.values(curr)[0]};`,
    ""
  );
