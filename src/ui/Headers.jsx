import styled, { css } from "styled-components";

const Headers = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      margin-bottom: 3.2rem;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
    
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
      margin-bottom: 1.2rem;
    `}
    
  line-height: 1.4;
`;

export default Headers;
