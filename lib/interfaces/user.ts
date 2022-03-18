export interface User {
  active: boolean;
  key: string;
  issuedFor: string;
  issuer: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}
