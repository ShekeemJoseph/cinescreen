import styled from "styled-components";

const ModalForm = styled.form`
  padding: 2.4rem 4rem;
  max-width: 45.2rem;
  max-height: 41.4rem;
  overflow: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
`;

export default ModalForm;
