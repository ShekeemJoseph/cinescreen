import {
  getPageMovies,
  getPageSeries,
  getTrending,
} from "../services/apiGetTitleData";
import { useLoaderData } from "react-router-dom";
import TitlesCarousel from "../ui/TitlesCarousel";
import Heading from "../ui/Heading";
import styled from "styled-components";
import Promotion from "../ui/Promotion";
import { media } from "../styles/breakpoints";

const HomeSection = styled.section`
  max-width: 128rem;
  margin: 0 auto;
  padding: 4.8rem 2.4rem;
`;
const StyledHome = styled.div`
  display: grid;
  grid-template-rows: auto 1fr 1fr 1fr 1fr;
  row-gap: 6.4rem;

  ${media.md`
  grid-template-rows: auto 1fr 0.25fr 1fr 1fr;
  `}
`;
function Home() {
  const {
    homePageMovies: { results: MovieResults },
    homePageSeries: { results: TvResults },
    trending,
  } = useLoaderData();
  return (
    <HomeSection>
      <StyledHome>
        <Heading />
        <TitlesCarousel
          label="Trending"
          browseContent={false}
          titles={trending}
        />
        <Promotion />
        <TitlesCarousel
          label="Movies"
          mediaType="movie"
          browseContent={true}
          titles={MovieResults}
        />
        <TitlesCarousel
          label="TV Shows"
          mediaType="series"
          browseContent={true}
          titles={TvResults}
        />
      </StyledHome>
    </HomeSection>
  );
}
export async function loader() {
  const homePageMovies = await getPageMovies();
  const homePageSeries = await getPageSeries();
  const trending = await getTrending();
  const homePageContent = {
    homePageMovies,
    homePageSeries,
    trending,
  };
  return homePageContent;
}
export default Home;
