import { City } from './city';
export interface Country {
  id: string;
  name: string;
  slug: string;
  cities: City[];
}
