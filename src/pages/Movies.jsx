import styled from "styled-components";
import { getPageMovies } from "../services/apiGetTitleData";
import { useLoaderData } from "react-router-dom";
import TitleSorting from "../ui/TitleSorting";
import TitleListings from "../ui/TitleListings";

const MoviesSection = styled.section`
  max-width: 128rem;
  margin: 0 auto;
  padding: 2.4rem;
`;
const StyledHeading = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 0.8rem;
  width: 128rem;

  & p:first-child {
    font-weight: 600;
    font-size: 3.6rem;
  }
`;
const TitlesPageLayout = styled.div`
  display: grid;
  width: 128rem;
  grid-template-columns: 0.25fr 1fr;
`;
function Movies() {
  const { total_results, results } = useLoaderData();
  return (
    <MoviesSection>
      <StyledHeading>
        <p>Top Movies to Watch Right Now</p>
        <p>Find your next Movie to watch. Filter by genre or release year.</p>
      </StyledHeading>
      <TitlesPageLayout>
        <TitleSorting mediaType="movie" />
        <TitleListings
          initialTitles={results}
          initialTotalResults={total_results}
          mediaType="movie"
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
