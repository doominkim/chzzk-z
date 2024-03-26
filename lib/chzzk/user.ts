import { ChzzkUserRepository, UserStatus } from "./apis";
import { ChzzkModule } from "../module";
import { ChzzkModuleOptionDto } from "./dtos/chzzk-connector-option.dto";

export class ChzzkUser {
  private cm: ChzzkModule;
  private opt: ChzzkModuleOptionDto;
  private userRepository = new ChzzkUserRepository();
  private _loggedIn: boolean;

  constructor(cm: ChzzkModule, opt: ChzzkModuleOptionDto) {
    this.cm = cm;
    this.opt = opt;
  }

  async login(nidAuth: string, nidSession: string): Promise<void> {
    this.opt.nidAuth = nidAuth;
    this.opt.nidSession = nidSession;

    const status = await this.userRepository.status(this.opt);

    this.opt.userId = status.userIdHash;
    if (!status.loggedIn) {
      this.opt.nidAuth = null;
      this.opt.nidSession = null;
      throw new Error("failed to login.");
    } else {
      this._loggedIn = true;
    }
  }

  async logout(): Promise<void> {
    if (!this._loggedIn) {
      throw new Error("not logged in.");
    }

    this.opt.nidAuth = null;
    this.opt.nidSession = null;
    this.opt.userId = null;
    this._loggedIn = false;
  }

  async status(): Promise<UserStatus> {
    return this.userRepository.status(this.opt);
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }
}
