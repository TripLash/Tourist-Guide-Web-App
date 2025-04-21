import { Tour } from "../../Tours/Types/Tour";
import { Guide } from "./Guide";
import { User } from "./User";

export interface guideApplication {
  creation_date: string;
  _id: string;
  tour: Tour | undefined;
  user: User | undefined;
  tour_guide: Guide | undefined;
  participants: number;
  adult_price: number;
  child_price: number;
  infant_price: number;
  start_date: string;
  end_date: string;
  start_time: number;
  status: string;
}
