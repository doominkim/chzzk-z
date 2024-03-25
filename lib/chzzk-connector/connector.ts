import { ChzzkChannel } from "./channel";
import { ChzzkChat } from "./chat";
import { ChzzkConnectorOptionDto } from "./dtos/chzzk-connector-option.dto";
import { ChzzkLive } from "./live";
import { ChzzkUser } from "./user";

export class ChzzkConnector {
  readonly option: ChzzkConnectorOptionDto;
  readonly channel: ChzzkChannel;
  readonly chat: ChzzkChat;
  readonly live: ChzzkLive;
  readonly user: ChzzkUser;

  constructor() {
    this.option = new ChzzkConnectorOptionDto();
    this.channel = new ChzzkChannel(this);
    this.chat = new ChzzkChat(this);
    this.live = new ChzzkLive(this);
    this.user = new ChzzkUser(this);
  }
}
