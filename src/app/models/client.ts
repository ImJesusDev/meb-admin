import { User } from './user';
import { Office } from './office';
import { Domain } from './domain';
import { Email } from './email';
export interface Client {
  id: string;
  name: string;
  nit: string;
  slug: string;
  logo: string;
  meb_admin?: User;
  mebAdmin?: string;
  super_admin_client?: User;
  superAdminClient?: string;
  offices?: Office[];
  domains?: Domain[];
  emails?: Email[];
  users?: User[];
}
