import { http } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import {
  GetSmsAliyunParams,
  GetSmsAliyunResult,
  SendSmsAliyunParams,
  SendSmsAliyunResult,
} from './model/smsModel';

enum Api {
  SmsAliyun = '/utils/smsAliyun',
}

export const getSmsAliyunAPI = (params: GetSmsAliyunParams, mode: ErrorMessageMode = 'modal') => {
  return http.get<GetSmsAliyunResult>(
    {
      url: Api.SmsAliyun,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
};

export const sendSmsAliyunAPI = (params: SendSmsAliyunParams, mode: ErrorMessageMode = 'modal') => {
  return http.post<SendSmsAliyunResult>(
    {
      url: Api.SmsAliyun,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
};
