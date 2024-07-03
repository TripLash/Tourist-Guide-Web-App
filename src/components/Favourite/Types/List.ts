import { Tour } from "../../Tours/Types/Tour";

export interface List {
  _id: string;
  name: string;
  // user: string;
  tours: Tour[];
}
