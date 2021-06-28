import { User } from './user';

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
  mebAdmin?: String;
  repair_admin?: User;
  repairAdmin?: String;
  inventory_admin?: User;
  inventoryAdmin?: String;
  maintenance_admin?: User;
  maintenanceAdmin?: String;
  client_admin?: User;
  clientAdmin?: String;
}
