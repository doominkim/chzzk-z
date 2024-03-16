import { constants } from "../chzzk-connector.constants";
import { ChzzkConnectorOptions } from "../interfaces/chzzk-connector-options.interface";
import { HttpMethod } from "../types/api.types";

export const getContents = (
  url: string,
  method: HttpMethod,
  options: ChzzkConnectorOptions
): Promise<Response> => {
  let headers = {};
  const { nidAuth, nidSession, userAgent } = options;

  if (nidAuth && nidSession) {
    headers[
      "Cookie"
    ] = `NID_AUT=${options.nidAuth};NID_SES=${options.nidSession}`;
  }

  if (userAgent) {
    headers["User-Agent"] = userAgent;
  }

  return fetch(constants.props.chzzkBaseUrl + url, {
    method,
    headers,
  })
    .then((res) => res.json())
    .then((data) => data["content"]);
};
