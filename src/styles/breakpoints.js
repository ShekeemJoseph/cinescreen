import { css } from "styled-components";

const breakpoints = {
  xs: "400px", // for small screen mobile
  sm: "600px", // for mobile screen
  md: "900px", // for tablets
  lg: "1100px", // for laptops
  xl: "1440px", // for desktop / monitors
  xxl: "1920px", // for big screens
};

export const media = {
  xs: (...args) => css`
    @media (max-width: ${breakpoints.xs}) {
      ${css(...args)};
    }
  `,
  sm: (...args) => css`
    @media (max-width: ${breakpoints.sm}) {
      ${css(...args)};
    }
  `,
  md: (...args) => css`
    @media (max-width: ${breakpoints.md}) {
      ${css(...args)};
    }
  `,
  lg: (...args) => css`
    @media (max-width: ${breakpoints.lg}) {
      ${css(...args)};
    }
  `,
  xl: (...args) => css`
    @media (max-width: ${breakpoints.xl}) {
      ${css(...args)};
    }
  `,
  xxl: (...args) => css`
    @media (max-width: ${breakpoints.xxl}) {
      ${css(...args)};
    }
  `,
};
