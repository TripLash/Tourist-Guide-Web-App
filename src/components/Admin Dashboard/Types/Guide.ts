export interface Guide {
  _id: string;
  user: User;
  firstname: string;
  lastname: string;
  city: string;
  country: string;
  identity_photo: string;
  languages: Language[];
  rate: number;
  hourPrice: number;
  dayPrice: number;
  guideIn: string[];
  rateQuantit: number;
}
export interface Language {
  _id: string;
  name: string;
  experience: string;
}
export interface User {
  _id: string;
  firstname: string;
  lastname: string;
}
