export interface ResourceComponent {
  id: string;
  name: string;
  componentModel?: string;
  componentBrand?: string;
  regularCondition: {
    ticket: boolean,
    disables: boolean
  };
  badCondition: {
    ticket: boolean,
    disables: boolean
  };
  resourceTypeId?: string;
}
