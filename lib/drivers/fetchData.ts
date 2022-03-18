import { Result } from "../interfaces/interfaces";

import * as urls from "../../config";

// import useKey from "./useKey";

const fetchData = async (endpoint: string) =>
  fetch(urls.api + endpoint)
    .then(res => res.json())
    .catch(err => console.warn("Error fetching data: ", err.message));

export default fetchData;
