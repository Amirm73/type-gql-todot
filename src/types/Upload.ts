import { Stream } from "stream";

export interface Uplaod {
  filename: string;
  mimType: string;
  encoding: string;
  createReadStream: () => Stream;
}
