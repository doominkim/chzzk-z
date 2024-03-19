import { ChzzkConnectorOptions } from "../interfaces/chzzk-connector-options.interface";
import { HttpMethod } from "../types/api.types";
import { getContents } from "./getContents";
import { constants } from "../chzzk-connector.constants";

class AccessToken {
  accessToken: string;
  extraToken: string;
}

export class ChzzkChat {
  private readonly options: ChzzkConnectorOptions;

  constructor(options: ChzzkConnectorOptions) {
    this.options = options;
  }

  async findAccessToken(chatChannelId: string): Promise<AccessToken> {
    const contents = await getContents(
      constants.props.gameBaseUrl +
        `/v1/chats/access-token?channelId=${chatChannelId}&chatType=STREAMING`,
      HttpMethod.GET,
      this.options
    );

    let token: AccessToken = new AccessToken();
    token.accessToken = contents["accessToken"] ?? null;
    token.extraToken = contents["extraToken"] ?? null;

    return token;
  }
}
