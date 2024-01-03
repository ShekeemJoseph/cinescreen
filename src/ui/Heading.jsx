import styled from "styled-components";

const StyledHeading = styled.div`
  & h1 {
    font-size: 6.4rem;
    text-transform: uppercase;
    display: inline-block;
    font-weight: 700;
    background-image: linear-gradient(to right, #be4bdb, #ffd43b);
    background-clip: text;
    color: transparent;
  }
  & span {
    font-size: 1.8rem;
  }
`;
function Heading() {
  return (
    <StyledHeading>
      <div>
        <h1>Movies / TV Shows</h1>
      </div>
      <span>Find your next captivating moment</span>
    </StyledHeading>
  );
}

export default Heading;
