export enum MsgCmd {
  PING = 0,
  PONG = 10000,
  CONNECT = 100,
  CONNECTED = 10100,
  REQUEST_RECENT_CHAT = 5101,
  RECENT_CHAT = 15101,
  EVENT = 93006,
  CHAT = 93101,
  DONATION = 93102,
  KICK = 94005,
  BLOCK = 94006,
  BLIND = 94008,
  NOTICE = 94010,
  PENALTY = 94015,
  SEND_CHAT = 3101,
}

export enum MsgTypeCode {
  TEXT = 1,
  IMAGE = 2,
  STICKER = 3,
  VIDEO = 4,
  RICH = 5,
  DONATION = 10,
  SUBSCRIPTION = 11,
  SYSTEM_MESSAGE = 30,
}

export interface SendMessageExtras {
  chatType: string; // "STREAMING",
  emojis: string; // "",
  osType: string; // "PC",
  streamingChannelId: number;
}

export interface SendMessageBody {
  extras?: SendMessageExtras;
  msg?: string;
  msgTime?: string;
  msgTypeCode?: MsgTypeCode;
  recentMessageCount?: number;
  devType?: number;
  uid?: string;
  auth?: string;
  accTkn?: string;
}

export interface SendMessageData {
  cmd: MsgCmd;
  ver?: string;
  cid?: string;
  svcid?: string;
  bdy?: SendMessageBody;
  sid?: string;
  tid?: number;
  uid?: string;
  retry?: number;
}
