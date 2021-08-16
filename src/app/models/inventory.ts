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
  version?: number;
  status?: string;
}

export interface Document {
  id: string;
  type: string;
  expeditionDate: Date;
  expirationDate: Date;
  resourceReference: string;
  version?: string;
}

export const RESOURCE_STATUS = {
  'available': 'available'
};
