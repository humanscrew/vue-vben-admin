export interface ClickhouseParams {
  statement: string;
  host?: string;
  port?: string;
  user?: string;
  password?: string;
  database?: string;
}

export interface ClickhouseResult {
  result: any[];
  status: boolean;
  message: string;
}

export interface databaseInfo {
  productType: '船票';
}
