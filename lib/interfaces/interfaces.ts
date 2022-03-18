export interface Result<T> {
  hasErrors: Boolean;
  errors: Object[];
  info: Object;
  result: T[];
}

export interface User {
  active: boolean;
  key: string;
  issuedFor: string;
  issuer: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

interface history {
  previousValue: string;
  updatedValue: string;
  updatedAt: string;
  updatedBy: string;
}

interface value {
  value: string;
  createdAt: string;
  history: history[];
}

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
  createdAt: string;
  updatedAt: string;
}
