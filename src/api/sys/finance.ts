import { http } from '/@/utils/http/axios';
import { GetBookkeepingTemplateResult } from './model/finance';

enum Api {
  BookkeepingTemplate = '/api/bookkeepingTemplate',
}

export const getBookkeepingTemplateAPI = () => {
  return http.get<GetBookkeepingTemplateResult>({ url: Api.BookkeepingTemplate });
};
