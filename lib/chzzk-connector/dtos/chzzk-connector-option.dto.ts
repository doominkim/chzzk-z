export class ChzzkConnectorOptionDto {
  private _nidAuth: string;
  private _nidSession: string;
  private _channelId: string;
  private _chatChannelId: string;
  private _accessToken: string;
  private _userId: string;

  constructor() {}

  get nidAuth(): string {
    return this._nidAuth;
  }

  set nidAuth(value: string) {
    this._nidAuth = value;
  }

  get nidSession(): string {
    return this._nidSession;
  }

  set nidSession(value: string) {
    this._nidSession = value;
  }

  get channelId(): string {
    return this._channelId;
  }

  set channelId(value: string) {
    this._channelId = value;
  }

  get chatChannelId(): string {
    return this._chatChannelId;
  }

  set chatChannelId(value: string) {
    this._chatChannelId = value;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  set accessToken(value: string) {
    this._accessToken = value;
  }

  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }
}
