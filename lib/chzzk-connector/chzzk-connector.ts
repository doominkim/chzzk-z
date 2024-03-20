import { WebSocket } from "ws";
import { ChzzkChannel, ChzzkChat, ChzzkLive, ChzzkUser } from "./apis";
import { ChzzkConnectorOptionDto } from "./dtos/chzzk-connector-option.dto";
import { MsgCmd, SendMessageData } from "./types/chat.types";

export class ChzzkConnector {
  private ws: WebSocket;
  private option: ChzzkConnectorOptionDto;
  channel: ChzzkChannel;
  chat: ChzzkChat;
  live: ChzzkLive;
  user: ChzzkUser;
  #pingIntervalId: any;

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
    this.openHandler();
    this.errorHandler();
    this.closeHandler();
    this.messageHandler();
    this.connectHandler();
  }

  private openHandler() {
    this.ws.on("open", () => {
      console.log("connected!");
    });
  }

  private errorHandler() {
    this.ws.on("error", console.error);
  }

  private closeHandler() {
    this.ws.on("close", () => {
      console.log("disconeected");
      this.disconnect();
    });
  }
  async disconnect() {
    if (this.#pingIntervalId) {
      clearInterval(this.#pingIntervalId);
    }

    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.close();
    } else {
      console.log("already disconnected");
    }
  }

  private messageHandler() {
    this.ws.on("message", async (data) => {
      data = JSON.parse(data.toString());
      this.handleMessage(data);
    });
  }
  private async handleMessage(data: any) {
    console.log("handleMessage => ", data);
    switch (data["cmd"]) {
      case MsgCmd.PING:
        this.sendMessage({
          cmd: MsgCmd.PONG,
          ver: "2",
        });
        console.log("handleMessage => send pong");
    }
  }

  private async sendMessage(sendMessageData: SendMessageData) {
    this.ws.send(JSON.stringify(sendMessageData));
  }

  private connectHandler() {
    // If the interval is reduced, overhead can occur.
    this.#pingIntervalId = setInterval(() => {
      this.sendMessage({
        cmd: MsgCmd.PING,
        ver: "2",
      });
      console.log("connectHandler => send ping");
    }, 10000);
  }
}
