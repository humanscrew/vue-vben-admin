export interface GetTicketLaiu8Params {
  startTime: Date;
  endTime: Date;
}

export interface GetTicketLaiu8Model {
  [k: string]: any;
}

export interface GetLaiu8ClientParams {
  [k: string]: any;
}

export interface GetLaiu8ClientModel {
  clientId: string;
  uniformSocialCreditCode: string;
  type: string;
  name: string;
  alias?: string;
  mobile?: string;
  address?: string;
}
