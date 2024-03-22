import { ChzzkConnectorOptionDto } from "./dtos/chzzk-connector-option.dto";
import { ChzzkChannelRepository } from "./apis";
import { ChzzkConnector } from "./connector";

export class ChzzkChannel {
  private readonly option: ChzzkConnectorOptionDto;
  chzzkChannelRepository: ChzzkChannelRepository;

  constructor(cc: ChzzkConnector) {
    this.chzzkChannelRepository = cc.channel.chzzkChannelRepository;
  }

  async findByKeyword(keyword: string) {
    return await this.chzzkChannelRepository.findByKeyword(
      keyword,
      this.option
    );
  }

  async findById(channelId: string) {
    return await this.chzzkChannelRepository.findById(channelId, this.option);
  }

  async findAccessTokenById(chatChannelId: string) {
    return await this.chzzkChannelRepository.findAccessTokenById(
      chatChannelId,
      this.option
    );
  }
}
