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
}

export const AnalysisConfig = {
  growCard: {
    totalExtent: '当月累计',
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

export const growCardList: GrowCardItem[] = [
  {
    title: '接待量',
    icon: 'visitor-male|svg',
    value: 2000,
    total: 120000,
    totalExtent: '当月累计',
    color: 'green',
    action: '人次/天',
    suffix: '人次',
  },
  {
    title: '收入',
    icon: 'total-sales|svg',
    value: 20000,
    total: 500000,
    totalExtent: '当月累计',
    color: 'blue',
    action: '天',
    prefix: AnalysisConfig.growCard.currencySymbol,
  },
  {
    title: '预收款',
    icon: 'wallet|svg',
    value: 8000,
    total: 120000,
    totalExtent: '当月累计',
    color: 'orange',
    action: '天',
    prefix: AnalysisConfig.growCard.currencySymbol,
  },
  {
    title: '退款',
    icon: 'refund-click|svg',
    value: 5000,
    total: 50000,
    totalExtent: '当月累计',
    color: 'red',
    action: '天',
    prefix: AnalysisConfig.growCard.currencySymbol,
  },
];
