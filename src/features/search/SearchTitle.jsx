import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledForm = styled.form`
  & input {
    border: none;
    padding: 1.1rem 1.6rem;
    border-radius: var(--border-radius-md);
    width: 40rem;
    transition: all 0.3s;

    &::placeholder {
      color: var(--color-grey-400);
    }
    &:focus {
      outline: none;
      box-shadow: 0 2.4rem 2.4rem rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }
  }
`;

function SearchTitle({ query, setQuery }) {
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/titles/${query}`);
    setQuery("");
  }
  return (
    <StyledForm onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search movies / tvshows"
      />
    </StyledForm>
  );
}

export default SearchTitle;
