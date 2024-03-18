import { ChzzkConnectorOptions } from "../interfaces/chzzk-connector-options.interface";
import { HttpMethod } from "../types/api.types";

export const getContents = (
  url: string,
  method: HttpMethod,
  options: ChzzkConnectorOptions
): Promise<Response> => {
  let headers = {};
  const { nidAuth, nidSession } = options;

  if (nidAuth && nidSession) {
    headers[
      "Cookie"
    ] = `NID_AUT=${options.nidAuth};NID_SES=${options.nidSession}`;
  }

  headers["User-Agent"] = "";

  return fetch(url, {
    method,
    headers,
  })
    .then((res) => res.json())
    .then((data) => data["content"] ?? null)
    .catch((error) => console.error("Fetch Error:", error));
};
