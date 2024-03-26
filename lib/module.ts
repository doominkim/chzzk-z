import { ChzzkChannel } from "./chzzk/channel";
import { ChzzkChat } from "./chzzk/chat";
import { ChzzkModuleOptionDto } from "./chzzk/dtos/chzzk-connector-option.dto";
import { ChzzkLive } from "./chzzk/live";
import { ChzzkUser } from "./chzzk/user";

export class ChzzkModule {
  readonly channel: ChzzkChannel;
  readonly chat: ChzzkChat;
  readonly live: ChzzkLive;
  readonly user: ChzzkUser;

  constructor() {
    const moduleOption = new ChzzkModuleOptionDto();
    this.channel = new ChzzkChannel(this, moduleOption);
    this.chat = new ChzzkChat(this, moduleOption);
    this.live = new ChzzkLive(this, moduleOption);
    this.user = new ChzzkUser(this, moduleOption);
  }
}
