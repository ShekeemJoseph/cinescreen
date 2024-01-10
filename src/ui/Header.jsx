import styled from "styled-components";
import Logo from "./Logo";
import ButtonIcon from "./ButtonIcon";
import { HiBookmark, HiMoon } from "react-icons/hi2";
import ButtonText from "./ButtonText";
import NavButton from "./NavButton";
import { Link } from "react-router-dom";
import SearchTitle from "./SearchTitle";
import { useEffect, useState } from "react";
import { API_KEY } from "../services/apiSearchTitleData";
import SearchModal from "./SearchModal";
const StyledHeader = styled.header`
  padding: 1.5rem 6rem;
  position: relative;
  background-color: var(--color-brand-900);
`;
const HeaderContainer = styled.div`
  max-width: 128rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:link svg,
  &:visited svg {
    height: 3.4rem;
    width: auto;
  }
`;

const StyledLinkLogo = styled(Link)`
  &:link svg,
  &:visited svg {
    height: 3.4rem;
    width: auto;
  }
`;

function Header() {
  const [titles, setTitles] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(
    function () {
      let titlesData;
      async function fetchTitles() {
        try {
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
          );
          const resData = await res.json();
          if (resData.Response === "False") throw new Error("Movie not found");
          titlesData = resData.Search.filter((data) => {
            if (data.Poster !== "N/A") {
              return data;
            } else {
              return null;
            }
          });
          setTitles(titlesData);
        } catch (err) {
          setError(err.message);
        }
      }
      if (query.length < 3) {
        setTitles([]);
        setError("");
        return;
      }
      fetchTitles();
    },
    [query]
  );
  return (
    <StyledHeader>
      <HeaderContainer>
        <StyledLinkLogo to="/">
          <Logo />
        </StyledLinkLogo>
        <NavButton to="/titles/movies">Movies</NavButton>
        <NavButton to="/titles/series">TV Shows</NavButton>
        <SearchTitle query={query} setQuery={setQuery} />
        <NavButton to="/watchlist">
          <HiBookmark /> WatchList
        </NavButton>
        <ButtonText variation="standard">Register</ButtonText>
        <ButtonIcon>
          <HiMoon />
        </ButtonIcon>
      </HeaderContainer>
      {titles.length !== 0 && query.length > 3 && (
        <SearchModal titles={titles} error={error} />
      )}
    </StyledHeader>
  );
}

export default Header;
