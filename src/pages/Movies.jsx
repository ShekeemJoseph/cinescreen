import styled from "styled-components";
import { getPageMovies } from "../services/apiGetTitleData";
import { useLoaderData } from "react-router-dom";
import TitleSorting from "../ui/TitleSorting";
import TitleListings from "../ui/TitleListings";
import { media } from "../styles/breakpoints";
import ListingsFilterModal from "../ui/ListingsFilterModal";
import { useState } from "react";

const MoviesSection = styled.section`
  max-width: 128rem;
  margin: 0 auto;
  padding: 2.4rem;
`;
const StyledHeading = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 3rem;
  & p:first-child {
    font-weight: 600;
    font-size: 3.6rem;
  }
`;
const TitlesPageLayout = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 1fr;
  ${media.md`
  grid-template-columns: 1fr;
  `}
`;
function Movies() {
  const { total_results, results } = useLoaderData();
  const [modalFilterOpen, setModalFilterOpen] = useState(false);

  function closeFilterModal() {
    setModalFilterOpen(false);
    document.body.style.overflow = "auto";
  }
  function openFilterModal() {
    setModalFilterOpen(true);
    document.body.style.overflow = "hidden";
  }
  return (
    <MoviesSection>
      <StyledHeading>
        <p>Top Movies to Watch Right Now</p>
        <p>Find your next Movie to watch. Filter by genre or release year.</p>
      </StyledHeading>
      <TitlesPageLayout>
        {!modalFilterOpen ? (
          <TitleSorting mediaType="movie" />
        ) : (
          <ListingsFilterModal mediaType="movie" handler={closeFilterModal} />
        )}
        <TitleListings
          initialTitles={results}
          initialTotalResults={total_results}
          mediaType="movie"
          modalHandler={openFilterModal}
        />
      </TitlesPageLayout>
    </MoviesSection>
  );
}
export async function loader() {
  const pageMovies = await getPageMovies();
  return pageMovies;
}
export default Movies;
