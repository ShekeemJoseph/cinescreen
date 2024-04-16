import { HiMoon, HiSun } from "react-icons/hi2";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { media } from "../styles/breakpoints";
import { createPortal } from "react-dom";
import Logo from "./Logo";
import { useRef } from "react";
import { useDarkMode } from "../features/context/DarkModeContext";
const Navigation = styled.div`
  #navi-toggle:checked ~ div {
    transform: scale(80);
  }
  #navi-toggle:checked ~ nav {
    opacity: 1;
    width: 100%;
  }

  #navi-toggle:checked + label span {
    background-color: transparent;
  }
  #navi-toggle:checked + label span::before {
    top: 0;
    transform: rotate(135deg);
  }
  #navi-toggle:checked + label span::after {
    top: 0;
    transform: rotate(-135deg);
  }

  display: none;
  ${media.md`
    display: block;
  `}
`;
const NavCheckbox = styled.input`
  display: none;
`;
const NavButton = styled.label`
  background-color: var(--color-grey-0);
  height: 5rem;
  width: 5rem;
  position: fixed;
  top: 1.7rem;
  left: 2rem;
  border-radius: 50%;
  z-index: 1500;
  box-shadow: var(--shadow-md);
  text-align: center;
`;

const NavBackground = styled.div`
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  position: fixed;
  top: 2.2rem;
  left: 2.5rem;
  background-image: radial-gradient(#be4bdb, #ffd43b);
  z-index: 500;
  transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);
`;
const NavigationNav = styled.nav`
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  opacity: 0;
  width: 0;
  transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
`;
const NavigationList = styled.ul`
  height: 100%;
  overflow: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  list-style: none;
  width: 100%;
`;
const StyledLinkLogo = styled(Link)`
  &:link svg,
  &:visited svg {
    ${media.xs`
    height: 6.4rem;
    `}
    height: 5.8rem;
    width: auto;
  }
`;
const NavDarkModeBtn = styled.button`
  background: none;
  border: none;
  ${media.xs`
    font-size: 4.2rem;
    `}
  font-size: 3.4rem;
  font-weight: 300;
  padding: 1rem 2rem;
  color: var(--color-grey-0);
  & div {
    display: flex;
    gap: 1.2rem;
    align-items: center;
  }
  &:focus {
    outline: none;
  }
`;

const NavigationItem = styled.li``;

const NavigationLink = styled(NavLink)`
  &:link,
  &:visited {
    display: inline-block;
    ${media.xs`
    font-size: 4.2rem;
    `}
    font-size: 3.4rem;
    font-weight: 300;
    padding: 1rem 2rem;
    color: var(--color-grey-0);
    text-decoration: none;
    text-transform: uppercase;
    background-image: linear-gradient(
      120deg,
      transparent 0%,
      transparent 50%,
      var(--color-grey-0) 50%
    );
    background-size: 250%;
    transition: all 0.4s;
  }
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    background-position: 100%;
    transform: translateX(1rem);
    & span {
      background-image: linear-gradient(to bottom left, #be4bdb, #ffd43b);
      background-clip: text;
      color: transparent;
    }
  }
`;
const NavIcon = styled.span`
  position: relative;
  margin-top: 2.5rem;
  &,
  &::before,
  &::after {
    width: 3rem;
    height: 2px;
    background-color: var(--color-grey-700);
    display: inline-block;
  }
  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    transition: all 0.2s;
  }
  &::before {
    top: -0.8rem;
  }
  &::after {
    top: 0.8rem;
  }
`;
function MobileNavgation() {
  const ref = useRef();
  function removeChecked() {
    ref.current.checked = false;
  }
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return createPortal(
    <Navigation>
      <NavCheckbox ref={ref} type="checkbox" id="navi-toggle" />
      <NavButton for="navi-toggle">
        <NavIcon>&nbsp;</NavIcon>
      </NavButton>
      <NavBackground className="nav-background">&nbsp;</NavBackground>
      <NavigationNav>
        <NavigationList>
          <NavigationItem>
            <StyledLinkLogo onClick={removeChecked} to="/">
              <Logo />
            </StyledLinkLogo>
          </NavigationItem>
          <NavigationItem>
            <NavigationLink onClick={removeChecked} to="/movie">
              <span>Movies</span>
            </NavigationLink>
          </NavigationItem>
          <NavigationItem>
            <NavigationLink onClick={removeChecked} to="/tv">
              <span>TV Shows</span>
            </NavigationLink>
          </NavigationItem>
          <NavigationItem>
            <NavDarkModeBtn
              onClick={() => {
                toggleDarkMode();
                removeChecked();
              }}
            >
              {isDarkMode ? (
                <div>
                  <HiMoon /> <span>Dark Mode</span>
                </div>
              ) : (
                <div>
                  <HiSun /> <span>Light Mode</span>
                </div>
              )}
            </NavDarkModeBtn>
          </NavigationItem>
        </NavigationList>
      </NavigationNav>
    </Navigation>,
    document.body
  );
}

export default MobileNavgation;
