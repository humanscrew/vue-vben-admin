export interface SQLParams {
  sqlStatement: string;
  host?: string;
  port?: string;
  user?: string;
  password?: string;
  db?: string;
  charset?: string;
}

export interface SQLResultModel {
  result: any;
  status: boolean;
  message: string;
}
