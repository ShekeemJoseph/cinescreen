import styled from "styled-components";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { Link, NavLink } from "react-router-dom";
import CarouselButton from "./CarouselButton";
import { motion } from "framer-motion";
import { useState } from "react";
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
  margin-bottom: 6.4rem;

  & .title-content-box {
    display: flex;
    gap: 4.8rem;
  }
`;
const TitleItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const TitleImage = styled.img`
  max-height: 25rem;
  max-width: 21rem;
`;
function TitlesLayout({ label, titles }) {
  let [index, setIndex] = useState(0);

  function handleIncrement() {
    setIndex((index) => index + 1);
  }
  function handleDecrement() {
    setIndex((index) => index - 1);
  }
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
          <CarouselButton onClick={handleDecrement}>
            <HiChevronLeft />
          </CarouselButton>
          <CarouselButton>
            <HiChevronRight onClick={handleIncrement} />
          </CarouselButton>
        </div>
      </TitlesBoxHeading>

      <motion.div
        animate={{ x: `-${index * 30}%` }}
        className="title-content-box"
      >
        {titles.map((title) => (
          <TitleItem key={title.id}>
            <Link to={`/titles/:${title.id}`}>
              <TitleImage
                src={title.primaryImage?.url}
                alt={title.originalTitleText?.text}
              />
              <div>
                <span>{title.ratingsSummary.aggregateRating}</span>
                <span>{title.originalTitleText?.text}</span>
              </div>
            </Link>
          </TitleItem>
        ))}
      </motion.div>
    </TitlesContainer>
  );
}

export default TitlesLayout;
