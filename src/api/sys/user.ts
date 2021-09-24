import { defHttp, http } from '/@/utils/http/axios';
import {
  LoginParams,
  GetRsaResultModel,
  LoginResultModel,
  GetUserInfoModel,
} from './model/userModel';

import { ErrorMessageMode } from '/#/axios';
import { useUserStoreWithOut } from '/@/store/modules/user';

enum Api {
  RSA = '/utils/rsa',
  Login = '/auth/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
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

export function loginApi(params: any, mode: ErrorMessageMode = 'modal') {
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

/**
 * @description: user login api
 */
export function login2(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
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
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export const LoginUrl = Api.Login;
