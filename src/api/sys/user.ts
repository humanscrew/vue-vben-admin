import { defHttp, http } from '/@/utils/http/axios';
import {
  LoginParams,
  GetRsaResult,
  LoginResult,
  RegisterParams,
  RegisterResult,
  GetUserInfoResult,
  GetPermitCodeResult,
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
  GetPermCode = '/api/permitCode',
}

export function getRsaAPI(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  const userStore = useUserStoreWithOut();
  userStore.setPublicKey(undefined);
  return http.post<GetRsaResult>(
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
  return http.post<LoginResult>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getDefaultRsaAPI() {
  const userStore = useUserStoreWithOut();
  userStore.setPublicKey(undefined);
  return http.get<GetRsaResult>({ url: Api.DefaultRSA }, { errorMessageMode: 'none' });
}

export function registerApi(params: RegisterParams, mode: ErrorMessageMode = 'message') {
  return http.post<RegisterResult>(
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
export function getUserInfoAPI() {
  return http.get<GetUserInfoResult>({ url: Api.User }, { errorMessageMode: 'none' });
}

export function getPermCodeAPI() {
  return http.get<GetPermitCodeResult>({ url: Api.GetPermCode });
}

export function doLogoutAPI() {
  return defHttp.get({ url: Api.Logout });
}
