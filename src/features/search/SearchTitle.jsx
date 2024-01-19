import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SearchModal from "./SearchModal";
import { useGetSearchResults } from "../../hooks/useGetSearchResults";
const FormContainer = styled.div`
  position: relative;
`;
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

function SearchTitle() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [titles, setTitles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useGetSearchResults(setError, setTitles, query);

  function handleClose() {
    setIsModalOpen(false);
  }

  function handleOpen() {
    setIsModalOpen(true);
    if (titles.length !== 0 && query.length > 3) {
      return (
        <SearchModal titles={titles} error={error} handler={handleClose} />
      );
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/search/${query}`);
    setQuery("");
  }
  return (
    <FormContainer onClick={handleOpen}>
      <StyledForm onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search movies / tvshows"
        />
      </StyledForm>
      {titles.length !== 0 && query.length > 3 && (
        <SearchModal
          titles={titles}
          error={error}
          handler={handleClose}
          open={isModalOpen}
        />
      )}
    </FormContainer>
  );
}

export default SearchTitle;
