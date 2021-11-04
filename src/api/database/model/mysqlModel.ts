export interface MysqlParams {
  statement: string;
  host?: string;
  port?: string;
  user?: string;
  password?: string;
  db?: string;
  charset?: string;
}

export interface MysqlResult {
  result: any[];
  status: boolean;
  message: string;
}

export interface databaseInfo {
  productType: '船票';
}
