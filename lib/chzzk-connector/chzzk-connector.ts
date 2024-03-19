import { WebSocket } from "ws";
import { ChzzkChannel, ChzzkChat, ChzzkLive, ChzzkUser } from "./apis";
import { ChzzkConnectorOptionDto } from "./dtos/chzzk-connector-option.dto";

export class ChzzkConnector {
  private ws: WebSocket;
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

  async connect() {
    const ssID = Math.floor(Math.random() * 10) + 1;

    this.ws = new WebSocket(`wss://kr-ss${ssID}.chat.naver.com/chat`);

    this.ws.on("open", () => {
      console.log("connected!");
    });

    this.ws.on("error", console.error);

    this.ws.on("close", () => {
      console.log("disconeected");
    });

    this.ws.on("message", async (data) => {
      data = await JSON.parse(data.toString());
      console.log(data);
    });
  }

  async close() {}
}
