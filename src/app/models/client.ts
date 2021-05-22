import { User } from './user';
export interface Client {
  id: string;
  name: string;
  nit: string;
  slug: string;
  logo: string;
  meb_admin?: User;
  super_admin_client?: User;
}
