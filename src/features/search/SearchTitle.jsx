import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SearchModal from "./SearchModal";
import { useGetSearchResults } from "../../hooks/useGetSearchResults";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { media } from "../../styles/breakpoints";
import SearchIconBtn from "./SearchIconBtn";
const FormContainer = styled.div`
  max-width: 40rem;
  position: relative;
  width: 100%;
  ${media.md`
  width: auto;
  justify-content: flex-end;
  `}
`;
const StyledForm = styled.form`
  width: 40rem;
  & input {
    border: none;
    &::placeholder {
      color: var(--color-grey-400);
    }
    &:focus {
      outline: none;
    }
  }
  ${media.lg`
    width: 100%;
  `}
  ${media.sm`
    display: none;
  `}
`;
const SearchBar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  padding: 1rem 1.4rem;
`;

function SearchTitle({
  query,
  setQuery,
  error,
  setError,
  isModalOpen,
  setIsModalOpen,
  setIsMagnifyClicked,
}) {
  const [titles, setTitles] = useState([]);
  const navigate = useNavigate();
  useGetSearchResults(setError, setTitles, query);
  function handleOpenSrchBar() {
    setIsMagnifyClicked(true);
  }
  function handleClose() {
    setIsMagnifyClicked(false);
    setIsModalOpen(false);
  }

  function handleOpen() {
    setIsModalOpen(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!query || query.length <= 3 || error) return;
    navigate(`/search/${query}`);
    setQuery("");
  }
  return (
    <FormContainer>
      <SearchBar onClick={handleOpen}>
        <StyledForm onSubmit={handleSubmit}>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.length > 0) {
                setIsMagnifyClicked(true);
              } else {
                setIsMagnifyClicked(false);
              }
            }}
            type="text"
            placeholder="Search movies / tvshows"
          />
        </StyledForm>
        <SearchIconBtn handler={handleOpenSrchBar}>
          <HiMagnifyingGlass />
        </SearchIconBtn>
      </SearchBar>
      {isModalOpen && titles.length !== 0 && query.length > 3 && (
        <SearchModal
          error={error}
          handler={handleClose}
          open={isModalOpen}
          titles={titles}
          setQuery={setQuery}
        />
      )}
    </FormContainer>
  );
}

export default SearchTitle;
