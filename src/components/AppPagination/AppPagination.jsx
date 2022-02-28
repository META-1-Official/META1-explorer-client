import Pagination from '@mui/material/Pagination';

export const AppPagination = ({page, onChange}) => {
  const onPageChange = (_, newPageNumber) => {
    onChange(newPageNumber);
  };

  return (
    <Pagination
      count={10}
      page={page}
      shape="rounded"
      onChange={onPageChange}
    />
  );
};
