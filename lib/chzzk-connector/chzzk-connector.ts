import { ChzzkChannel, ChzzkChat, ChzzkLive, ChzzkUser } from "./apis";
import { ChzzkConnectorOptionDto } from "./dtos/chzzk-connector-option.dto";

export class ChzzkConnector {
  private option: ChzzkConnectorOptionDto;
  channel: ChzzkChannel;
  chat: ChzzkChat;
  live: ChzzkLive;
  user: ChzzkUser;

  constructor() {
    this.option = new ChzzkConnectorOptionDto();
    this.channel = new ChzzkChannel(this.option);
    this.chat = new ChzzkChat(this.option);
    this.live = new ChzzkLive(this.option);
    this.user = new ChzzkUser(this.option);
  }
}
