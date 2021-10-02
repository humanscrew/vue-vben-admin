import { defHttp, http } from '/@/utils/http/axios';
import {
  LoginParams,
  GetRsaResultModel,
  LoginResultModel,
  RegisterParams,
  RegisterResultModel,
  GetUserInfoModel,
  GetPermitCodeModel,
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

export function getDefaultRsaAPI() {
  const userStore = useUserStoreWithOut();
  userStore.setPublicKey(undefined);
  return http.get<GetRsaResultModel>({ url: Api.DefaultRSA }, { errorMessageMode: 'none' });
}

export function registerApi(params: RegisterParams, mode: ErrorMessageMode = 'message') {
  return http.post<RegisterResultModel>(
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
  return http.get<GetUserInfoModel>({ url: Api.User }, { errorMessageMode: 'none' });
}

export function getPermCodeAPI() {
  return http.get<GetPermitCodeModel>({ url: Api.GetPermCode });
}

export function doLogoutAPI() {
  return defHttp.get({ url: Api.Logout });
}
