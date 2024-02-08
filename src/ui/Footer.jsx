import styled from "styled-components";
import { FaFacebookSquare, FaInstagramSquare, FaTwitter } from "react-icons/fa";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { getCurrentYear } from "../utils/helper";

const StyledFooter = styled.footer`
  margin: 0 0 6.4rem;
  padding: 0 1.2rem;
  border-width: 16px 0 0;
  border-style: solid;
  border-image: linear-gradient(
      90deg,
      #6022c3 33%,
      #fdbb2d 0,
      #fdbb2d 67%,
      #e64980 0
    )
    5;
`;
const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 4.8rem 0;
`;
const StyledLinkLogo = styled(Link)`
  &:link svg,
  &:visited svg {
    height: 4.8rem;
    width: auto;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 96rem;
  margin: 0 auto;
  & div {
    justify-self: center;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 2.4rem;
  h3 {
    font-weight: 700;
    font-size: 2.8rem;
  }
  & button {
    background: none;
    border: none;
    &:hover {
      text-decoration: underline;
    }
    &:focus {
      outline: none;
    }
  }

  & img {
    width: auto;
    height: 3.6rem;
    &:hover {
      cursor: pointer;
    }
  }
  & svg {
    height: 2.8rem;
    width: 2.8rem;
  }
  & div {
    display: flex;
    justify-content: center;
    gap: 4.8rem;
    & svg:hover {
      cursor: pointer;
    }
  }
`;
function Footer() {
  return (
    <StyledFooter>
      <LogoContainer>
        <StyledLinkLogo to="/">
          <Logo primaryColor="#fff" secondaryColor="#fbc117" />
        </StyledLinkLogo>
      </LogoContainer>
      <FooterContent>
        <FooterColumn>
          <h3>Overview</h3>
          <button>About</button>
          <button>Help Center</button>
          <button>Careers</button>
          <button>Privacy Policy</button>
          <button>Terms of Use</button>
        </FooterColumn>
        <FooterColumn>
          <h3>Follow Us</h3>
          <div>
            <FaFacebookSquare />
            <FaTwitter />
            <FaInstagramSquare />
          </div>
          <span>&copy; 2018 - {`${getCurrentYear()}`} Cinescreen, Inc.</span>
        </FooterColumn>
        <FooterColumn>
          <h3>Get Our App</h3>
          <img src="../svg/apple-store-logo.svg" alt="apple store logo" />
          <img src="../svg/google-play-badge.svg" alt="google play badge" />
        </FooterColumn>
      </FooterContent>
    </StyledFooter>
  );
}

export default Footer;
