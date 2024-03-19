import { HttpMethod } from "../types/api.types";
import { constants } from "../chzzk-connector.constants";
import { ChzzkConnectorOptionDto } from "../dtos/chzzk-connector-option.dto";
import { getContents } from "./api";

class AccessToken {
  accessToken: string;
  extraToken: string;
}

export class ChzzkChat {
  private readonly option: ChzzkConnectorOptionDto;

  constructor(options: ChzzkConnectorOptionDto) {
    this.option = options;
  }

  async findAccessToken(chatChannelId: string): Promise<AccessToken> {
    const contents = await getContents(
      constants.props.gameBaseUrl +
        `/v1/chats/access-token?channelId=${chatChannelId}&chatType=STREAMING`,
      HttpMethod.GET,
      this.option
    );

    let token: AccessToken = new AccessToken();
    token.accessToken = contents["accessToken"] ?? null;
    token.extraToken = contents["extraToken"] ?? null;

    return token;
  }
}
