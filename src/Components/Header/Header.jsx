import React from "react";
import Button from "@mui/material/Button";
import { StyledHeader, HeaderNav, HeaderUl, HeaderLi } from "./HeaderStyles";
import { Link } from "react-router-dom";
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
              <Button variant="text">Kalender</Button>
            </HeaderLi>
            <HeaderLi>
              <Link end to={"/logout"}>
                Logout
              </Link>
            </HeaderLi>
          </HeaderUl>
        </HeaderNav>
      </StyledHeader>
    </div>
  );
};

export default React.memo(Header);
