import { WebSocket } from "ws";
import { ChzzkConnectorOptionDto } from "./dtos/chzzk-connector-option.dto";
import { MsgCmd, MsgTypeCode, SendMessageData } from "./types/chat.types";
import { ChzzkConnector } from "./connector";

export class ChzzkChat {
  private cc: ChzzkConnector;
  private ws: WebSocket;
  private pingIntervalId: any;

  constructor(cc: ChzzkConnector) {
    this.cc = cc;
  }

  async join(channelId: string) {
    const status = await this.cc.live.findStatusByChannelId(channelId);
    const token = await this.cc.channel.findAccessTokenById(
      status.chatChannelId
    );

    this.cc.option.accessToken = token.accessToken;
    this.cc.option.chatChannelId = status.chatChannelId;
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
    let body = {
      accTkn: this.cc.option.accessToken,
      auth: "READ",
      devType: 2001,
    };

    if (this.cc.option.userId) {
      body["uid"] = this.cc.option.userId;
      body["auth"] = "SEND";
    }

    this.ws.on("open", () => {
      this.sendMessage({
        cmd: MsgCmd.CONNECT,
        cid: this.cc.option.chatChannelId,
        svcid: "game",
        ver: "2",
        tid: 1,
        bdy: body,
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

  private messageHandler() {
    this.ws.on("message", async (data) => {
      data = JSON.parse(data.toString());
      this.handleMessage(data);
    });
  }

  private connectHandler() {
    // If the interval is reduced, overhead can occur.
    this.pingIntervalId = setInterval(() => {
      this.sendMessage({
        cmd: MsgCmd.PING,
        ver: "2",
      });
    }, 10000);
  }

  private async handleMessage(data: any) {
    // console.log("handleMessage => ", data);
    switch (data["cmd"]) {
      case MsgCmd.PING:
        this.sendMessage({
          cmd: MsgCmd.PONG,
          ver: "2",
        });
        break;

      case MsgCmd.CONNECTED:
        // console.log(data);
        this.cc.option.sid = data["bdy"]?.sid;
        this.ws.emit("connect", null);

        break;

      case MsgCmd.CHAT:
        console.log(
          JSON.parse(data["bdy"][0]["profile"]).nickname,
          data["bdy"][0]["msg"]
        );
        break;

      case MsgCmd.RECENT_CHAT:
      case MsgCmd.DONATION:
      case MsgCmd.KICK:
      case MsgCmd.BLOCK:
      case MsgCmd.BLIND:
      case MsgCmd.NOTICE:
      case MsgCmd.PENALTY:
        console.log(data);
        break;
    }
  }

  async disconnect() {
    if (this.pingIntervalId) {
      clearInterval(this.pingIntervalId);
    }

    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.close();
    } else {
      console.log("already disconnected");
    }
  }

  private sendMessage(sendMessageData: SendMessageData) {
    this.ws.send(JSON.stringify(sendMessageData));
  }

  chat(message: string) {
    this.sendMessage({
      cid: this.cc.option.chatChannelId,
      svcid: "game",
      ver: "2",
      bdy: {
        extras: JSON.stringify({
          chatType: "STREAMING",
          emojis: "",
          osType: "PC",
          streamingChannelId: this.cc.option.chatChannelId,
        }),
        msg: message,
        msgTime: Date.now(),
        msgTypeCode: MsgTypeCode.TEXT,
      },
      retry: false,
      cmd: MsgCmd.SEND_CHAT,
      sid: this.cc.option.sid,
      tid: 3,
    });
    const extras = {};

    this.ws.send(JSON.stringify({}));
  }
}
