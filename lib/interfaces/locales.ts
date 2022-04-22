import { value } from "./interfaces";
import { Page } from "./pages";

export interface Stats {
  [pages: string]: number;
  entries: number;
  pagesNotInSitemap: number;
  products: number;
  variants: number;
  entriesWithSellers: number;
  articles: number;
  ALPs: number;
  otherPages: number;
}

export interface Locale {
  brand: value;
  locale: value;
  url: value;
  stats: Stats;
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
    scLocale: value;
    scButtonKey: value;
    scCarouselKey: value;
    scEcEndpointKey: value;
  };
  createdAt: string;
  updatedAt: string;
  pages?: Page[];
}

export interface Metadata {
  metaUrl: string;
  metaTitle: string;
  metaDescription: string;
  metaImage: string;
  favicon: string;
  GTM: object;
  createdAt: string;
  updatedAt: string;
}
