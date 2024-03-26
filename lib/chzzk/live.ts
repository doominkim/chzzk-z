import { ChzzkLiveRepository } from "./apis";
import { ChzzkModule } from "../module";
import { ChzzkModuleOptionDto } from "./dtos/chzzk-connector-option.dto";

export class ChzzkLive {
  private cm: ChzzkModule;
  private opt: ChzzkModuleOptionDto;
  private liveRepository = new ChzzkLiveRepository();

  constructor(cm: ChzzkModule, opt: ChzzkModuleOptionDto) {
    this.cm = cm;
    this.opt = opt;
  }

  async findStatusByChannelId(channelId: string) {
    return await this.liveRepository.findStatusByChannelId(channelId, this.opt);
  }

  async findDetailByChannelId(channelId: string) {
    return await this.liveRepository.findDetailByChannelId(channelId, this.opt);
  }
}
