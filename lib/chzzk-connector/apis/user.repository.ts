import { HttpMethod } from "../types/api.types";
import { constants } from "../constants";
import { plainToClass } from "class-transformer";
import { ChzzkConnectorOptionDto } from "../dtos/chzzk-connector-option.dto";
import { getContents } from "./api.repository";

export class UserStatus {
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

export class ChzzkUserRepository {
  async status(option: ChzzkConnectorOptionDto): Promise<UserStatus> {
    const contents = await getContents(
      constants.props.gameBaseUrl + `/v1/user/getUserStatus`,
      HttpMethod.GET,
      option
    );

    return plainToClass(UserStatus, contents);
  }
}
