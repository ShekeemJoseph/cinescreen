import { useLoaderData, useParams } from "react-router-dom";
import { getTitle } from "../services/apiSearchTitleData";
import styled from "styled-components";
import { getRelatedGenre } from "../services/apiGetTitleData";
import {
  TITLE_MOVIE_GENRES,
  TITLE_TV_GENRES,
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
  const { title, relatedGenre } = useLoaderData();
  return (
    <>
      <Container>
        <TitleSection>
          <TitleBackdrop imgurl={`${title.Poster}`}>
            <TitleOverlay />
            <TitleContent title={title} />
          </TitleBackdrop>
        </TitleSection>
      </Container>
      {relatedGenre.length >= 5 && (
        <TitlesCarouselContainer>
          <TitlesCarousel
            label="Of Related Genres"
            mediaType={title.Type}
            browseContent={false}
            titles={relatedGenre}
          />
        </TitlesCarouselContainer>
      )}
    </>
  );
}
export async function loader({ params }) {
  let genreMovieId;
  let genreTvId;
  const title = await getTitle(params.titleId);
  if (title.Type === "movie") {
    genreMovieId = TITLE_MOVIE_GENRES.find(
      (genre) => genre.name === splitGenre(title.Genre)[0]
    ).id;
  } else if (title.Type === "series") {
    genreTvId = TITLE_TV_GENRES.find(
      (genre) => genre.name === splitGenre(title.Genre)[0]
    ).id;
  }
  const relatedGenre = await getRelatedGenre(
    genreMovieId ? genreMovieId : genreTvId,
    +title.Year.slice(0, 4),
    title.Type
  );
  const titleObj = { title, relatedGenre };
  return titleObj;
}
export default Title;
