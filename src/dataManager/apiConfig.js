import Axios from "axios";
import { isEmpty } from "../utils/common/commonFunction";
import { getJwt } from "./localStorageManager";

export const HttpMethod = {
  DELETE: "delete",
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
};

export default class ApiConfig {
  static request({ data, query, path, method, url }) {
    try {
      if (isEmpty(method) || isEmpty(url)) {
        alert("HTTP Method 와 URL 을 확인해주세요.");
        return;
      }

      if (path) {
        for (const [key, value] of Object.entries(path)) {
          url = url.replace(`:${key}`, value);
        }
      }
      if (!isEmpty(query)) {
        url +=
          "?" +
          Object.keys(query)
            .map((key) => key + "=" + query[key])
            .join("&");
      }

      const headers = {
        accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": getJwt(),
      };

      switch (method) {
        case HttpMethod.GET:
          return Axios.get(url, { headers: headers });
        case HttpMethod.POST:
          return Axios.post(url, data, { headers: headers });
        case HttpMethod.PATCH:
          return Axios.patch(url, data, { headers: headers });
        case HttpMethod.PUT:
          return Axios.put(url, data, { headers: headers });
        // case HttpMethod.DELETE:
        //   return Axios.delete(url, data, {headers: headers})
        default:
          break;
      }
    } catch (error) {
      console.log("ApiConfig Error : ", error.message);
    }
  }
}
