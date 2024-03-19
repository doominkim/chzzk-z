import { ChzzkConnectorOptions } from "../interfaces/chzzk-connector-options.interface";
import { HttpMethod } from "../types/api.types";
import { getContents } from "./getContents";
import { constants } from "../chzzk-connector.constants";
export class ChzzkChannel {
  private readonly options: ChzzkConnectorOptions;

  constructor(options: ChzzkConnectorOptions) {
    this.options = options;
  }

  async find(keyword: string): Promise<Response> {
    return getContents(
      constants.props.chzzkBaseUrl +
        `/service/v1/search/channels?keyword=${keyword}`,
      HttpMethod.GET,
      this.options
    );
  }

  async findById(channelId: string) {
    return getContents(
      constants.props.chzzkBaseUrl + `/service/v1/channels/${channelId}`,
      HttpMethod.GET,
      this.options
    );
  }
}
