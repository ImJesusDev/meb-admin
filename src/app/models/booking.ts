import { Checkup } from './chekoups';
export type typeBookingStatus =
  | 'disabled'
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

export interface Booking {
  id: string;
  booking: any;
}

export interface PaginationBooking {
  page: number;
  perPage: string;
  Bookings: Booking[];
  totalResults: number;
}

export interface BookingFilters {
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

export const Booking_STATUS = {
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
  Rented: 'rented',
};

export const Booking_STATUS_NAMES = {
  disabled: 'Desabilitado',
  available: 'Disponible',
  pending_checkup: 'Pendiente de chequeo',
  checkup: 'Chequeado',
  pending_repair: 'Pendiente de reparación',
  repair: 'Reparado',
  pending_maintenance: 'Pendiente de mantenimiento',
  maintenance: 'Mantenido',
  waiting_approval_maintenance: 'Pendiente de aprobación de mantenimento',
  waiting_approval_repair: 'Pendiente de aprobación de reparación',
  rented: 'Retenido',
};
