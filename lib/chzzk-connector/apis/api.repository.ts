import { ChzzkConnectorOptionDto } from "../dtos/chzzk-connector-option.dto";
import { HttpMethod } from "../types/api.types";

export const getContents = (
  url: string,
  method: HttpMethod,
  option: ChzzkConnectorOptionDto
): Promise<Response> => {
  let headers = {};
  const { nidAuth, nidSession } = option;

  if (nidAuth && nidSession) {
    headers[
      "Cookie"
    ] = `NID_AUT=${option.nidAuth};NID_SES=${option.nidSession}`;
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
