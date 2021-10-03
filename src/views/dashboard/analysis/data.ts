import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';

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
  // dateTimeFormatter : 'YYYY-MM-DD HH:mm:ss',z
  toDay: { start: '2021-09-15 00:00:00', end: '2021-09-15 23:59:59' },
  toMonth: { start: '2021-09-01 00:00:00', end: '2021-09-30 23:59:59' },
  nextDay: { start: '2021-09-16 00:00:00', end: '2021-09-16 23:59:59' },
};

const todayDate = formatToDateTime(timeStore.toDay.end, 'M月D日');
const nextDayDate = formatToDateTime(timeStore.nextDay.end, 'M月D日');

export const growCardData: GrowCardItem[] = [
  {
    title: '船票接待量',
    icon: 'visitor-male|svg',
    value: 0,
    total: 0,
    totalExtent: '当月累计',
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
    totalExtent: '当月累计',
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
    totalExtent: '累计',
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
    totalExtent: '当月累计',
    color: 'green',
    action: todayDate,
    prefix: AnalysisConfig.growCard.currencySymbol,
    loading: true,
  },
];
