export interface GetSmsAliyunParams {
  phoneNumbers: string;
  bizId: string;
  sendDate: string;
}

export interface GetSmsAliyunResult {
  result: string;
  code: string;
  message: string;
}

export interface SendSmsAliyunParams {
  phoneNumbers: string | Array<string | number>;
}

export interface SendSmsAliyunResult {
  phoneNumbers: string;
  bizId: string;
  sendDate: string;
  code: string;
  message: string;
}
