import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SearchModal from "./SearchModal";
import { useGetSearchResults } from "../../hooks/useGetSearchResults";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { media } from "../../styles/breakpoints";
import SearchIconBtn from "./SearchIconBtn";

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
  max-width: 40rem;
  position: relative;
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
  isMagnifyClick,
  setIsMagnifyClicked,
}) {
  const navigate = useNavigate();
  const [titles, setTitles] = useState([]);
  useGetSearchResults(setError, setTitles, query);

  function handleOpenSrchBar() {
    setIsMagnifyClicked(true);
  }
  function handleClose() {
    if (!isMagnifyClick) {
      setIsModalOpen(false);
    }
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
    <SearchBar onClick={handleOpen}>
      <StyledForm onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          type="text"
          placeholder="Search movies / tvshows"
        />
      </StyledForm>
      <SearchIconBtn handler={handleOpenSrchBar}>
        <HiMagnifyingGlass />
      </SearchIconBtn>
      {isModalOpen && titles.length !== 0 && query.length > 3 && (
        <SearchModal
          error={error}
          handler={handleClose}
          open={isModalOpen}
          titles={titles}
          setQuery={setQuery}
        />
      )}
    </SearchBar>
  );
}

export default SearchTitle;
