export interface ResourceComponent {
  id: string;
  name: string;
  componentModel?: string;
  componentBrand?: string;
  area: string;
  regularUnable: boolean;
  regularSendTicket: boolean;
  badUnable: boolean;
  badSendTicket: boolean;
}
