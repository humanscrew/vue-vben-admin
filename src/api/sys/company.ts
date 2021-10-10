import { http } from '/@/utils/http/axios';
import { GetCompanyGroupResult } from './model/companyGroupModel';

enum Api {
  CompanyGroup = '/api/companyGroup',
}

export const getCompanyGroupAPI = () => {
  return http.get<GetCompanyGroupResult>({ url: Api.CompanyGroup });
};
