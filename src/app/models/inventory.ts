import { Checkup } from './chekoups';
export type typeResourceStatus =
  'disabled'
  | 'available'
  | 'pending_checkup'
  | 'checkup'
  | 'pending_repair'
  | 'repair'
  | 'pending_maintenance'
  | 'maintenance'
  | 'waiting_approval_maintenance'
  | 'waiting_approval_repair'
  | 'rented';

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
  checkups: Checkup[];
  repairs: Checkup[];
  maintenances: Checkup[];
  version?: number;
  status?: typeResourceStatus;
  checked?: boolean;
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
  status?: string;
  client?: string;
  office?: string;
  type?: string;
  from?: string;
  to?: string;
  reference?: string;
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
  WaitingApprovalRepair: 'waiting_approval_repair',
  Rented: 'rented'
};

export const RESOURCE_STATUS_NAMES = {
  disabled: 'Desabilitado',
  available: 'Disponible',
  pending_checkup: 'Pendiente de chequeo',
  checkup: 'Chequeado',
  pending_repair: 'Pendiente de reparación',
  repair: 'Reparado',
  pending_maintenance: 'Pendiente de mantenimiento',
  maintenance: 'Mantenido',
  waiting_approval_maintenance: 'Pendiente de aprovación de mantenimento',
  waiting_approval_repair: 'Pendiente de aprovación de reparación',
  rented: 'Retenido'
};
