export interface Person {
  label: string;
  value?: number;
  showTxt?: string;
  [propName: string]: any;
}

export interface LogFun {
  (str: string, str2: string): void;
}

export interface StringArray {
  [index: number]: string
}

export interface PersonInfo {
  age: number;
  name: string;
  sex: number;

  say(t: string): void;
}


export interface Base {
  no: number;
}

export interface AttrMap {
  [propName: string]: any;
}

export interface Product extends Base, AttrMap {
  title: string;
}