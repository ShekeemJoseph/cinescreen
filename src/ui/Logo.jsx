import { Link } from "react-router-dom";
import styled from "styled-components";

const StlyedImg = styled.img`
  height: 3.8rem;
  width: auto;
`;
function Logo() {
  return (
    <Link to="/">
      <StlyedImg src="/png/logo-no-background.png" alt="logo" />
    </Link>
  );
}

export default Logo;
