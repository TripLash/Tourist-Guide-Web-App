export interface Language {
  _id: string;
  name: string;
  language: string;
  experience: string;
}
export interface TourGuide {
  _id: string;
  firstname: string;
  lastname: string;
  photo: string;
  identity_photo: string;
  languages: Language[];
  rate: number;
  hourPrice: number;
  dayPrice: number;
  included: string[];
  guideIn: string[];
  aboutYou: string;
}
