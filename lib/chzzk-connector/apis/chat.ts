import { HttpMethod } from "../types/api.types";
import { constants } from "../chzzk-connector.constants";
import { ChzzkConnectorOptionDto } from "../dtos/chzzk-connector-option.dto";
import { getContents } from "./api";
import { WebSocket } from "ws";
import { MsgCmd, SendMessageData } from "../types/chat.types";

class AccessToken {
  accessToken: string;
  extraToken: string;
}

export class ChzzkChat {
  private readonly option: ChzzkConnectorOptionDto;
  private ws: WebSocket;
  #pingIntervalId: any;

  constructor(options: ChzzkConnectorOptionDto) {
    this.option = options;
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

  async findAccessToken(chatChannelId: string): Promise<AccessToken> {
    const contents = await getContents(
      constants.props.gameBaseUrl +
        `/v1/chats/access-token?channelId=${chatChannelId}&chatType=STREAMING`,
      HttpMethod.GET,
      this.option
    );

    let token: AccessToken = new AccessToken();
    token.accessToken = contents["accessToken"] ?? null;
    token.extraToken = contents["extraToken"] ?? null;

    return token;
  }
}
