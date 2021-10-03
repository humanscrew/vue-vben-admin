import { useI18n } from '/@/hooks/web/useI18n';

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

export const growCardData: GrowCardItem[] = [
  {
    title: '船票接待量',
    icon: 'visitor-male|svg',
    value: 0,
    total: 0,
    totalExtent: '当月累计',
    color: 'green',
    action: '人次/天',
    suffix: '人次',
    loading: true,
  },
  {
    title: '收入',
    icon: 'line-chart|svg',
    value: 0,
    total: 0,
    totalExtent: '当月累计',
    color: 'blue',
    action: '天',
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
    action: '次日',
    suffix: '张',
    loading: true,
  },
  {
    title: '净收款',
    icon: 'wallet|svg',
    value: 0,
    total: 0,
    totalExtent: '当月累计',
    color: 'purple',
    action: '天',
    prefix: AnalysisConfig.growCard.currencySymbol,
    loading: true,
  },
];
