import React from "react";
import Button from "@mui/material/Button";
import { StyledHeader, HeaderNav, HeaderUl, HeaderLi } from "./HeaderStyles";
import { Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  return (
    <div>
      <StyledHeader>
        <HeaderNav>
          <HeaderUl>
            <HeaderLi>
              <h2>FK Trelleborg</h2>
            </HeaderLi>
            <HeaderLi>
              <Button variant="text" component={Link} to="/calendar">
                Kalender
              </Button>
            </HeaderLi>
          </HeaderUl>
        </HeaderNav>
        <Button variant="text" component={Link} to="/logout">
          <LogoutIcon />
        </Button>
      </StyledHeader>
    </div>
  );
};

export default React.memo(Header);
