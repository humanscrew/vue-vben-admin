import { http } from '/@/utils/http/axios';
import { GetRouteListResult } from './model/routeModel';

enum Api {
  // GetMenuList = '/getMenuList',
  Route = '/api/routeList',
}

/**
 * @description: Get user menu based on id
 */

// export const getMenuList = () => {
//   return defHttp.get<GetMenuListResult>({ url: Api.GetMenuList });
// };

export const getRouteListAPI = () => {
  return http.get<GetRouteListResult>({ url: Api.Route });
};
