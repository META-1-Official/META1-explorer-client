import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

// import components
import {Table} from '../../../components/Table';
import Loader from '../../../components/Loader/Loader';

// import services
import accountsService from '../../../services/accounts.services';

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const StyledContainer = styled.div`
  display: flex;
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
`;

const BlockWrapper = styled.div`
  margin-top: 38px;
  display: flex;
  width: ${(props) => props.width ?? '100%'};
  flex-direction: column;
  margin-left: 15px;
  margin-right: 15px;
`;

const Authorities = ({accountFullData}) => {
  const [keys, setKeys] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (accountFullData) {
      (async () => {
        const data = await accountsService.getKeysAndAccountsData(
          accountFullData,
        );
        setKeys(data?.keys);
        setAccounts(data?.accounts);
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const key_headers = ['Key', 'Threshold']; // table headers
  const acc_headers = ['Account', 'Threshold']; // table headers

  const owner_key_rows = keys?.owner?.map((key) => {
    return {
      Key: [key.key, 'plainText'],
      Threshold: [key.threshold, 'plainText'],
    };
  });

  const active_key_rows = keys?.active?.map((key) => {
    return {
      Key: [key.key, 'plainText'],
      Threshold: [key.threshold, 'plainText'],
    };
  });

  const memo_key_rows = keys?.memo?.map((key) => {
    return {
      Key: [key, 'plainText'],
      Threshold: ['', 'plainText'],
    };
  });

  const owner_acc_rows = accounts?.owner?.map((acc) => {
    return {
      Account: [acc.account_name, 'plainText'],
      Threshold: [acc.threshold, 'plainText'],
    };
  });

  const active_acc_rows = accounts?.active?.map((acc) => {
    return {
      Account: [acc.account_name, 'plainText'],
      Threshold: [acc.threshold, 'plainText'],
    };
  });

  return (
    <PageWrapper>
      <StyledContainer>
        <BlockWrapper>
          <Label>Owner Keys</Label>
          {owner_key_rows ? (
            <Table headers={key_headers} rows={owner_key_rows}></Table>
          ) : (
            <Loader />
          )}
          {owner_acc_rows?.length !== 0 && (
            <>
              <Label>Owner Accounts</Label>
              {owner_acc_rows ? (
                <Table headers={acc_headers} rows={owner_acc_rows}></Table>
              ) : (
                <Loader />
              )}
            </>
          )}
        </BlockWrapper>
        <BlockWrapper>
          <Label>Active Keys</Label>
          {active_key_rows ? (
            <Table headers={key_headers} rows={active_key_rows}></Table>
          ) : (
            <Loader />
          )}
          {active_acc_rows?.length !== 0 && (
            <>
              <Label>Owner Accounts</Label>
              {active_acc_rows ? (
                <Table headers={acc_headers} rows={active_acc_rows}></Table>
              ) : (
                <Loader />
              )}
            </>
          )}
        </BlockWrapper>
      </StyledContainer>
      <StyledContainer>
        <BlockWrapper>
          <Label>Memo Keys</Label>
          {memo_key_rows ? (
            <Table headers={key_headers} rows={memo_key_rows}></Table>
          ) : (
            <Loader />
          )}
        </BlockWrapper>
      </StyledContainer>
    </PageWrapper>
  );
};

export default Authorities;
