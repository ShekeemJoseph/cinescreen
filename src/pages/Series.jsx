import styled from "styled-components";
import { useLoaderData } from "react-router-dom";
import { getPageSeries } from "../services/apiGetTitleData";
import TitleSorting from "../ui/TitleSorting";
import TitleListings from "../ui/TitleListings";
import { media } from "../styles/breakpoints";
import { useState } from "react";
import ListingsFilterModal from "../ui/ListingsFilterModal";

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
const TitlesPageLayout = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 1fr;
  ${media.md`
  grid-template-columns: 1fr;
  `}
`;
function Series() {
  const { total_results, results } = useLoaderData();
  const [modalFilterOpen, setModalFilterOpen] = useState(false);

  function closeFilterModal() {
    setModalFilterOpen(false);
    document.body.style.overflow = "auto";
  }
  function openFilterModal() {
    setModalFilterOpen(true);
    document.body.style.overflow = "hidden";
  }
  return (
    <SeriesSection>
      <StyledHeading>
        <p>Top TV Shows to Watch Right Now</p>
        <p>Find your next TV show to watch. Filter by genre or release year.</p>
      </StyledHeading>
      <TitlesPageLayout>
        {!modalFilterOpen ? (
          <TitleSorting mediaType="series" />
        ) : (
          <ListingsFilterModal mediaType="series" handler={closeFilterModal} />
        )}
        <TitleListings
          initialTitles={results}
          initialTotalResults={total_results}
          mediaType="series"
          modalHandler={openFilterModal}
        />
      </TitlesPageLayout>
    </SeriesSection>
  );
}
export async function loader() {
  const pageSeries = await getPageSeries();
  return pageSeries;
}
export default Series;
