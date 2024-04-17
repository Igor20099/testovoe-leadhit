import axios from "axios";
import { URL, API_KEY } from "../utils/consts";

export const fetchData = async (siteId) => {
  return await axios
    .get(URL, {
      headers: {
        "Api-Key": API_KEY,
        "Leadhit-Site-Id": siteId,
      },
    })
    .catch((err) => console.log(err));
};
