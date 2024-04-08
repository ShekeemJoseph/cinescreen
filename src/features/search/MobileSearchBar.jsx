import { HiXMark } from "react-icons/hi2";
import SearchIconBtn from "./SearchIconBtn";
import { useNavigate } from "react-router-dom";
import { mobileMedia } from "../../styles/breakpoints";
import styled from "styled-components";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const SearchBar = styled.div`
  width: 100%;
  top: 50%;
  left: 50%;
  height: 8.8rem;
  z-index: 2000;
  display: flex;
  gap: 1.2rem;
  ${mobileMedia.sm`
    display: none;
  `}
  position: absolute;
  align-items: center;
  padding: 1.5rem 2rem;
  justify-content: space-between;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-100);
`;
const MobileStyledForm = styled.form`
  width: 100%;
  & input {
    width: 100%;
    background-color: var(--color-grey-100);
    border: none;
    font-size: 2rem;
    &::placeholder {
      font-size: 2rem;
      color: var(--color-grey-400);
    }
    &:focus {
      outline: none;
    }
  }
`;

function MobileSearchBar({
  error,
  query,
  setQuery,
  setIsMagnifyClicked,
  setIsModalOpen,
}) {
  const navigate = useNavigate();
  const ref = useOutsideClick(handleCloseSrchBar);

  function handleCloseSrchBar() {
    setIsMagnifyClicked(false);
    setIsModalOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!query || query.length <= 3 || error) return;
    navigate(`/search/${query}`);
    setQuery("");
  }
  return (
    <SearchBar>
      <MobileStyledForm
        onSubmit={handleSubmit}
        onClick={() => setIsModalOpen(true)}
        ref={ref}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search movies / tvshows"
        />
      </MobileStyledForm>
      <SearchIconBtn handler={handleCloseSrchBar}>
        <HiXMark />
      </SearchIconBtn>
    </SearchBar>
  );
}

export default MobileSearchBar;
