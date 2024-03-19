import { HttpMethod } from "../types/api.types";
import { constants } from "../chzzk-connector.constants";
import { plainToClass } from "class-transformer";
import { ChzzkConnectorOptionDto } from "../dtos/chzzk-connector-option.dto";
import { getContents } from "./api";

class UserStatus {
  hasProfile: boolean;
  userIdHash: string;
  nickname: string;
  profileImageUrl: string;
  penalties: string[];
  officialNotiAgree: boolean;
  officialNotiAgreeUpdatedDate: string;
  verifiedMark: boolean;
  loggedIn: boolean;
}

export class ChzzkUser {
  private option: ChzzkConnectorOptionDto;
  private loggedIn: boolean;

  constructor(options: ChzzkConnectorOptionDto) {
    this.option = options;
  }

  async login(nidAuth: string, nidSession: string): Promise<void> {
    this.option.nidAuth = nidAuth;
    this.option.nidSession = nidSession;

    const status = await this.status();
    if (!status.loggedIn) {
      this.option.nidAuth = null;
      this.option.nidSession = null;
      throw new Error("failed to login.");
    } else {
      this.loggedIn = true;
    }
  }

  async logout(): Promise<void> {
    if (!this.loggedIn) {
      throw new Error("not logged in.");
    }

    this.option.nidAuth = null;
    this.option.nidSession = null;
  }

  async status(): Promise<UserStatus> {
    const contents = await getContents(
      constants.props.gameBaseUrl + `/v1/user/getUserStatus`,
      HttpMethod.GET,
      this.option
    );

    return plainToClass(UserStatus, contents);
  }
}
