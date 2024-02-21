import styled from "styled-components";
import { getPageMovies } from "../services/apiGetTitleData";
import { useLoaderData } from "react-router-dom";
import TitleSorting from "../ui/TitleSorting";
import TitleListings from "../ui/TitleListings";
import { useState } from "react";
import { titleGenres } from "../utils/helper";

const MoviesSection = styled.section`
  max-width: 128rem;
  margin: 0 auto;
`;
const StyledHeading = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 0.8rem;
  width: 128rem;
  margin: 2.4rem 0;

  & p:first-child {
    font-weight: 600;
    font-size: 3.6rem;
  }
`;
const TitlesPageLayout = styled.div`
  display: grid;
  width: 128rem;
  margin-bottom: 3.6rem;
  grid-template-columns: 0.25fr 1fr;
`;
function Movies() {
  const pageMovies = useLoaderData();
  const [genreList, setGenreList] = useState(titleGenres);

  return (
    <MoviesSection>
      <StyledHeading>
        <p>Top Movies to Watch Right Now</p>
        <p>Find your next Movie to watch. Filter by genre or release year.</p>
      </StyledHeading>
      <TitlesPageLayout>
        <TitleSorting genreList={genreList} setGenreList={setGenreList} />
        <TitleListings
          initialTitles={pageMovies}
          titleType="Movies"
          setGenreList={setGenreList}
        />
      </TitlesPageLayout>
    </MoviesSection>
  );
}
export async function loader() {
  const pageMovies = await getPageMovies(24);
  return pageMovies;
}
export default Movies;
