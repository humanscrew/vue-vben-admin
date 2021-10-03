import { http } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { SQLParams, SQLResultModel, databaseInfo } from './model/sqlModel';
import { dateUtil, formatToDateTime } from '/@/utils/dateUtil';

enum Api {
  SQL = '/api/sql',
}

export const executeSql = (params: SQLParams, mode: ErrorMessageMode = 'modal') => {
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

const dateTimeFormatter = 'YYYY-MM-DD HH:mm:ss';
const handleSqlTime = (startTime: any, endTime: any) => {
  startTime = startTime || dateUtil().startOf('day');
  endTime = endTime || dateUtil().endOf('day');
  startTime = formatToDateTime(startTime, dateTimeFormatter);
  endTime = formatToDateTime(endTime, dateTimeFormatter);
  return { startTime, endTime };
};

export const executeSqlAPI = {
  ticketSale: (
    productType: databaseInfo['productType'],
    start: any,
    end: any,
    columns: string[],
  ) => {
    const { startTime, endTime } = handleSqlTime(start, end);
    const visits = columns.includes('visits') ? ` COUNT( id ) AS visits ` : ``;
    const revenue = columns.includes('revenue') ? ` SUM( ticket_price ) AS revenue ` : ``;
    const columnCondition = visits ? (revenue ? visits + ',' + revenue : visits) : revenue;
    const sqlStatement = `
        SELECT 
          ${columnCondition} 
        FROM ticket_laiu8 
        WHERE 
          product_type = "${productType}" 
          AND ticket_status IN ( "出票成功", "一检", "二检" ) 
          AND DATE_FORMAT( departure_datetime, "%Y-%m-%d %T" ) >= "${startTime}" 
          AND DATE_FORMAT( departure_datetime, "%Y-%m-%d %T" ) <= "${endTime}"
        `;
    // console.log(sqlStatement);
    return executeSql({ sqlStatement });
  },

  advanceSale: (productType: databaseInfo['productType'], start: any, end: any) => {
    const { startTime, endTime } = handleSqlTime(start, end);
    const endCondition = end
      ? ` AND DATE_FORMAT( departure_datetime, "%Y-%m-%d %T" ) <= "${endTime} "`
      : ``;
    const sqlStatement = `
        SELECT 
          COUNT( id ) AS advanceSale 
        FROM ticket_laiu8 
        WHERE 
          product_type = "${productType}" 
          AND ticket_status IN ( "出票成功", "一检", "二检" ) 
          AND DATE_FORMAT( departure_datetime, "%Y-%m-%d %T" ) >= "${startTime}" 
          ${endCondition}
        `;
    return executeSql({ sqlStatement });
  },

  cashFlow: (productType: databaseInfo['productType'], start: any, end: any) => {
    const { startTime, endTime } = handleSqlTime(start, end);
    const endCondition = end
      ? ` AND DATE_FORMAT( create_time, "%Y-%m-%d %T" ) <= "${endTime} "`
      : ``;
    const sqlStatement = `
        SELECT 
          SUM( ticket_price ) AS cashFlow 
        FROM ticket_laiu8 
        WHERE 
          product_type = "${productType}" 
          AND ticket_status IN ( "出票成功", "一检", "二检" ) 
          AND DATE_FORMAT( create_time, "%Y-%m-%d %T" ) >= "${startTime}" 
          ${endCondition}
        `;
    return executeSql({ sqlStatement });
  },
};
