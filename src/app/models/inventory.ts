export interface Resource {
  id: string;
  type: string;
  reference: string;
  qrCode: string;
  lockerPassword: string;
  client: string;
  office: string;
  loanTime: number;
  version: number;
  documents: Document[];
}

export interface Document {
  id: string;
  type: string;
  expeditionDate: string;
  expirationDate: string;
  resourceReference: string;
  version: string;
}
