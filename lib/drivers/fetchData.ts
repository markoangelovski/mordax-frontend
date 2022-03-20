import { Result } from "../interfaces/interfaces";

import * as urls from "../../config";

// import useKey from "./useKey";

const fetchData = (
  endpoint: string,
  method: string,
  body?: BodyInit | undefined
) =>
  fetch(urls.api + endpoint, { method, body })
    .then(res => res.json())
    .catch(err => err);

export default fetchData;
