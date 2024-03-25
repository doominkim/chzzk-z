import { ChzzkLiveRepository } from "./apis";
import { ChzzkConnector } from "./connector";
import { ChzzkConnectorOptionDto } from "./dtos/chzzk-connector-option.dto";

export class ChzzkLive {
  private cc: ChzzkConnector;
  private liveRepository = new ChzzkLiveRepository();

  constructor(cc: ChzzkConnector) {
    this.cc = cc;
  }

  async findStatusByChannelId(channelId: string) {
    return await this.liveRepository.findStatusByChannelId(
      channelId,
      this.cc.option
    );
  }
  async findDetailByChannelId(channelId: string) {
    return await this.liveRepository.findStatusByChannelId(
      channelId,
      this.cc.option
    );
  }
}
