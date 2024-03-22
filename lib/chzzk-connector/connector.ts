import { ChzzkChannelRepository, ChzzkUserRepository } from "./apis";
import { ChzzkChannel } from "./channel";
import { ChzzkChat } from "./chat";
import { ChzzkConnectorOptionDto } from "./dtos/chzzk-connector-option.dto";
import { ChzzkLive } from "./live";
import { ChzzkUser } from "./user";

export class ChzzkConnector {
  private option: ChzzkConnectorOptionDto;
  channelRepository: ChzzkChannelRepository;
  userRepository: ChzzkUserRepository;
  channel: ChzzkChannel;
  chat: ChzzkChat;
  live: ChzzkLive;
  user: ChzzkUser;

  constructor() {
    this.option = new ChzzkConnectorOptionDto();
    this.channelRepository = new ChzzkChannelRepository();

    this.channel = new ChzzkChannel(this);
    this.chat = new ChzzkChat(this);
    this.live = new ChzzkLive(this);
    this.user = new ChzzkUser(this);
  }
}
