import { User } from './user';
import { Email } from './email';
export interface Office {
  id: string;
  name: string;
  country: string;
  city: string;
  client: string;
  location: {
    lat: number | null;
    lng: number | null;
  };
  meb_admin?: User;
  mebAdmin?: string;
  repair_admin?: User;
  repairAdmin?: string;
  inventory_admin?: User;
  inventoryAdmin?: string;
  maintenance_admin?: User;
  maintenanceAdmin?: string;
  client_admin?: User;
  clientAdmin?: string;
  emails?: Email[];
}
