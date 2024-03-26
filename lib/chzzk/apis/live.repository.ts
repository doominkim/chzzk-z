import { HttpMethod } from "../types/api.types";
import { constants } from "../constants";
import { plainToClass } from "class-transformer";
import { ChzzkModuleOptionDto } from "../dtos/chzzk-connector-option.dto";
import { getContents } from "./api.repository";

export class LiveStatus {
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

export class ChzzkLiveRepository {
  async findStatusByChannelId(
    channelId: string,
    option: ChzzkModuleOptionDto
  ): Promise<LiveStatus> {
    const contents = await getContents(
      constants.props.chzzkBaseUrl +
        `/polling/v2/channels/${channelId}/live-status`,
      HttpMethod.GET,
      option
    );

    return plainToClass(LiveStatus, contents);
  }

  async findDetailByChannelId(
    channelId: string,
    option: ChzzkModuleOptionDto
  ): Promise<Response> {
    return await getContents(
      constants.props.chzzkBaseUrl +
        `/polling/v2/channels/${channelId}/live-detail`,
      HttpMethod.GET,
      option
    );
  }
}
