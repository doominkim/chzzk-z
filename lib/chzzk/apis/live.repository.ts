import { HttpMethod } from "../types/api.types";
import { constants } from "../constants";
import { plainToClass } from "class-transformer";
import { ChzzkModuleOptionDto } from "../dtos/chzzk-connector-option.dto";
import { getContents } from "./api.repository";
import { LiveDetail, LivePollingStatus, LiveStatus } from "../types/live.types";

export class ChzzkLiveRepository {
  async findStatusByChannelId(
    channelId: string,
    option: ChzzkModuleOptionDto
  ): Promise<LiveStatus> {
    const status = await getContents(
      constants.props.chzzkBaseUrl +
        `/polling/v2/channels/${channelId}/live-status`,
      HttpMethod.GET,
      option
    );

    const livePollingStatus = JSON.parse(status["livePollingStatusJson"]);
    delete status["livePollingStatusJson"];

    return plainToClass(LiveStatus, { ...status, livePollingStatus });
  }

  async findDetailByChannelId(
    channelId: string,
    option: ChzzkModuleOptionDto
  ): Promise<LiveDetail> {
    const detail = await getContents(
      constants.props.chzzkBaseUrl +
        `/service/v2/channels/${channelId}/live-detail`,
      HttpMethod.GET,
      option
    );

    const livePlayback = JSON.parse(detail["livePlaybackJson"]);
    delete detail["livePlaybackJson"];

    return plainToClass(LiveDetail, { ...detail, livePlayback });
  }
}
