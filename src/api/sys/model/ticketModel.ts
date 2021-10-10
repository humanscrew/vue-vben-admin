export interface GetTicketLaiu8Params {
  startTime: Date;
  endTime: Date;
}

export interface GetTicketLaiu8Result {
  [k: string]: any;
}

export interface GetLaiu8ClientParams {
  [k: string]: any;
}

export interface GetLaiu8ClientResult {
  clientId: string;
  uniformSocialCreditCode: string;
  type: string;
  name: string;
  alias?: string;
  mobile?: string;
  address?: string;
}
