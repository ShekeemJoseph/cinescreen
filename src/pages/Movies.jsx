import styled from "styled-components";
import { getPageMovies } from "../services/apiGetTitleData";
import { useLoaderData } from "react-router-dom";
import TitlePageLayout from "../ui/TitlePageLayout";

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

function Movies() {
  const { total_results, results } = useLoaderData();

  return (
    <MoviesSection>
      <StyledHeading>
        <p>Top Movies to Watch Right Now</p>
        <p>Find your next Movie to watch. Filter by genre or release year.</p>
      </StyledHeading>
      <TitlePageLayout
        total_results={total_results}
        results={results}
        mediaType="movie"
      />
    </MoviesSection>
  );
}
export async function loader() {
  const pageMovies = await getPageMovies();
  return pageMovies;
}
export default Movies;
