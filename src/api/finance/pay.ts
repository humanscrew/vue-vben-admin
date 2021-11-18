import { http } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { transferTenPayBillParams, transferTenPayBillResult } from './model/payModel';

enum Api {
  TransferTenPayBill = '/api/transferTenPayBill',
}

export const transferTenPayBillAPI = (
  params: transferTenPayBillParams,
  mode: ErrorMessageMode = 'message',
) => {
  return http.post<transferTenPayBillResult>(
    {
      url: Api.TransferTenPayBill,
      params,
      timeout: 1000 * 60,
    },
    {
      errorMessageMode: mode,
    },
  );
};
