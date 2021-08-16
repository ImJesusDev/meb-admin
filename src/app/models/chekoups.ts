export interface Checkup {
  components: Component[];
  createdAt: string;
  id: string;
  resourceRef: string;
  status: string;
}

export interface Component {
  componentId: string;
  componentName: string;
  status: string;
}
