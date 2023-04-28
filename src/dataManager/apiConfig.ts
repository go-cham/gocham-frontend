import Axios from "axios";
import { getJwt } from "./localStorageManager";

export const HttpMethod = {
  DELETE: "delete",
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
};

type requestType = {
  data?: string;
  query?: { [key: string]: string };
  path?: string;
  method: string;
  url: string;
};

export default class ApiConfig {
  static request({ data, query, path, method, url }: requestType) {
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
      if (query && !isEmpty(query)) {
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
    } catch (error: any) {
      console.log("ApiConfig Error : ", error.message);
    }
  }
}

export function isEmpty(str: any) {
  return str === "" || str === undefined || str == null || str === "null";
}
