/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResult {
  userId: string | number;
  token: string;
  accessToken: string;
  refreshToken: string;
  role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoResult {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}

export interface GetRsaResult {
  publicKey: string;
}

export interface RegisterParams {
  username: string;
  password: string;
  mobile: string;
  sms?: string;
}

export interface RegisterResult {
  user: string;
}

export interface PermitCode {
  name: string;
  value: string;
}
export interface GetPermitCodeResult {
  permitCode: PermitCode[];
}
