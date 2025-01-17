import { http } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { ClickhouseParams, ClickhouseResult, databaseInfo } from './model/clickhouseModel';
import { dateUtil, formatToDateTime } from '/@/utils/dateUtil';

enum Api {
  Clickhouse = '/api/clickhouse',
}

export const executeClickhouse = (params: ClickhouseParams, mode: ErrorMessageMode = 'modal') => {
  return http.post<ClickhouseResult>(
    {
      url: Api.Clickhouse,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
};

const dateTimeFormatter = 'YYYY-MM-DD HH:mm:ss';
const handleDateTime = (startTime: any, endTime: any) => {
  startTime = startTime || dateUtil().startOf('day');
  endTime = endTime || dateUtil().endOf('day');
  startTime = formatToDateTime(startTime, dateTimeFormatter);
  endTime = formatToDateTime(endTime, dateTimeFormatter);
  return { startTime, endTime };
};

export const executeClickhouseAPI = {
  ticketSale: (
    productType: databaseInfo['productType'],
    start: any,
    end: any,
    columns: string[] = ['visits', 'revenue'],
    groupBys: string[] = [],
  ) => {
    const { startTime, endTime } = handleDateTime(start, end);
    const visits = columns.includes('visits') ? ` COUNT( id ) AS visits, ` : ``;
    const revenue = columns.includes('revenue') ? ` SUM( ticket_price ) AS revenue, ` : ``;

    let date = '';
    let groupBy = '';
    if (groupBys.includes('departure_datetime')) {
      date = ` formatDateTime( departure_datetime, '%d' ) AS date, `;
      groupBy = ` GROUP BY date ORDER BY date `;
    }

    const str = date + visits + revenue;
    const columnCondition = str.substring(0, str.lastIndexOf(',')) + ' ';
    const statement = `
        SELECT 
          ${columnCondition} 
        FROM westhide.ticket_laiu8 
        WHERE 
          product_type = '${productType}' 
          AND ticket_status IN ( '出票成功', '一检', '二检' ) 
          AND departure_datetime >= '${startTime}' 
          AND departure_datetime <= '${endTime}' 
          ${groupBy}
        `;
    return executeClickhouse({ statement });
  },

  advanceSale: (productType: databaseInfo['productType'], start: any, end: any) => {
    const { startTime, endTime } = handleDateTime(start, end);
    const endCondition = end ? ` AND departure_datetime <= '${endTime}' ` : ``;
    const statement = `
        SELECT 
          COUNT( id ) AS advanceSale 
        FROM westhide.ticket_laiu8 
        WHERE 
          product_type = '${productType}' 
          AND ticket_status IN ( '出票成功', '一检', '二检' ) 
          AND departure_datetime >= '${startTime}' 
          ${endCondition}
        `;
    return executeClickhouse({ statement });
  },

  cashFlow: (productType: databaseInfo['productType'], start: any, end: any) => {
    const { startTime, endTime } = handleDateTime(start, end);
    const endCondition = end ? ` AND create_time <= '${endTime}' ` : ``;
    const statement = `
        SELECT 
          SUM( ticket_price ) AS cashFlow 
        FROM westhide.ticket_laiu8 
        WHERE 
          product_type = '${productType}' 
          AND pay_id IS NOT NULL 
          AND create_time >= '${startTime}' 
          ${endCondition}
        `;
    return executeClickhouse({ statement });
  },
};
