export interface Result<T> {
  hasErrors: Boolean;
  errors: Object[];
  info: {
    skip?: number;
    limit: number;
    locales?: number;
    total?: number;
    entries: number;
  };
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
