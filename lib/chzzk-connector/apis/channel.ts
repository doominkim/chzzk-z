import { HttpMethod } from "../types/api.types";
import { constants } from "../chzzk-connector.constants";
import { ChzzkConnectorOptionDto } from "../dtos/chzzk-connector-option.dto";
import { getContents } from "./api";
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
}
