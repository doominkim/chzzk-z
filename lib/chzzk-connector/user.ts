import { ChzzkConnectorOptionDto } from "./dtos/chzzk-connector-option.dto";
import {
  ChzzkChannelRepository,
  ChzzkUserRepository,
  UserStatus,
} from "./apis";
import { ChzzkConnector } from "./connector";

export class ChzzkUser {
  private cc: ChzzkConnector;
  private userRepository = new ChzzkUserRepository();
  private loggedIn: boolean;

  constructor(cc: ChzzkConnector) {
    this.cc = cc;
  }

  async login(nidAuth: string, nidSession: string): Promise<void> {
    this.cc.option.nidAuth = nidAuth;
    this.cc.option.nidSession = nidSession;

    const status = await this.userRepository.status(this.cc.option);
    if (!status.loggedIn) {
      this.cc.option.nidAuth = null;
      this.cc.option.nidSession = null;
      throw new Error("failed to login.");
    } else {
      this.loggedIn = true;
    }
  }

  async logout(): Promise<void> {
    if (!this.loggedIn) {
      throw new Error("not logged in.");
    }

    this.cc.option.nidAuth = null;
    this.cc.option.nidSession = null;
  }

  async status(): Promise<UserStatus> {
    return this.userRepository.status(this.cc.option);
  }
}
