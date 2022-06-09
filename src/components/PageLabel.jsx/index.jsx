import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Label = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px !important;
  line-height: 30px;
  margin-bottom: 30px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${(props) => props.theme.bkps.device.mobile} {
    text-align: center;
    flex-direction: column;
  }
`;

function PageLabel({ children }) {
  return <Label>{children}</Label>;
}

export default PageLabel;
