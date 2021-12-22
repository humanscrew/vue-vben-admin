import { withInstall } from '/@/utils/index';
import customTable from './src/CustomTable.vue';
import { customRender } from './src/components/customRender';
import { filterIcon } from './src/components/filterIcon';
import { filterDropdown } from './src/components/filterDropDown';

export const CustomTable = withInstall(customTable);
export const CustomRender = customRender;
export const FilterIcon = filterIcon;
export const FilterDropdown = filterDropdown;
