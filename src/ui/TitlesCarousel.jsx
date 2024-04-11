import styled from "styled-components";
import { HiChevronLeft, HiChevronRight, HiStar } from "react-icons/hi2";
import CarouselBookmarkBtn from "./CarouselBookmarkBtn";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, NavLink } from "react-router-dom";
import CarouselButton from "./CarouselButton";
import { useRef, useState } from "react";
import "swiper/css";
import {
  TITLE_MOVIE_GENRES,
  TITLE_TV_GENRES,
  reduceLongTitle,
} from "../utils/helper";
import { media } from "../styles/breakpoints";

const TitlesBoxHeading = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  padding-bottom: 2.4rem;
  ${media.md`
    grid-template-columns: 1fr;
  `}
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
    ${media.md`
      display: none;
    `}
  }
`;
const TitlesContainer = styled.div`
  overflow: hidden;
`;
const TitleCard = styled.div`
  background: linear-gradient(43deg, #4158d0 0%, #c850c0 46%, #ffcc70 100%);
  border-radius: var(--border-radius-md);
  color: var(--color-grey-0);
  display: flex;
  flex-direction: column;
  height: 42rem;
  max-width: 22.5rem;
`;
const TitleBox = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  font-size: 1.6rem;
  gap: 0.6rem;
  padding: 2.4rem 2.4rem 0;
  ${media.sm`
  font-size: 1.8rem;
  `}
  & p:hover,
  & p:active {
    text-decoration: underline;
  }

  & img {
    max-height: 25rem;
    border-radius: var(--border-radius-sm);
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
function TitlesCarousel({ label, browseContent, titles, mediaType }) {
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
    <TitlesContainer className="my-swiper-container">
      <TitlesBoxHeading>
        <div className="carousel-heading">
          <h2>{label}</h2>
          {browseContent && (
            <NavLink
              onClick={() => {
                if (mediaType === "movie") TITLE_MOVIE_GENRES.sort();
                if (mediaType === "series") TITLE_TV_GENRES.sort();
              }}
              to={
                mediaType === "movie"
                  ? "/movie"
                  : mediaType === "series"
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
              variation={isBegin ? "inActive" : ""}
              onClick={handlePrevClick}
            >
              <HiChevronLeft />
            </CarouselButton>
            <CarouselButton
              variation={isEnd ? "inActive" : ""}
              onClick={handleNextClick}
            >
              <HiChevronRight />
            </CarouselButton>
          </div>
        )}
      </TitlesBoxHeading>

      <Swiper
        breakpoints={{
          1500: {
            slidesPerView: 5,
          },
          1300: {
            slidesPerView: 5,
          },
          1250: {
            slidesPerView: 5,
          },
          1000: {
            slidesPerView: 4.5,
          },
          900: {
            slidesPerView: 4.2,
          },
          700: {
            slidesPerView: 3.5,
          },
          620: {
            slidesPerView: 3.2,
          },
          560: {
            slidesPerView: 3,
          },
          460: {
            slidesPerView: 2.8,
          },
          400: {
            slidesPerView: 2.4,
          },
          300: {
            slidesPerView: 2.1,
          },
        }}
        spaceBetween={15}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {titles
          .filter((title) =>
            title.vote_average && title.vote_average !== 0 ? true : false
          )
          .map((title) => (
            <SwiperSlide key={title.id}>
              <TitleCard>
                <TitleBox>
                  <Link
                    to={
                      mediaType === "movie" || title.media_type === "movie"
                        ? `/movie/${title.id}`
                        : mediaType === "series" || title.media_type === "tv"
                        ? `/tv/${title.id}`
                        : "/"
                    }
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${title.poster_path}`}
                      alt={`${title.title ? title.title : title.name} Poster`}
                    />
                    <RatingsText>
                      <span>{Math.floor(title.vote_average)}</span>
                      <HiStar />
                      <span>Rating</span>
                    </RatingsText>
                    <p>
                      {reduceLongTitle(title.title ? title.title : title.name)}
                    </p>
                  </Link>
                </TitleBox>
                <CarouselBookmarkBtn
                  titleId={title.id}
                  mediaType={mediaType}
                  apiMediaType={title.media_type}
                />
              </TitleCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </TitlesContainer>
  );
}

export default TitlesCarousel;
