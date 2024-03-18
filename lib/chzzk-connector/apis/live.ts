import { ChzzkConnectorOptions } from "../interfaces/chzzk-connector-options.interface";
import { HttpMethod } from "../types/api.types";
import { getContents } from "./api";
import { constants } from "../chzzk-connector.constants";
import { plainToClass } from "class-transformer";
class LiveStatus {
  liveTitle: string;
  status: string;
  concurrentUserCount: number;
  accumulateCount: number;
  paidPromotion: boolean;
  adult: boolean;
  chatChannelId: string;
  categoryType: string;
  liveCategory: string;
  liveCategoryValue: string;
  livePollingStatusJson: JSON;
  faultStatus: string;
  userAdultStatus: string;
  chatActive: boolean;
  chatAvailableGroup: string;
  chatAvailableCondition: string;
  minFollowerMinute: number;
}
export class ChzzkLive {
  private readonly options: ChzzkConnectorOptions;

  constructor(options: ChzzkConnectorOptions) {
    this.options = options;
  }

  async findStatusByChannelId(channelId: string): Promise<LiveStatus> {
    const contents = await getContents(
      constants.props.chzzkBaseUrl +
        `/polling/v2/channels/${channelId}/live-status`,
      HttpMethod.GET,
      this.options
    );

    return plainToClass(LiveStatus, contents);
  }

  async findDetailByChannelId(channelId: string): Promise<Response> {
    return await getContents(
      constants.props.chzzkBaseUrl +
        `/polling/v2/channels/${channelId}/live-detail`,
      HttpMethod.GET,
      this.options
    );
  }
}
