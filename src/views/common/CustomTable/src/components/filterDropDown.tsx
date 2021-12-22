import CustomFilterDropdown from './CustomFilterDropdown.vue';

export const filterDropdown = {
  useSearchDropdown: (api: Function) => {
    return (props) => (
      <>
        <CustomFilterDropdown {...props} api={api}></CustomFilterDropdown>
      </>
    );
  },
};
