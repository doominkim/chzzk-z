import { HttpMethod } from "../types/api.types";
import { constants } from "../constants";
import { ChzzkConnectorOptionDto } from "../dtos/chzzk-connector-option.dto";
import { getContents } from "./api.repository";

class AccessToken {
  accessToken: string;
  extraToken: string;
}
export class ChzzkChannelRepository {
  async findByKeyword(
    keyword: string,
    option: ChzzkConnectorOptionDto
  ): Promise<Response> {
    return await getContents(
      constants.props.chzzkBaseUrl +
        `/service/v1/search/channels?keyword=${keyword}`,
      HttpMethod.GET,
      option
    );
  }

  async findById(channelId: string, option: ChzzkConnectorOptionDto) {
    return await getContents(
      constants.props.chzzkBaseUrl + `/service/v1/channels/${channelId}`,
      HttpMethod.GET,
      option
    );
  }

  async findAccessTokenById(
    chatChannelId: string,
    option: ChzzkConnectorOptionDto
  ): Promise<AccessToken> {
    const contents = await await getContents(
      constants.props.gameBaseUrl +
        `/v1/chats/access-token?channelId=${chatChannelId}&chatType=STREAMING`,
      HttpMethod.GET,
      option
    );

    let token: AccessToken = new AccessToken();
    token.accessToken = contents["accessToken"] ?? null;
    token.extraToken = contents["extraToken"] ?? null;

    return token;
  }
}
