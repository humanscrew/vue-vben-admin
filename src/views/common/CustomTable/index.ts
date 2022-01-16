import { withInstall } from '/@/utils/index';
import customTable from './src/CustomTable.vue';

export { CustomRender } from './src/components/CustomRender';
export const CustomTable = withInstall(customTable);
