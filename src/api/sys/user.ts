import { defHttp, http } from '/@/utils/http/axios';
import {
  LoginParams,
  GetRsaResultModel,
  LoginResultModel,
  registerParams,
  registerResultModel,
  GetUserInfoModel,
} from './model/userModel';

import { ErrorMessageMode } from '/#/axios';
import { useUserStoreWithOut } from '/@/store/modules/user';

export enum Api {
  RSA = '/utils/rsa',
  Login = '/auth/login',
  DefaultRSA = '/utils/defaultRSA',
  Register = '/auth/register',
  User = '/api/user',
  Logout = '/logout',
  GetPermCode = '/getPermCode',
}

export function getRSA(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  const userStore = useUserStoreWithOut();
  userStore.setPublicKey(undefined);
  return http.post<GetRsaResultModel>(
    {
      url: Api.RSA,
      params: { username: params.username },
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return http.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getDefaultRSA() {
  const userStore = useUserStoreWithOut();
  userStore.setPublicKey(undefined);
  return http.get<GetRsaResultModel>({ url: Api.DefaultRSA }, { errorMessageMode: 'none' });
}

export function registerApi(params: registerParams, mode: ErrorMessageMode = 'message') {
  return http.post<registerResultModel>(
    {
      url: Api.Register,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return http.get<GetUserInfoModel>({ url: Api.User }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}
