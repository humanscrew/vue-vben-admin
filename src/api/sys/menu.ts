import { http } from '/@/utils/http/axios';
import { GetMenuListResult } from './model/menuModel';

enum Api {
  // GetMenuList = '/getMenuList',
  Route = '/api/route',
}

/**
 * @description: Get user menu based on id
 */

// export const getMenuList = () => {
//   return defHttp.get<GetMenuListResult>({ url: Api.GetMenuList });
// };

export const getRouteListAPI = () => {
  return http.get<GetMenuListResult>({ url: Api.Route });
};
