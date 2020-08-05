import { PersonInfo } from "@/interface";

export class PersonClass implements PersonInfo {
  age!: number;
  name!: string;
  sex!: number;
  say(t: string): void {
    console.log(`${this.name} say: ${t}`);
  };

  constructor(age: number, name: string, sex: number) {
    Object.assign(this, { age, name, sex });
  };

}

export class Propxy {
  private _account!: string;
  private _pwd!: string;

  constructor(account: string, pwd: string) {
    this._account = account;
    this._pwd = pwd;
  }

  get account(): string {
    return this._account;
  };

  set account(account: string){
    this._account = account;
  }
}