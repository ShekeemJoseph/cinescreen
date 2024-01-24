import { Link, useLoaderData } from "react-router-dom";
import { getTitle } from "../services/apiSearchTitleData";
import styled, { css } from "styled-components";
import { HiOutlineStar, HiPlus, HiStar } from "react-icons/hi2";
import ButtonWatchList from "../ui/ButtonWatchList";
import { getRelatedGenre } from "../services/apiGetTitleData";
import { checkMetascore, splitGenre } from "../utils/helper";
import TitlesCarousel from "../ui/TitlesCarousel";

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
const StyledTitle = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  padding: 3.6rem;
  row-gap: 2.4rem;
  color: var(--color-grey-0);
  height: 100%;
  background: linear-gradient(
    90deg,
    rgb(31, 31, 31),
    20%,
    rgba(31, 31, 31, 0.6),
    80%,
    rgb(31, 31, 31)
  );
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
const TitleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 5;
`;
const TitleName = styled.p`
  font-size: 3.2rem;
`;
const TitleRatings = styled.div`
  display: flex;
  gap: 1.2rem;

  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 0.4rem;
  }
`;
const TitleBody = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 1.8rem;
`;
const TitleLinks = styled(Link)`
  &:link,
  &:visited {
    border-radius: 100px;
    border: 1px solid var(--color-grey-500);
    padding: 0.4rem 0.6rem;
  }
  &:hover,
  &:active {
    background-color: rgba(75, 85, 99, 0.679);
  }
`;
const TitleDetails = styled.div`
  display: flex;
  z-index: 5;
  flex-direction: column;
  gap: 1.4rem;
  & div {
    display: flex;
    gap: 1.8rem;
  }
  & p {
    padding-bottom: 0.6rem;
    border-bottom: 1px solid var(--color-grey-350);
  }
`;
const TitleExtra = styled.div`
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  & div {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;
const variations = {
  green: css`
    background-color: #40c057;
  `,
  yellow: css`
    background-color: #fcc419;
  `,
  red: css`
    background-color: #f03e3e;
  `,
};
const Metascore = styled.span`
  ${(props) => variations[props.variation]}
  padding: 0.4rem 0.6rem;
`;
function Title() {
  const { title, relatedGenre } = useLoaderData();
  return (
    <>
      <Container>
        <TitleSection>
          <TitleBackdrop imgurl={`${title.Poster}`}>
            <TitleOverlay />
            <StyledTitle>
              <TitleHeader>
                <div>
                  <TitleName>{title.Title}</TitleName>
                  <span>{`${title.Year} | ${title.Rated} | ${title.Runtime}`}</span>
                </div>
                <TitleRatings>
                  <div>
                    <span>IMDb Rating</span>
                    <span>
                      <HiStar /> {title.imdbRating} / 10
                    </span>
                  </div>
                  <div>
                    <span>Metacritic</span>
                    <span>
                      {title.Ratings[2] ? title.Ratings[2]?.Value : "N/A"}
                    </span>
                  </div>
                  <div>
                    <span>Your Rating</span>
                    <button>
                      <HiOutlineStar />
                      Rate
                    </button>
                  </div>
                </TitleRatings>
              </TitleHeader>
              <TitleBody>
                <img src={title.Poster} alt={`${title.Title} Poster`} />
                <TitleDetails>
                  <div>
                    {title.Genre &&
                      splitGenre(title.Genre).map((genre, index) => (
                        <TitleLinks to="/" key={index}>
                          {genre}
                        </TitleLinks>
                      ))}
                  </div>
                  <p>{title.Plot}</p>
                  <p>
                    <strong>Director</strong>&nbsp;&nbsp;
                    {title.Director ? title.Director : "N/A"}
                  </p>
                  <p>
                    <strong>Writers</strong>&nbsp;&nbsp;{title.Writer}
                  </p>
                  <p>
                    <strong>Stars</strong>&nbsp;&nbsp;{title.Actors}
                  </p>
                  <p>
                    <strong>Box Office</strong>&nbsp;&nbsp;
                    {title.BoxOffice ? title.BoxOffice : "N/A"}
                  </p>
                  <p>
                    <strong>Awards</strong>&nbsp;&nbsp;{title.Awards}
                  </p>
                </TitleDetails>
                <TitleExtra>
                  <ButtonWatchList variation="titleStyle">
                    <HiPlus /> Watchlist
                  </ButtonWatchList>
                  {title.Metascore && (
                    <div>
                      <Metascore variation={checkMetascore(title.Metascore)}>
                        {title.Metascore}
                      </Metascore>
                      <span>Metascore</span>
                    </div>
                  )}
                </TitleExtra>
              </TitleBody>
            </StyledTitle>
          </TitleBackdrop>
        </TitleSection>
      </Container>
      {relatedGenre.length >= 5 && (
        <TitlesCarouselContainer>
          <TitlesCarousel
            label={`Related Genre: ${splitGenre(title.Genre)[0]}`}
            browseContent={false}
            titles={relatedGenre}
          />
        </TitlesCarouselContainer>
      )}
    </>
  );
}
export async function loader({ params }) {
  const title = await getTitle(params.titleId);
  const relatedGenre = await getRelatedGenre(
    splitGenre(title.Genre)[0],
    +title.Year.slice(0, 4)
  );
  const titleObj = { title, relatedGenre };
  return titleObj;
}
export default Title;
