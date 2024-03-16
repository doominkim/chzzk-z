import { ChzzkConnectorOptions } from "../interfaces/chzzk-connector-options.interface";

export class ChzzkChat {
  private readonly options: ChzzkConnectorOptions;

  constructor(options: ChzzkConnectorOptions) {
    this.options = options;
  }
}
