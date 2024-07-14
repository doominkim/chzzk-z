import { ChzzkChannelRepository } from "./apis";
import { ChzzkModule } from "../module";
import { ChzzkModuleOptionDto } from "./dtos/chzzk-connector-option.dto";

export class ChzzkChannel {
  private cm: ChzzkModule;
  private opt: ChzzkModuleOptionDto;
  private chzzkChannelRepository = new ChzzkChannelRepository();

  constructor(cm: ChzzkModule, opt: ChzzkModuleOptionDto) {
    this.cm = cm;
    this.opt = opt;
  }

  async findByKeyword(keyword: string) {
    return await this.chzzkChannelRepository.findByKeyword(keyword, this.opt);
  }

  async findById(channelId: string) {
    return await this.chzzkChannelRepository.findById(channelId, this.opt);
  }

  async findAccessTokenById(chatChannelId: string) {
    return await this.chzzkChannelRepository.findAccessTokenById(
      chatChannelId,
      this.opt
    );
  }

  async findVideoById(videoNo: string | number) {
    return await this.chzzkChannelRepository.findVideoById(videoNo, this.opt);
  }
}
