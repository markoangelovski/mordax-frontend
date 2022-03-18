export interface Result {
  hasErrors: Boolean;
  errors: Object[];
  info: Object;
  result: /*  Object[] | */ User[];
}

export interface User {
  active: boolean;
  key: string;
  issuedFor: string;
  issuer: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}
