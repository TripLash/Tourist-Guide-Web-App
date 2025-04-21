import { Tour } from "../../Tours/Types/Tour";
import { User } from "./User";

export interface tourApplication {
  creation_date: string;
  _id: string;
  tour: Tour | undefined;
  user: User | undefined;
  members: number;
  total_price: number;
  start_date: string;
  end_date: string;
  start_time: number;
  status: string;
}
