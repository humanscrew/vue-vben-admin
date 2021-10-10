import { http } from '/@/utils/http/axios';
import { GetBookkeepingTemplateResult } from './model/finance';

enum Api {
  BookkeepingTemplate = '/api/companyGroup',
}

export const getBookkeepingTemplate = () => {
  return http.get<GetBookkeepingTemplateResult>({ url: Api.BookkeepingTemplate });
};
