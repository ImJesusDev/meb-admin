export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  documentType?: string;
  documentNumber?: string;
  phone?: string;
  photo?: string;
  role?: string;
  client?: string;
  office?: string;
  mainTransportationMethod?: string;
  secondaryTransportationMethod?: string;
  termsDate?: boolean;
  comodatoDate?: boolean;
  emergencyContactPhone?: any;
  emergencyContactName?: string;
  bloodType?: string;
  eps?: any;
  gender?: string;
}
