export interface Result<T> {
  hasErrors: Boolean;
  errors: Object[];
  info: Object;
  result: T[];
}

interface history {
  previousValue: string;
  updatedValue: string;
  updatedAt: string;
  updatedBy: string;
}

export interface value {
  value: string;
  createdAt: string;
  history: history[];
}
