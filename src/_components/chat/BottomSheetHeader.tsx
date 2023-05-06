import React from "react";
import styled from "@emotion/styled";
import palette from "../../style/color";

const Wrapper = styled.div`
  height: 24px;
  border-top-left-radius: 12px;
  border-bottom-right-radius: 12px;
  position: relative;
  padding-top: 12px;
  padding-bottom: 4px;
`;

const Handle = styled.div`
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background-color: #2a2d37;
  margin: auto;
`;
const Header = () => {
  return (
    <Wrapper>
      <Handle />
    </Wrapper>
  );
};

export default Header;
