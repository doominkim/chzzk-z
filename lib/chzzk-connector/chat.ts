import { WebSocket } from "ws";
import { ChzzkConnectorOptionDto } from "./dtos/chzzk-connector-option.dto";
import { MsgCmd, SendMessageData } from "./types/chat.types";

export class ChzzkChat {
  private readonly option: ChzzkConnectorOptionDto;
  private ws: WebSocket;
  #pingIntervalId: any;

  constructor(options: ChzzkConnectorOptionDto) {
    this.option = options;
  }

  async join(channelId: string) {}

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

      this.sendMessage({
        cmd: MsgCmd.CONNECTED,
        cid: this.option.chatChannelId,
        svcid: "game",
        ver: "2",
        tid: 1,
        bdy: {
          accTkn: this.option.accessToken,
          auth: "SEND",
          devType: 2001,
          uid: this.option.userId,
        },
      });
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

  private sendMessage(sendMessageData: SendMessageData) {
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
