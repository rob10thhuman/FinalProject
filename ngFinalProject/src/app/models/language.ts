import { Rating } from './rating';

export class Language {
  id: number;
  name: string;
  logo: string;
  creator: string;
  yearCreated: string;
  info: string;
  lRatings: Rating[];
  lCat1: Rating[];
  lCat2: Rating[];
  lCat3: Rating[];

  constructor(
    id?: number,
    name?: string,
    logo?: string,
    creator?: string,
    yearCreated?: string,
    info?: string,
    lRatings?: Rating[],
    lCat1?: Rating[],
    lCat2?: Rating[],
    lCat3?: Rating[]
  ) {
    this.id = id;
    this.name = name;
    this.logo = logo;
    this.creator = creator;
    this.yearCreated = yearCreated;
    this.info = info;
    this.lRatings = lRatings;
    this.lCat1 = lCat1;
    this.lCat2 = lCat2;
    this.lCat3 = lCat3;

  }
}
