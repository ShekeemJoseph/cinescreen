import { getHomePageMovies, getHomePageSeries } from "../services/apiTitleData";
import { useLoaderData } from "react-router-dom";
import TitlesLayout from "../ui/TitlesLayout";
import Heading from "../ui/Heading";
import styled from "styled-components";

const StyledHome = styled.div`
  padding: 4.8rem 2.4rem;
`;
function Home() {
  const { homePageMovies, homePageSeries } = useLoaderData();
  console.log(homePageMovies, homePageSeries);
  return (
    <StyledHome>
      <Heading />
      <TitlesLayout label="Movies" titles={homePageMovies.results} />
      <TitlesLayout label="TV Shows" titles={homePageSeries.results} />
    </StyledHome>
  );
}
export async function loader() {
  const homePageMovies = await getHomePageMovies();
  const homePageSeries = await getHomePageSeries();
  const homePageContent = { homePageMovies, homePageSeries };
  return homePageContent;
}
export default Home;
