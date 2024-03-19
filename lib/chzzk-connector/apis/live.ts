import { HttpMethod } from "../types/api.types";
import { getContents } from "./getContents";
import { constants } from "../chzzk-connector.constants";
import { plainToClass } from "class-transformer";
import { ChzzkConnectorOptionDto } from "../dtos/chzzk-connector-option.dto";
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
  private readonly option: ChzzkConnectorOptionDto;

  constructor(options: ChzzkConnectorOptionDto) {
    this.option = options;
  }

  async findStatusByChannelId(channelId: string): Promise<LiveStatus> {
    const contents = await getContents(
      constants.props.chzzkBaseUrl +
        `/polling/v2/channels/${channelId}/live-status`,
      HttpMethod.GET,
      this.option
    );

    return plainToClass(LiveStatus, contents);
  }

  async findDetailByChannelId(channelId: string): Promise<Response> {
    return await getContents(
      constants.props.chzzkBaseUrl +
        `/polling/v2/channels/${channelId}/live-detail`,
      HttpMethod.GET,
      this.option
    );
  }
}
