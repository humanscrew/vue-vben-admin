/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs';
import { isNullOrUnDef } from '/@/utils/is';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD ';

export function formatToDateTime(date: dayjs.ConfigType, format = DATE_TIME_FORMAT): string {
  if (isNullOrUnDef(date)) {
    return '';
  }
  return dayjs(date).format(format);
}

export function formatToDate(date: dayjs.ConfigType, format = DATE_FORMAT): string {
  if (isNullOrUnDef(date)) {
    return '';
  }
  return dayjs(date).format(format);
}

export const dateUtil = dayjs;
