import { http } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { tenPayBillParams, tenPayBillResult } from './model/payModel';

enum Api {
  TenPayBill = '/api/tenPayBill',
}

export const tenPayBillAPI = (params: tenPayBillParams, mode: ErrorMessageMode = 'message') => {
  return http.post<tenPayBillResult>(
    {
      url: Api.TenPayBill,
      params,
      timeout: 1000 * 60,
    },
    {
      errorMessageMode: mode,
    },
  );
};
