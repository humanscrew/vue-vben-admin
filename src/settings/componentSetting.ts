// Used to configure the general configuration of some components without modifying the components

import type { SorterResult } from '../components/Table';
import { OrderEnum } from '/@/enums/tableEnum';

export default {
  // basic-table setting
  table: {
    // Form interface request general configuration
    // support xxx.xxx.xxx
    fetchSetting: {
      // The field name of the current page passed to the background
      pageField: 'page',
      // The number field name of each page displayed in the background
      sizeField: 'per_page',
      // Field name of the form data returned by the interface
      listField: 'result',
      // Total number of tables returned by the interface field name
      totalField: 'total',
    },
    // Number of pages that can be selected
    pageSizeOptions: ['10', '50', '80', '100'],
    // Default display quantity on one page
    defaultPageSize: 50,
    // Custom general sort function
    defaultSortFn: (sortInfo: SorterResult) => {
      const { field, order } = sortInfo;
      const orderType = OrderEnum[order];
      return {
        sorter: [{ field, type: orderType }],
      };
    },
    // Custom general filter function
    defaultFilterFn: (filters: Partial<Recordable<string[]>>) => {
      const filterIn = Object.keys(filters).map((key) => {
        return {
          field: key,
          values: filters[key],
        };
      });
      return { filterIn };
    },
  },
  // scrollbar setting
  scrollbar: {
    // Whether to use native scroll bar
    // After opening, the menu, modal, drawer will change the pop-up scroll bar to native
    native: false,
  },
};
