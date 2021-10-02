import { http } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { GETTicketLaiu8Params, GetTicketLaiu8Model } from './model/ticketModel';

enum Api {
  TicketLaiu8 = '/api/ticketLaiu8',
}

export const getTicketLaiu8API = (
  params: GETTicketLaiu8Params,
  mode: ErrorMessageMode = 'modal',
) => {
  return http.get<GetTicketLaiu8Model>(
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
