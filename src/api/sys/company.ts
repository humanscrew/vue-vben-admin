import { http } from '/@/utils/http/axios';
import { GetCompanyGroupResultModel } from './model/companyGroupModel';

enum Api {
  CompanyGroup = '/api/companyGroup',
}

export const getCompanyGroupAPI = () => {
  return http.get<GetCompanyGroupResultModel>({ url: Api.CompanyGroup });
};
