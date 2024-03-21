import { HttpMethod } from "../types/api.types";
import { constants } from "../chzzk-connector.constants";
import { ChzzkConnectorOptionDto } from "../dtos/chzzk-connector-option.dto";
import { getContents } from "./api";

class AccessToken {
  accessToken: string;
  extraToken: string;
}
export class ChzzkChannel {
  private readonly option: ChzzkConnectorOptionDto;

  constructor(option: ChzzkConnectorOptionDto) {
    this.option = option;
  }

  async find(keyword: string): Promise<Response> {
    return getContents(
      constants.props.chzzkBaseUrl +
        `/service/v1/search/channels?keyword=${keyword}`,
      HttpMethod.GET,
      this.option
    );
  }

  async findById(channelId: string) {
    return getContents(
      constants.props.chzzkBaseUrl + `/service/v1/channels/${channelId}`,
      HttpMethod.GET,
      this.option
    );
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
