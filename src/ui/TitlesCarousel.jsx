import styled from "styled-components";
import { HiChevronLeft, HiChevronRight, HiPlus, HiStar } from "react-icons/hi2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, NavLink } from "react-router-dom";
import CarouselButton from "./CarouselButton";
import { useRef, useState } from "react";
import "swiper/css";
import ButtonWatchList from "./ButtonWatchList";
import { reduceLongTitle } from "../utils/helper";

const TitlesBoxHeading = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  padding-bottom: 2.4rem;

  & .carousel-heading {
    display: flex;
    align-items: center;
    gap: 2.4rem;

    & span:hover,
    span:active {
      text-decoration: underline;
    }

    & h2 {
      font-weight: 700;
      font-size: 3.6rem;
    }
    border-bottom: 1.8px solid var(--color-grey-700);
  }
  & .carousel-btn-container {
    display: flex;
    gap: 0.4rem;
    margin-left: 1.8rem;
    align-self: center;
  }
`;
const TitlesContainer = styled.div`
  overflow: hidden;
`;
const TitleCard = styled.div`
  background: linear-gradient(43deg, #4158d0 0%, #c850c0 46%, #ffcc70 100%);
  border-radius: var(--border-radius-md);
  color: var(--color-grey-0);
  display: grid;
  grid-template-rows: 1fr auto;
  align-items: start;
  height: 42rem;
`;
const TitleBox = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  font-size: 1.6rem;
  gap: 0.6rem;
  padding: 2.4rem 2.4rem 0;

  & p:hover,
  & p:active {
    text-decoration: underline;
  }

  & img {
    max-height: 25rem;
  }
`;
const RatingsText = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: center;

  & svg {
    max-width: 1.8rem;
    height: 1.8rem;
    color: var(--color-brand-900);
  }
`;

function TitlesLayout({ label, browseContent, titles }) {
  const swiperRef = useRef();
  const [isBegin, setIsBegin] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  function handlePrevClick() {
    setIsEnd(false);
    setIsBegin(swiperRef.current.isBeginning);
    swiperRef.current.slidePrev();
  }
  function handleNextClick() {
    setIsBegin(false);
    setIsEnd(swiperRef.current.isEnd);
    swiperRef.current.slideNext();
  }
  return (
    <TitlesContainer>
      <TitlesBoxHeading>
        <div className="carousel-heading">
          <h2>{label}</h2>
          {browseContent && (
            <NavLink
              to={
                label === "Movies"
                  ? "/movie"
                  : label === "TV Shows"
                  ? "/tv"
                  : "/"
              }
            >
              <span>See all</span>
            </NavLink>
          )}
        </div>
        {titles.length > 5 && (
          <div className="carousel-btn-container">
            <CarouselButton
              variation={isBegin && "inActive"}
              onClick={handlePrevClick}
            >
              <HiChevronLeft />
            </CarouselButton>
            <CarouselButton
              variation={isEnd && "inActive"}
              onClick={handleNextClick}
            >
              <HiChevronRight />
            </CarouselButton>
          </div>
        )}
      </TitlesBoxHeading>

      <Swiper
        spaceBetween={30}
        slidesPerView={5}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {titles.map((title) => (
          <SwiperSlide key={title.id}>
            <TitleCard>
              <TitleBox>
                <Link
                  to={
                    title.titleType?.id === "movie"
                      ? `/movie/${title.id}`
                      : title.titleType?.id === "tvSeries" ||
                        title.titleType?.id === "tvMiniSeries"
                      ? `/tv/${title.id}`
                      : "/"
                  }
                >
                  <img
                    src={title.primaryImage?.url}
                    alt={`${title.originalTitleText?.text} Poster`}
                  />
                  {title.ratingsSummary.aggregateRating && (
                    <RatingsText>
                      <span>{title.ratingsSummary.aggregateRating}</span>
                      <HiStar />
                      <span>Rating</span>
                    </RatingsText>
                  )}
                  <p>{reduceLongTitle(title.originalTitleText?.text)}</p>
                </Link>
              </TitleBox>
              <ButtonWatchList variation="standard">
                <HiPlus /> Watchlist
              </ButtonWatchList>
            </TitleCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </TitlesContainer>
  );
}

export default TitlesLayout;
