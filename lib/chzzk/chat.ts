import { WebSocket } from "ws";
import { MsgCmd, MsgTypeCode, SendMessageData } from "./types/chat.types";
import { ChzzkModule } from "../module";
import { ChzzkModuleOptionDto } from "./dtos/chzzk-connector-option.dto";

export class ChzzkChat {
  private cm: ChzzkModule;
  private opt: ChzzkModuleOptionDto;
  private ws: WebSocket;
  private pingIntervalId: any;
  private _connected: boolean;
  private messages: any = [];

  constructor(cm: ChzzkModule, opt: ChzzkModuleOptionDto) {
    this.cm = cm;
    this.opt = opt;
  }

  async join(channelId: string) {
    const status = await this.cm.live.findStatusByChannelId(channelId);
    const token = await this.cm.channel.findAccessTokenById(
      status.chatChannelId
    );

    this.opt.accessToken = token.accessToken;
    this.opt.chatChannelId = status.chatChannelId;
    this.connect();
  }

  async quit() {
    this.disconnect();
  }

  private async connect() {
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
      accTkn: this.opt.accessToken,
      auth: "READ",
      devType: 2001,
    };

    if (this.opt.userId) {
      body["uid"] = this.opt.userId;
      body["auth"] = "SEND";
    }

    this.ws.on("open", () => {
      this.sendMessage({
        cmd: MsgCmd.CONNECT,
        cid: this.opt.chatChannelId,
        svcid: "game",
        ver: "2",
        tid: 1,
        bdy: body,
      });
      this._connected = true;
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
    try {
      let message, body;
      const messageType = data["cmd"];

      switch (messageType) {
        case MsgCmd.PING:
          this.sendMessage({
            cmd: MsgCmd.PONG,
            ver: "2",
          });
          break;

        case MsgCmd.CONNECTED:
          this.opt.sid = data["bdy"]?.sid;
          this.ws.emit("connect", null);
          break;

        case MsgCmd.BLIND:
          body = data["bdy"][0];

          message = {
            type: MsgCmd[messageType],
            cid: body["cid"],
            ctime: body["ctime"],
            bdy: body["bdy"],
          };
          this.messages.push(message);
          break;

        case MsgCmd.CHAT:
        case MsgCmd.RECENT_CHAT:
        case MsgCmd.DONATION:
        case MsgCmd.KICK:
        case MsgCmd.BLOCK:
        case MsgCmd.NOTICE:
        case MsgCmd.PENALTY:
          body = data["bdy"][0];

          const profile = JSON.parse(body["profile"]);
          const extras = JSON.parse(body["extras"]);
          message = {
            type: MsgCmd[messageType],
            cid: body["cid"],
            ctime: body["ctime"],
            msg: body["msg"],
            profile: profile,
            extras: extras,
          };
          this.messages.push(message);
          break;
      }
    } catch (e) {
      console.log(data);
      throw new Error(e);
    }
  }

  pollingEvent() {
    const messages = this.messages;
    this.messages = [];

    return messages;
  }

  async onEvent(messageType: MsgCmd) {}

  private async disconnect() {
    if (this.pingIntervalId) {
      clearInterval(this.pingIntervalId);
    }

    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.close();
    } else {
      console.log("disconnected");
    }

    this._connected = false;
  }

  private sendMessage(sendMessageData: SendMessageData) {
    this.ws.send(JSON.stringify(sendMessageData));
  }

  chat(message: string) {
    if (!this.cm.user.loggedIn) {
      throw new Error("You must be logged in.");
    }

    if (!this.connected) {
      throw new Error("You must be connected to one of channel.");
    }

    this.sendMessage({
      cid: this.opt.chatChannelId,
      svcid: "game",
      ver: "2",
      bdy: {
        extras: JSON.stringify({
          chatType: "STREAMING",
          emojis: "",
          osType: "PC",
          streamingChannelId: this.opt.chatChannelId,
        }),
        msg: message,
        msgTime: Date.now(),
        msgTypeCode: MsgTypeCode.TEXT,
      },
      retry: false,
      cmd: MsgCmd.SEND_CHAT,
      sid: this.opt.sid,
      tid: 3,
    });
    const extras = {};

    this.ws.send(JSON.stringify({}));
  }

  get connected(): boolean {
    return this._connected;
  }
}
