import {
  getHomePageMovies,
  getHomePageSeries,
  getNewReleases,
} from "../services/apiTitleData";
import { useLoaderData } from "react-router-dom";
import TitlesLayout from "../ui/TitlesLayout";
import Heading from "../ui/Heading";
import styled from "styled-components";
import Promotion from "../ui/Promotion";

const StyledHome = styled.div`
  display: grid;
  grid-template-rows: auto 1fr 1fr 1fr 1fr;
  row-gap: 6.4rem;
  padding: 4.8rem 2.4rem;
`;
function Home() {
  const { homePageMovies, homePageSeries, newReleases } = useLoaderData();
  console.log(homePageMovies, homePageSeries, newReleases);
  return (
    <StyledHome>
      <Heading />
      <TitlesLayout label="New Releases" titles={newReleases} />
      <Promotion />
      <TitlesLayout label="Movies" titles={homePageMovies.results} />
      <TitlesLayout label="TV Shows" titles={homePageSeries.results} />
    </StyledHome>
  );
}
export async function loader() {
  const homePageMovies = await getHomePageMovies();
  const homePageSeries = await getHomePageSeries();
  const newReleases = await getNewReleases();
  const homePageContent = { homePageMovies, homePageSeries, newReleases };
  return homePageContent;
}
export default Home;
