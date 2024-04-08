import { mobileMedia } from "../../styles/breakpoints";
import styled from "styled-components";

const StyledSearchIconBtn = styled.button`
  outline: none;
  border: none;
  background: none;
  ${mobileMedia.sm`
    pointer-events: none;
  `}
  & svg {
    height: 3.2rem;
    width: auto;
    &:focus {
      outline: none;
    }
  }
  &:focus {
    outline: none;
  }
`;
function SearchIconBtn({ children, handler }) {
  return (
    <StyledSearchIconBtn onClick={handler}>{children}</StyledSearchIconBtn>
  );
}

export default SearchIconBtn;
