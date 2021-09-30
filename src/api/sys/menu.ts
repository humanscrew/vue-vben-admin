import { http } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
  GetMenuList = '/getMenuList',
  Route = '/api/route',
}

/**
 * @description: Get user menu based on id
 */

// export const getMenuList = () => {
//   return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
// };

export const getRouteList = () => {
  return http.get<getMenuListResultModel>({ url: Api.Route });
};
