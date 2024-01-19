import { useLoaderData } from "react-router-dom";
import { getTitle } from "../services/apiSearchTitleData";

function Title() {
  const title = useLoaderData();
  console.log(title);
  return <div>Title</div>;
}
export async function loader({ params }) {
  const title = await getTitle(params.titleId);
  return title;
}
export default Title;
