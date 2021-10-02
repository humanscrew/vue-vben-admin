import { http } from '/@/utils/http/axios';
import { GetMenuListResultModel } from './model/menuModel';

enum Api {
  // GetMenuList = '/getMenuList',
  Route = '/api/route',
}

/**
 * @description: Get user menu based on id
 */

// export const getMenuList = () => {
//   return defHttp.get<GetMenuListResultModel>({ url: Api.GetMenuList });
// };

export const getRouteListAPI = () => {
  return http.get<GetMenuListResultModel>({ url: Api.Route });
};
