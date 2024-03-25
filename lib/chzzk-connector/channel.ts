import { ChzzkConnectorOptionDto } from "./dtos/chzzk-connector-option.dto";
import { ChzzkChannelRepository } from "./apis";
import { ChzzkConnector } from "./connector";

export class ChzzkChannel {
  private cc: ChzzkConnector;
  private chzzkChannelRepository = new ChzzkChannelRepository();

  constructor(cc: ChzzkConnector) {
    this.cc = cc;
  }

  async findByKeyword(keyword: string) {
    return await this.chzzkChannelRepository.findByKeyword(
      keyword,
      this.cc.option
    );
  }

  async findById(channelId: string) {
    return await this.chzzkChannelRepository.findById(
      channelId,
      this.cc.option
    );
  }

  async findAccessTokenById(chatChannelId: string) {
    return await this.chzzkChannelRepository.findAccessTokenById(
      chatChannelId,
      this.cc.option
    );
  }
}
