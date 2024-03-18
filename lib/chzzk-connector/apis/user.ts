import { ChzzkConnectorOptions } from "../interfaces/chzzk-connector-options.interface";
import { HttpMethod } from "../types/api.types";
import { getContents } from "./api";
import { constants } from "../chzzk-connector.constants";
import { plainToClass } from "class-transformer";

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
  private options: ChzzkConnectorOptions;

  constructor(options: ChzzkConnectorOptions) {
    this.options = options;
  }

  async login(nidAuth: string, nidSession: string): Promise<void> {
    this.options.nidAuth = nidAuth;
    this.options.nidSession = nidSession;
  }

  async status(): Promise<UserStatus> {
    const contents = await getContents(
      constants.props.gameBaseUrl + `/v1/user/getUserStatus`,
      HttpMethod.GET,
      this.options
    );

    return plainToClass(UserStatus, contents);
  }
}
