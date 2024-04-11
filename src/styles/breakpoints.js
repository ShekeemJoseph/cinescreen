import { css } from "styled-components";

const breakpoints = {
  xs: "450px", // for small screen mobile
  sm: "600px", // for mobile screen
  smd: "750px", // for small tablets
  md: "950px", // for tablets
  lg: "1150px", // for laptops
  xl: "1440px", // for desktop / monitors
  xxl: "1920px", // for big screens
};

export const mobileMedia = {
  lg: (...args) => css`
    @media (min-width: ${breakpoints.lg}) {
      ${css(...args)};
    }
  `,
  md: (...args) => css`
    @media (min-width: ${breakpoints.md}) {
      ${css(...args)};
    }
  `,
  sm: (...args) => css`
    @media (min-width: ${breakpoints.sm}) {
      ${css(...args)};
    }
  `,
  xs: (...args) => css`
    @media (min-width: ${breakpoints.xs}) {
      ${css(...args)};
    }
  `,
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
  smd: (...args) => css`
    @media (max-width: ${breakpoints.smd}) {
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
