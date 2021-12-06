
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
  comments: string;
  createdAt: string;
  rating: number;
  resourceRef: string;
  status: string;
  travels: Travels[];
  userId: string;
  user: UserBooking;
}

export interface UserBooking {
  client:string;
  email:string;
  firstName:string;
  lastName:string;  
  office:string;
  version:string;
  id:string;
}

export interface Travels{
  createdAt?: string;
  destination?: string;
  destinationPoint?: Ubication[];
  id: string;
  indicators?:Indicator[];
  origin?: string;
  originPoint?: Ubication[];
  reservationId?: string;
  resourceRef?: string;
  status?: string;
  tracking?: any[];
  userId?: string;
  version?: number;
}

export interface Indicator{
  calories: string;
  economicFootprint: string;
  energyFootprint: string;
  environmentalFootprint: string;
  km: string;
}

export interface Ubication{
  latitude: string;
  longitude: string;
}



export interface PaginationBooking {
  page: number;
  perPage: number;
  reservations: Booking[];
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

export const BOOKING_STATUS = {
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

export const BOOKING_STATUS_NAMES = {
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
