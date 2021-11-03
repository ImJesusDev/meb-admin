import { Resource, AssignedUser } from '.';

export interface Checkup {
  components: Component[];
  createdAt: string;
  id: string;
  resourceRef: string;
  status: string;
  assignedUser?: AssignedUser;
  resource?: Resource;
  
}

export interface Component {
  componentId: string;
  componentName: string;
  status: string;
  comment?: string;
  photo?: string;
}

export const COMPONENT_STATUS = {
  Good: 'good',
  Regular: 'regular',
  Bad: 'bad'
};

export const ES_COMPONENT_STATUS = {
  Good: 'Bueno',
  Regular: 'Regular',
  Bad: 'Malo'
};
