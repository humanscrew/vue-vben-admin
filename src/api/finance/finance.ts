import { http } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { GetBookkeepingTemplateParams, GetBookkeepingTemplateResult } from './model/financeModel';

enum Api {
  BookkeepingTemplate = '/api/bookkeepingTemplate',
}

export const getBookkeepingTemplateAPI = (
  params: GetBookkeepingTemplateParams,
  mode: ErrorMessageMode = 'modal',
) => {
  return http.get<GetBookkeepingTemplateResult>(
    {
      url: Api.BookkeepingTemplate,
      params,
      timeout: 1000 * 5,
    },
    {
      errorMessageMode: mode,
    },
  );
};
