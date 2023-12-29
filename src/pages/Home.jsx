import styled from "styled-components";
import { getHomePageMovies, getHomePageSeries } from "../services/apiTitleData";
import { useLoaderData } from "react-router-dom";

const StyledHome = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
const Heading = styled.div`
  & h1 {
    font-size: 6.4rem;
    text-transform: uppercase;
    display: inline-block;
    font-weight: 700;
    background-image: linear-gradient(to right, #be4bdb, #ffd43b);
    background-clip: text;
    color: transparent;
  }
  & span {
    font-size: 1.8rem;
  }
`;
function Home() {
  const { homePageMovies, homePageSeries } = useLoaderData();
  console.log(homePageMovies, homePageSeries);
  return (
    <StyledHome>
      <Heading>
        <div>
          <h1>Movies / TV Shows</h1>
        </div>
        <span>Find your next captivating moment</span>
      </Heading>
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
