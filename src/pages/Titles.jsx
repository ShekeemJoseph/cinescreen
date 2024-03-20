import { Link, useLoaderData, useParams } from "react-router-dom";
import { getTitles } from "../services/apiSearchTitleData";
import styled from "styled-components";
const TitlesSection = styled.section`
  max-width: 128rem;
  margin: 2.4rem auto;
`;
const StyledTitles = styled.div`
  width: 100rem;
  display: grid;
  margin-top: 3.6rem;
  row-gap: 4.8rem;
  grid-template-rows: auto 1fr;
`;
const UserSearchTitle = styled.p`
  font-size: 3.6rem;
`;
const TitleHeading = styled.h3`
  font-size: 2rem;
  font-weight: 600;
`;
const TitleYear = styled.span`
  font-weight: 500;
`;
const TitleType = styled.span`
  text-transform: uppercase;
  padding: 0.4rem;
  border: 1px solid var(--color-grey-400);
  border-radius: var(--border-radius-sm);
`;
const Title = styled.li`
  width: 100%;
  height: 15rem;
  padding: 1.2rem;
  display: flex;
  gap: 2.4rem;
  align-items: flex-start;
  border-bottom: 1px solid var(--color-grey-400);
  transition: all 0.3s;
  & img {
    height: 100%;
  }
  &:hover,
  &:active {
    background-color: var(--color-grey-300);
  }
`;

const TitleDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  & div {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }
`;
function Titles() {
  const { titleStr } = useParams();
  const titles = useLoaderData();

  return (
    <TitlesSection>
      <StyledTitles>
        <UserSearchTitle>
          Searched "<strong>{titleStr}</strong>"
        </UserSearchTitle>
        <ul>
          {titles.map((title) => (
            <Link
              to={
                title.media_type === "movie"
                  ? `/movie/${title.id}`
                  : title.media_type === "series" || title.media_type === "tv"
                  ? `/tv/${title.id}`
                  : "/"
              }
              key={title.id}
            >
              <Title>
                <img
                  src={`https://image.tmdb.org/t/p/w500${title.poster_path}`}
                  alt={`${title.title ? title.title : title.name} Poster`}
                />
                <TitleDetails>
                  <TitleHeading>
                    {title.title ? title.title : title.name}
                  </TitleHeading>
                  <div>
                    <TitleType>{title.media_type}</TitleType>
                    <TitleYear>
                      {title.release_date || title.first_air_date || "N/A"}
                    </TitleYear>
                  </div>
                </TitleDetails>
              </Title>
            </Link>
          ))}
        </ul>
      </StyledTitles>
    </TitlesSection>
  );
}
export async function loader({ params }) {
  const titles = await getTitles(params.titleStr);
  return titles;
}
export default Titles;
