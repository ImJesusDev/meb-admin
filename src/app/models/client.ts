import { User } from './user';
import { Office } from './office';
import { Domain } from './domain';
export interface Client {
  id: string;
  name: string;
  nit: string;
  slug: string;
  logo: string;
  meb_admin?: User;
  mebAdmin?: String;
  super_admin_client?: User;
  superAdminClient?: String;
  offices?: Office[];
  domains?: Domain[];
}
