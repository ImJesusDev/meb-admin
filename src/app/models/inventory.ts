import { Checkup } from './chekoups';
export interface Resource {
  id: string;
  type: string;
  reference: string;
  qrCode: string;
  lockerPassword: number;
  client: string;
  office: string;
  loanTime: number;
  documents: Document[];
  checkups?: Checkup[];
  version?: number;
  status?: string;
}

export interface Document {
  id: string;
  type: string;
  documentNumber?: string;
  expeditionDate: Date;
  expirationDate: Date;
  resourceReference: string;
  version?: string;
}

export interface PaginationResources {
  page: number;
  perPage: string;
  resources: Resource[];
  totalResults: number;
}

export interface Pagination {
  page: number;
  perPage: string;
  totalResources: number;
}


export interface ResourceFilters {
  page?: number;
  perPage?: number;
  status?: string,
  client?: string,
  office?: string,
  type?: string
}

export const RESOURCE_STATUS = {
  Disabled: 'disabled',
  Available: 'available',
  PendingCheckup: 'pending_checkup',
  Checkup: 'checkup',
  PendingRepair: 'pending_repair',
  Repair: 'repair',
  PendingMaintenance: 'pending_maintenance',
  Maintenance: 'maintenance',
  WaitingApprovalMaintenance: 'waiting_approval_maintenance',
  WaitingApprovalRepair: 'waiting_approval_repair'
};
