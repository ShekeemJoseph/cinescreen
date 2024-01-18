import { Link } from "react-router-dom";
import styled from "styled-components";

const Modal = styled.ul`
  position: absolute;
  padding: 1.2rem 0;
  width: 50rem;
  height: auto;
  color: var(--color-grey-50);
  background-color: var(--color-grey-750);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-lg);
  transition: all 0.3s;
  top: 95%;
  left: 36.5%;
  z-index: 100;
  & li:hover,
  & li:active {
    background-color: var(--color-grey-725);
  }
`;

const ErrorMessage = styled.span`
  display: flex;
  justify-content: center;
`;

const TitleBox = styled.li`
  width: 100%;
  height: 10rem;
  padding: 1.2rem;
  display: flex;
  gap: 2.4rem;
  align-items: center;
  border-bottom: 1px solid var(--color-grey-600);
  & img {
    height: 100%;
  }

  & div {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
`;
export function SearchModal({ titles, error }) {
  return (
    <Modal>
      {!error &&
        titles.map((title) => (
          <Link to="/" key={title.imdbID}>
            <TitleBox>
              <img src={title.Poster} alt={`${title.Title} poster`} />
              <div>
                <span>{title.Title}</span>
                <span>{title.Year}</span>
              </div>
            </TitleBox>
          </Link>
        ))}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Modal>
  );
}

export default SearchModal;