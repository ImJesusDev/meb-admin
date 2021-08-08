import { ResourceComponent } from './resourceComponent';

export interface ResourceType {
  id: string;
  type: string;
  resourceTypeModel?: string;
  resourceTypeBrand?: string;
  photo: string;
  checkupTime: number;
  measureIndicators: boolean;
  model?: string;
  brand?: string;
  components?: ResourceComponent[];
  documentTypes?: DocumentType[];
}

export interface DocumentType {
  id: string;
  resourceType?: string;
  resourceTypeId?: string;
  name: string;
  disables: boolean;
  requiresPhoto: boolean;
  expires?: boolean;
  version?: number;
}
