import styled from "styled-components";
import { HiChevronLeft, HiChevronRight, HiStar } from "react-icons/hi2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, NavLink } from "react-router-dom";
import CarouselButton from "./CarouselButton";
import { useRef } from "react";
import "swiper/css";

const TitlesBoxHeading = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  padding-bottom: 2.4rem;

  & .carousel-heading {
    display: flex;
    align-items: center;
    gap: 2.4rem;

    & h2 {
      font-weight: 700;
      font-size: 3.6rem;
    }
    border-bottom: 1.8px solid var(--color-grey-700);
  }
  & .carousel-btn-container {
    margin-left: 1.8rem;
    align-self: center;
  }
`;
const TitlesContainer = styled.div`
  overflow: hidden;
`;
const TitleCard = styled.div`
  /* background: linear-gradient(to bottom right, #be4bdb, #ffd43b); */
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  display: grid;
  align-items: center;
  height: 40rem;
  margin: 5rem 0;
`;
const TitleBox = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2.4rem;
  & img {
    max-height: 25rem;
  }
`;
const TitleText = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;
  & svg {
    max-width: 1.8rem;
    height: 1.8rem;
    color: var(--color-brand-900);
  }
`;

function TitlesLayout({ label, titles }) {
  const swiperRef = useRef();
  return (
    <TitlesContainer>
      <TitlesBoxHeading>
        <div className="carousel-heading">
          <h2>{label}</h2>
          <NavLink>
            <span>See all</span>
          </NavLink>
        </div>
        <div className="carousel-btn-container">
          <CarouselButton onClick={() => swiperRef.current.slidePrev()}>
            <HiChevronLeft />
          </CarouselButton>
          <CarouselButton onClick={() => swiperRef.current.slideNext()}>
            <HiChevronRight />
          </CarouselButton>
        </div>
      </TitlesBoxHeading>

      <Swiper
        spaceBetween={30}
        slidesPerView={5}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {titles.map((title) => (
          <SwiperSlide key={title.id}>
            <TitleCard>
              <Link to={`/titles/:${title.id}`}>
                <TitleBox>
                  <img
                    src={title.primaryImage?.url}
                    alt={title.originalTitleText?.text}
                  />
                  {title.ratingsSummary.aggregateRating && (
                    <TitleText>
                      <HiStar />
                      <span>{title.ratingsSummary.aggregateRating} Rating</span>
                    </TitleText>
                  )}
                  <span>{title.originalTitleText?.text}</span>
                </TitleBox>
              </Link>
            </TitleCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </TitlesContainer>
  );
}

export default TitlesLayout;
