import { ChzzkConnectorOptionDto } from "./dtos/chzzk-connector-option.dto";

export class ChzzkLive {
  private readonly option: ChzzkConnectorOptionDto;

  constructor(option: ChzzkConnectorOptionDto) {
    this.option = option;
  }
}
