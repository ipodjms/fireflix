import { Country } from './country.enum';
export class Movie {
    public id?: string;
    public name: string;
    public duration?: number;
    public genre?: string[];
    public source: string;
    public country: Country;
  }
  