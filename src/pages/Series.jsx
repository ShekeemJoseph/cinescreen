import styled from "styled-components";
import { useLoaderData } from "react-router-dom";
import { getPageSeries } from "../services/apiGetTitleData";
import TitleSorting from "../ui/TitleSorting";
import TitleListings from "../ui/TitleListings";

const SeriesSection = styled.section`
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
function Series() {
  const pageSeries = useLoaderData();

  return (
    <SeriesSection>
      <StyledHeading>
        <p>Top TV Shows to Watch Right Now</p>
        <p>Find your next TV show to watch. Filter by genre or release year.</p>
      </StyledHeading>
      <TitlesPageLayout>
        <TitleSorting />
        <TitleListings initialTitles={pageSeries} titleType="Series" />
      </TitlesPageLayout>
    </SeriesSection>
  );
}
export async function loader() {
  const pageSeries = await getPageSeries(24);
  return pageSeries;
}
export default Series;
