import SearchDropdown from './SearchDropdown.vue';

export const filterDropdown = {
  useSearchDropdown: (api: Function | undefined = undefined) => {
    return (props) => (
      <>
        <SearchDropdown {...props} api={api}></SearchDropdown>
      </>
    );
  },
};
