export class Language {
  id: number;
  name: string;
  logo: string;
  creator: string;
  yearCreated: string;
  info: string;
  lRatings: number;

  constructor(
    id?: number,
    name?: string,
    logo?: string,
    creator?: string,
    yearCreated?: string,
    info?: string,
    lRatings?: number
  ) {
    this.id = id;
    this.name = name;
    this.logo = logo;
    this.creator = creator;
    this.yearCreated = yearCreated;
    this.info = info;
    this.lRatings = lRatings;
  }
}
