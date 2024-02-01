import styled from "styled-components";
import TitlesPageContent from "../ui/TitlesPageContent";
import { useLoaderData } from "react-router-dom";
import { getPageSeries } from "../services/apiGetTitleData";

const SeriesSection = styled.section`
  max-width: 128rem;
  margin: 0 auto;
`;
function Series() {
  const pageSeries = useLoaderData();
  return (
    <SeriesSection>
      <TitlesPageContent initialTitles={pageSeries} titleType="Series" />
    </SeriesSection>
  );
}
export async function loader() {
  const pageSeries = await getPageSeries(24);
  return pageSeries;
}
export default Series;
