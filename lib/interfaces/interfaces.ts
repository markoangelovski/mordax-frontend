export interface Result<T> {
  hasErrors: Boolean;
  errors: {
    message: string;
    statusCode: number;
    code: string;
  }[];
  info: {
    skipped?: number;
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
