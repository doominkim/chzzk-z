import { ChzzkConnectorOptionDto } from "./dtos/chzzk-connector-option.dto";
import { ChzzkUserRepository } from "./apis";

export class ChzzkUser {
  private readonly option: ChzzkConnectorOptionDto;
  private loggedIn: boolean;
  chzzkUserRepository: ChzzkUserRepository = new ChzzkUserRepository();

  constructor(option: ChzzkConnectorOptionDto) {
    this.option = option;
  }

  async login(nidAuth: string, nidSession: string): Promise<void> {
    this.option.nidAuth = nidAuth;
    this.option.nidSession = nidSession;

    const status = await this.chzzkUserRepository.status(this.option);
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
}
