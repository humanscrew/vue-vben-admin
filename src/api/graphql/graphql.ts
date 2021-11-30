import { http } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { graphqlParams, graphqlResult } from './model/graphqlModel';

export enum Api {
  Graphql = '/graphql',
}

export const graphqlAPI = (params: graphqlParams, mode: ErrorMessageMode = 'message') => {
  return http.post<graphqlResult>(
    {
      url: Api.Graphql,
      params,
      timeout: 1000 * 60,
    },
    {
      errorMessageMode: mode,
    },
  );
};
