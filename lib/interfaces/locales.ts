import { value } from "./interfaces";
import { Page } from "./pages";

export interface Locale {
  brand: value;
  locale: value;
  url: value;
  stats: {
    pages: number;
    entries: number;
    pagesNotInSitemap: number;
    products: number;
    variants: number;
    entriesWithSellers: number;
    articles: number;
    ALPs: number;
    otherPages: number;
  };
  fields: string[];
  thirdParties: string[];
  xmlSitemap: string;
  capitol: value;
  PS: {
    psAccountId: value;
    psCid: value;
    psInstances: string[];
    psCountries: string[];
    psLanguages: string[];
  };
  BINLite: {
    BINLiteKey: value;
  };
  SC: {
    scButtonKey: value;
    scCarouselKey: value;
    scEcEndpointKey: value;
  };
  createdAt: string;
  updatedAt: string;
  pages?: Page[];
}
