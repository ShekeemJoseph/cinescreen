import { useLoaderData } from "react-router-dom";
import { getTitle } from "../services/apiSearchTitleData";
import styled from "styled-components";
import { getRelatedGenre } from "../services/apiGetTitleData";
import {
  TITLE_MOVIE_GENRES,
  TITLE_TV_GENRES,
  getTitleGenreId,
  splitGenre,
} from "../utils/helper";
import TitlesCarousel from "../ui/TitlesCarousel";
import TitleContent from "../ui/TitleContent";

const TitleSection = styled.section`
  max-width: 128rem;
  margin: 0 auto;
`;
const TitlesCarouselContainer = styled.section`
  max-width: 128rem;
  margin: 3.6rem auto;
`;
const Container = styled.div`
  background-color: #1f1f1f;
`;

const TitleOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backdrop-filter: blur(50px) saturate(100%);
`;
const TitleBackdrop = styled.div`
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.imgurl});
  position: relative;
`;

function Title() {
  const { selectedTitle, relatedGenre } = useLoaderData();
  const filteredRelatedGenre = relatedGenre.filter(
    (title) => title.original_title !== selectedTitle.Title
  );
  return (
    <>
      <Container>
        <TitleSection>
          <TitleBackdrop imgurl={`${selectedTitle.Poster}`}>
            <TitleOverlay />
            <TitleContent title={selectedTitle} />
          </TitleBackdrop>
        </TitleSection>
      </Container>
      {filteredRelatedGenre.length >= 5 && (
        <TitlesCarouselContainer>
          <TitlesCarousel
            label="Of Related Genres"
            mediaType={selectedTitle.Type}
            browseContent={false}
            titles={filteredRelatedGenre}
          />
        </TitlesCarouselContainer>
      )}
    </>
  );
}
export async function loader(titleId, mediaType) {
  let genreMovieId;
  let genreTvId;

  const selectedTitle = await getTitle(titleId, mediaType);

  if (selectedTitle.Type === "movie") {
    genreMovieId = getTitleGenreId(
      splitGenre(selectedTitle.Genre)[0],
      TITLE_MOVIE_GENRES
    );
  } else if (selectedTitle.Type === "series") {
    genreTvId = getTitleGenreId(
      splitGenre(selectedTitle.Genre)[0],
      TITLE_TV_GENRES
    );
  }
  const relatedGenre = await getRelatedGenre(
    genreMovieId ? genreMovieId : genreTvId,
    +selectedTitle.Year.slice(0, 4),
    selectedTitle.Type
  );

  const titleObj = { selectedTitle, relatedGenre };
  return titleObj;
}
export default Title;
