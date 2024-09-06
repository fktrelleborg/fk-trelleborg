import React from "react";

import Button from "@mui/material/Button";

import { StyledHeader, HeaderNav, HeaderUl, HeaderLi } from "./HeaderStyles";

const Header = () => {
  return (
    <StyledHeader>
      <HeaderNav>
        <HeaderUl>
          <HeaderLi>
            <h2>FK Trelleborg</h2>
          </HeaderLi>
          <HeaderLi>
            <Button variant="text">Kalender</Button>
          </HeaderLi>
          <HeaderLi>
            <Button variant="text">Login/Logga ut...</Button>
          </HeaderLi>
        </HeaderUl>
      </HeaderNav>
    </StyledHeader>
  );
};

export default React.memo(Header);
