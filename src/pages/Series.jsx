import styled from "styled-components";
import { useLoaderData } from "react-router-dom";
import { getPageSeries } from "../services/apiGetTitleData";
import TitlePageLayout from "../ui/TitlePageLayout";

const SeriesSection = styled.section`
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

function Series() {
  const { total_results, results } = useLoaderData();

  return (
    <SeriesSection>
      <StyledHeading>
        <p>Top TV Shows to Watch Right Now</p>
        <p>Find your next TV show to watch. Filter by genre or release year.</p>
      </StyledHeading>
      <TitlePageLayout
        total_results={total_results}
        results={results}
        mediaType="series"
      />
    </SeriesSection>
  );
}
export async function loader() {
  const pageSeries = await getPageSeries();
  return pageSeries;
}
export default Series;
