import { Tour } from "../../Tours/Types/Tour";
import { User } from "./User";

export interface Application {
  creation_date: string;
  _id: string;
  tour: Tour[];
  user: User[];
  members: number;
  total_price: number;
  start_date: string;
  end_date: string;
  start_time: number;
  status: string;
}
