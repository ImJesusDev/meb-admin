export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  documentType?: string;
  documentNumber?: string;
  phone?: string;
  role: string;
}
