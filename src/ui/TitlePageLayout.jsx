import styled from "styled-components";
import { media } from "../styles/breakpoints";
import { useState } from "react";
import TitleSorting from "./TitleSorting";
import MobileTitleSorting from "./MobileTitleSorting";
import TitleListings from "./TitleListings";

const StyledTitlesPageLayout = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 1fr;
  ${media.md`
  grid-template-columns: 1fr;
  `}
`;

function TitlePageLayout({ results, total_results, mediaType }) {
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
    <StyledTitlesPageLayout>
      {!modalFilterOpen ? (
        <TitleSorting mediaType={mediaType} />
      ) : (
        <MobileTitleSorting mediaType={mediaType} handler={closeFilterModal} />
      )}
      <TitleListings
        initialTitles={results}
        initialTotalResults={total_results}
        mediaType={mediaType}
        modalHandler={openFilterModal}
      />
    </StyledTitlesPageLayout>
  );
}

export default TitlePageLayout;
