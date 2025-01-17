import { useI18n } from '/@/hooks/web/useI18n';
import { dateUtil, formatToDateTime } from '/@/utils/dateUtil';

const { t } = useI18n();

export interface GrowCardItem {
  icon: string;
  title: string;
  value: number;
  total: number;
  totalExtent?: string;
  color: string;
  action: string;
  prefix?: string;
  suffix?: string;
  loading: boolean;
}

export const AnalysisConfig = {
  growCard: {
    currencySymbol: t('sys.views.dashboard.analysis.currencySymbol'),
  },
  salesProductPie: {
    cardTitle: '产品占比',
  },
  visitRadar: {
    cardTitle: '转化率',
  },
  AgeStructure: {
    cardTitle: '年龄结构',
  },
};

export const timeStore = {
  toDay: {
    start: formatToDateTime(dateUtil().startOf('day')),
    end: formatToDateTime(dateUtil().endOf('day')),
  },
  toMonth: {
    start: formatToDateTime(dateUtil().startOf('month')),
    end: formatToDateTime(dateUtil().endOf('month')),
  },
  nextDay: {
    start: formatToDateTime(dateUtil(dateUtil().add(1, 'day')).startOf('day')),
    end: formatToDateTime(dateUtil(dateUtil().add(1, 'day')).endOf('day')),
  },
  nextMonth: {
    start: formatToDateTime(dateUtil(dateUtil().add(1, 'month')).startOf('day')),
    end: formatToDateTime(dateUtil(dateUtil().add(1, 'month')).endOf('day')),
  },
  lastDay: {
    start: formatToDateTime(dateUtil(dateUtil().add(-1, 'day')).startOf('day')),
    end: formatToDateTime(dateUtil(dateUtil().add(-1, 'day')).endOf('day')),
  },
};

const todayDate = formatToDateTime(timeStore.toDay.end, 'M月D日');
const nextDayDate = formatToDateTime(timeStore.nextDay.end, 'M月D日');
const lastDayDate = formatToDateTime(timeStore.lastDay.end, 'M月D日');

export const growCardData: GrowCardItem[] = [
  {
    title: '接待量',
    icon: 'visitor-male|svg',
    value: 0,
    total: 0,
    totalExtent: '当月接待量',
    color: 'green',
    action: todayDate + '/人次',
    suffix: '',
    loading: true,
  },
  {
    title: '收入',
    icon: 'line-chart|svg',
    value: 0,
    total: 0,
    totalExtent: '当月收入',
    color: 'green',
    action: todayDate,
    prefix: AnalysisConfig.growCard.currencySymbol,
    loading: true,
  },
  {
    title: '预售票',
    icon: 'total-sales|svg',
    value: 0,
    total: 0,
    totalExtent: '累计预售票',
    color: 'orange',
    action: '次日@' + nextDayDate,
    suffix: '张',
    loading: true,
  },
  {
    title: '净收款',
    icon: 'wallet|svg',
    value: 0,
    total: 0,
    totalExtent: '当月净收款',
    color: 'green',
    action: '昨日@' + lastDayDate,
    prefix: AnalysisConfig.growCard.currencySymbol,
    loading: true,
  },
];
