import { http } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import {
  GetTicketLaiu8Params,
  GetTicketLaiu8Result,
  GetLaiu8ClientParams,
  GetLaiu8ClientResult,
} from './model/ticketModel';

enum Api {
  TicketLaiu8 = '/api/ticketLaiu8',
  Laiu8Client = '/api/laiu8Client',
}

export const getTicketLaiu8API = (
  params: GetTicketLaiu8Params,
  mode: ErrorMessageMode = 'modal',
) => {
  return http.get<GetTicketLaiu8Result>(
    {
      url: Api.TicketLaiu8,
      params,
      timeout: 1000 * 30,
    },
    {
      errorMessageMode: mode,
    },
  );
};

export const getLaiu8ClientAPI = (
  params: GetLaiu8ClientParams,
  mode: ErrorMessageMode = 'modal',
) => {
  return http.get<GetLaiu8ClientResult>(
    {
      url: Api.Laiu8Client,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
};
