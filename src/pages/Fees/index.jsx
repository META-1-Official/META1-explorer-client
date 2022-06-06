import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Pagination from '@mui/material/Pagination';

// import components
import { Table } from '../../components/Table';
import Loader from '../../components/Loader/Loader';
import { SearchBox } from '../../components/SearchBox';

// import redux
import actions from '../../store/actions';
import selectors from '../../store/selectors';

// import helper
import { formatBalance, operationType } from '../../helpers/utility';

const { fetchFees } = actions;
const { getFees, isFetchingFees } = selectors;

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1315px;
  padding-top: 80px;
  padding-bottom: 40px;
  flex-direction: column;
`;

const StyledContainer = styled.div`
  background: ${(props) => props.theme.palette.background.nearBlack};
  display: flex;
  flex-direction: column;
`;

const StyledPaginationContainer = styled.div`
  background: ${(props) => props.theme.palette.background.nearBlack};
  padding-top: 38px;
  display: flex;
  justify-content: flex-end;

  @media ${(props) => props.theme.bkps.device.mobile} {
    justify-content: center;
  }
`;

const Label = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${(props) => props.theme.bkps.device.mobile} {
    text-align: center;
    flex-direction: column;
  }
`;

const Fees = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  // dispatch
  const dispatch = useDispatch();

  const fetchFeesData = () => dispatch(fetchFees());

  // selectors
  const getFeesData = useSelector(getFees);
  const isFetchingFeesData = useSelector(isFetchingFees);

  // const functions
  const getDisplayData = (o_data) => {
    if (o_data) {
      let basic_fee = 0;
      let fees = [];
      let fee_params = o_data.parameters.current_fees.parameters;
      for (var i = 0; i < fee_params.length; i++) {
        if (fee_params[i][1].fee) {
          basic_fee = fee_params[i][1].fee;
        } else {
          basic_fee = fee_params[i][1].basic_fee;
        }
        var op_type = operationType(fee_params[i][0]);

        const fee = {
          identifier: fee_params[i][0],
          operation: op_type[0],
          type: fee_params[i][0],
          basic_fee: isNaN(formatBalance(basic_fee, 5))
            ? ''
            : formatBalance(basic_fee, 5),
          premium_fee: isNaN(formatBalance(fee_params[i][1].premium_fee, 5))
            ? ''
            : formatBalance(fee_params[i][1].premium_fee, 5),
          price_per_kbyte: isNaN(
            formatBalance(fee_params[i][1].price_per_kbyte, 5),
          )
            ? ''
            : formatBalance(fee_params[i][1].price_per_kbyte, 5),
        };
        fees.push(fee);
      }
      return fees;
    } else {
      return [];
    }
  };

  // vars
  const filteredData = getDisplayData(getFeesData)?.filter((data) =>
    data.operation.includes(query.toUpperCase()),
  );
  const curPageOps = filteredData?.slice((page - 1) * 20, page * 20); // current page markets - 20 markets per page
  const totalPages =
    filteredData?.length === 0 ? 1 : Math.floor(filteredData?.length / 20) + 1; // total number of pages = all markets / marketsPerPage (=20)

  const headers = ['ID', 'Operation', 'Basic', 'Premium', 'Amount']; // table headers
  const rows = curPageOps?.map((fee) => {
    return {
      ID: [fee.identifier, 'plainText'],
      Operation: [fee.type, 'label'],
      Basic: [fee.basic_fee, 'plainText'],
      Premium: [fee.premium_fee, 'plainText'],
      Amount: [fee.price_per_kbyte, 'plainText'],
    };
  });

  useEffect(() => {
    fetchFeesData(); // fetch data
  }, []);

  // handlers
  const onPageChange = (_, newPageNumber) => {
    setPage(newPageNumber);
  };

  const onSearch = (query) => {
    setQuery(query);
  };

  return (
    <PageWrapper>
      <StyledContainer>
        <Label>
          Fees
          <SearchBox placeholder="Search for Fees" onSearch={onSearch} />
        </Label>
        {!isFetchingFeesData && rows ? (
          <Table headers={headers} rows={rows}></Table>
        ) : (
          <Loader />
        )}
      </StyledContainer>
      <StyledPaginationContainer>
        <Pagination
          count={totalPages}
          page={page}
          shape="rounded"
          onChange={onPageChange}
        />
      </StyledPaginationContainer>
    </PageWrapper>
  );
};

export default Fees;
