import styled from "styled-components";
import PropTypes from "prop-types";

import { COLORS } from "../../values/colors";

export const StyledHeader = styled.header`
  display: flex;
  position: sticky;
  top: 0px;
  z-index: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  background-color: ${COLORS.white};
  height: 100px;
`;

export const HeaderNav = styled.nav`
  display: flex;
  justify-content: center;
  width. 100%;
`;

export const HeaderUl = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
`;

const StyledLi = styled.li`
  align-self: center;
`;

export const HeaderLi = (props) => {
  HeaderLi.propTypes = {
    children: PropTypes.node,
  };

  return <StyledLi>{props.children}</StyledLi>;
};
