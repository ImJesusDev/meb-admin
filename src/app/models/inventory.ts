export interface Resource {
  id: string;
  type: string;
  reference: string;
  qrCode: string;
  lockerPassword: string;
  client: string;
  office: string;
  loanTime: number;
  documents: Document[];
  version?: number;
}

export interface Document {
  id: string;
  type: string;
  expeditionDate: Date;
  expirationDate: Date;
  resourceReference: string;
  version?: string;
}
