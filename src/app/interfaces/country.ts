export interface ICountry {
  code: string;
  flag: string;
  name: string;
  capital: string;
  languages?: string[];
  population: number;
  area: number;
  region: string;
  subregion?: string;
}
