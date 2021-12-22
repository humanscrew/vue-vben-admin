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

export interface GetTicket2FinanceParams {
  [k: string]: any;
}

export interface GetTicket2FinanceResult {
  result: {
    type: string;
    date: Date;
    paymentMethod: string;
    userType: string;
    userName: string;
    productType: string;
    ticketPrice: Number;
    getVoucher: Number;
    useVoucher: Number;
  }[];
}
