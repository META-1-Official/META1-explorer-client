import React from 'react';
import * as styled from './BlockWrapper.styles';

const BlockWrapper = ({ children, className, width }) => {
  return (
    <styled.BlockWrapper className={className} width={width}>
      {children}
    </styled.BlockWrapper>
  );
};

export default BlockWrapper;
