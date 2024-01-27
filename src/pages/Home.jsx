import {
  getPageMovies,
  getPageSeries,
  getNewReleases,
} from "../services/apiGetTitleData";
import { useLoaderData } from "react-router-dom";
import TitlesCarousel from "../ui/TitlesCarousel";
import Heading from "../ui/Heading";
import styled from "styled-components";
import Promotion from "../ui/Promotion";
const HomeSection = styled.section`
  max-width: 128rem;
  margin: 2.4rem auto;
`;
const StyledHome = styled.div`
  display: grid;
  grid-template-rows: auto 1fr 1fr 1fr 1fr;
  row-gap: 6.4rem;
  padding: 4.8rem 2.4rem;
`;
function Home() {
  const { homePageMovies, homePageSeries, newReleases } = useLoaderData();
  return (
    <HomeSection>
      <StyledHome>
        <Heading />
        <TitlesCarousel
          label="New Releases"
          browseContent={false}
          titles={newReleases}
        />
        <Promotion />
        <TitlesCarousel
          label="Movies"
          browseContent={true}
          titles={homePageMovies}
        />
        <TitlesCarousel
          label="TV Shows"
          browseContent={true}
          titles={homePageSeries}
        />
      </StyledHome>
    </HomeSection>
  );
}
export async function loader() {
  const homePageMovies = await getPageMovies(15);
  const homePageSeries = await getPageSeries(15);
  const newReleases = await getNewReleases();
  const homePageContent = { homePageMovies, homePageSeries, newReleases };
  return homePageContent;
}
export default Home;
