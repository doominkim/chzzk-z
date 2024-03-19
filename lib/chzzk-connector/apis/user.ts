import { HttpMethod } from "../types/api.types";
import { getContents } from "./getContents";
import { constants } from "../chzzk-connector.constants";
import { plainToClass } from "class-transformer";
import { ChzzkConnectorOptionDto } from "../dtos/chzzk-connector-option.dto";

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

  constructor(options: ChzzkConnectorOptionDto) {
    this.option = options;
  }

  async login(nidAuth: string, nidSession: string): Promise<void> {
    this.option.nidAuth = nidAuth;
    this.option.nidSession = nidSession;
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
