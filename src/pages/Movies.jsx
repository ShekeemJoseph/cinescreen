import styled from "styled-components";
import TitlesPageContent from "../ui/TitlesPageContent";
import { getPageMovies } from "../services/apiGetTitleData";
import { useLoaderData } from "react-router-dom";

const MoviesSection = styled.section`
  max-width: 128rem;
  margin: 0 auto;
`;
function Movies() {
  const pageMovies = useLoaderData();

  return (
    <MoviesSection>
      <TitlesPageContent titles={pageMovies} titleType="Movies" />
    </MoviesSection>
  );
}
export async function loader() {
  const pageMovies = await getPageMovies(24);
  return pageMovies;
}
export default Movies;
