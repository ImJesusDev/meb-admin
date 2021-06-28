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
  role: string;
}
