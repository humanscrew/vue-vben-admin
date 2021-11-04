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
  // dateTimeFormatter : 'YYYY-MM-DD HH:mm:ss',
  toDay: { start: dateUtil().startOf('day'), end: dateUtil().endOf('day') },
  toMonth: { start: dateUtil().startOf('month'), end: dateUtil().endOf('month') },
  nextDay: {
    start: dateUtil(dateUtil().add(1, 'day')).startOf('day'),
    end: dateUtil(dateUtil().add(1, 'day')).endOf('day'),
  },
};

const todayDate = formatToDateTime(timeStore.toDay.end, 'M月D日');
const nextDayDate = formatToDateTime(timeStore.nextDay.end, 'M月D日');

export const growCardData: GrowCardItem[] = [
  {
    title: '船票接待量',
    icon: 'visitor-male|svg',
    value: 0,
    total: 0,
    totalExtent: '当月累计接待量',
    color: 'green',
    action: todayDate,
    suffix: '人次',
    loading: true,
  },
  {
    title: '收入',
    icon: 'line-chart|svg',
    value: 0,
    total: 0,
    totalExtent: '当月累计收入',
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
    totalExtent: '当月累计净收款',
    color: 'green',
    action: todayDate,
    prefix: AnalysisConfig.growCard.currencySymbol,
    loading: true,
  },
];
