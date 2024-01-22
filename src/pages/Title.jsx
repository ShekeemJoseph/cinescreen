import { useLoaderData } from "react-router-dom";
import { getTitle } from "../services/apiSearchTitleData";
import styled from "styled-components";

const TitleSection = styled.section`
  max-width: 128rem;
  margin: 0 auto;
`;
const Container = styled.div`
  background-color: #1f1f1f;
`;
const StyledTitle = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
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
  width: 128rem;
  height: 60rem;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.imgurl});
  position: relative;
`;
function Title() {
  const title = useLoaderData();
  console.log(title);
  return (
    <Container>
      <TitleSection>
        <TitleBackdrop imgurl={`${title.Poster}`}>
          <TitleOverlay />
          <StyledTitle></StyledTitle>
        </TitleBackdrop>
      </TitleSection>
    </Container>
  );
}
export async function loader({ params }) {
  const title = await getTitle(params.titleId);
  return title;
}
export default Title;
