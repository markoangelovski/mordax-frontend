// {
//   "id": string,
//   "url": string,
//   "localeUrl": string,
//   "source": string,
//   "type": string,
//   "SKU": string,
//   "inXmlSitemap": boolean,
//   "active": boolean,
//   "data": {
//       [key: string]: {
//           "value": string,
//           "createdAt": string,
//           "history": []
//       }
//   },
//   "PS": {
//       "ok": boolean,
//       "lastScan": string,
//       "matches": [
//           {
//               "pmid": string,
//               "sid": string,
//               "retailerName": string,
//               "price": string
//           }
//       ],
//       "offlineMatches": []
//   },
//   "BINLite": {
//     "ok": boolean,
//     "lastScan": string,
//     "matches": [
//         {
//             "retailerName": string
//             "buyNowUrl": string,
//         }
//     ]
//   },
//   "SC": {
//     "ok": boolean,
//     "lastScan": string,
//     "matches": [
//          {
//              "productName": string,
//              "retailerName": string,
//              "url": string,
//              "price": string,
//              "logo": string,
//              "miniLogo": string
//          }
//      ]
//    }
//  },
// }

type PsMatch = {
  pmid: string;
  sid: string;
  retailerName: string;
  price: string;
  sellerLink: string;
};

type BinLiteMatch = {
  retailerName: string;
  buyNowUrl: string;
};

type ScMatch = {
  productName: string;
  retailerName: string;
  url: string;
  price: string;
  logo: string;
  miniLogo: string;
};

export interface Page {
  id: string;
  url: string;
  localeUrl: string;
  source?: string;
  type?: string;
  SKU?: string;
  inXmlSitemap?: boolean;
  active?: boolean;
  data: { [key: string]: { value: string; createdAt: string } };
  PS: {
    ok: boolean;
    lastScan: string;
    matches: PsMatch[];
    offlineMatches: [];
  };
  BINLite: {
    ok: boolean;
    lastScan: string;
    matches: BinLiteMatch[];
  };
  SC: {
    ok: boolean;
    lastScan: string;
    matches: ScMatch[];
  };
  createdAt: string;
  updatedAt: string;
}
