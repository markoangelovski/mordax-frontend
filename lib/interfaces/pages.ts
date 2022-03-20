export interface Page {
  id: string;
  url: string;
  localeUrl: string;
  source?: string;
  type?: string;
  inXmlSitemap?: boolean;
  active?: boolean;
  data: object;
}
