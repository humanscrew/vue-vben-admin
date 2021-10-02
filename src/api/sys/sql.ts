import { http } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { SQLParams, SQLResultModel } from './model/sqlModel';

enum Api {
  SQL = '/api/sql',
}

export const executeSqlAPI = (params: SQLParams, mode: ErrorMessageMode = 'modal') => {
  return http.post<SQLResultModel>(
    {
      url: Api.SQL,
      params,
      timeout: 1000 * 30,
    },
    {
      errorMessageMode: mode,
    },
  );
};

export const sqlStatementParams = {
  visitorCount: () => {
    return { sqlStatement: `select * from ticket_laiu8 limit 1` };
  },
};
