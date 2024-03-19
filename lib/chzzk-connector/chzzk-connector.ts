import { WebSocket } from "ws";
import { ChzzkConnectorOptions } from "./interfaces/chzzk-connector-options.interface";
import { ChzzkChannel, ChzzkChat, ChzzkLive, ChzzkUser } from "./apis";

export class ChzzkConnector {
  private ws: WebSocket;
  private readonly options: ChzzkConnectorOptions;
  channel: ChzzkChannel;
  chat: ChzzkChat;
  live: ChzzkLive;
  user: ChzzkUser;

  constructor(options: ChzzkConnectorOptions) {
    this.options = options;
    this.channel = new ChzzkChannel(options);
    this.chat = new ChzzkChat(options);
    this.live = new ChzzkLive(options);
    this.user = new ChzzkUser(options);
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
}
