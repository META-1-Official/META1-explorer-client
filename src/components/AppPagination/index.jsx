import {useState} from 'react';

import Pagination from '@mui/material/Pagination';

export const AppPagination = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const onPageChange = (_, newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  return (
    <Pagination
      count={10}
      page={pageNumber}
      shape="rounded"
      onChange={onPageChange}
    />
  );
};
