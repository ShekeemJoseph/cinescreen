export const API_KEY = "1af44454";

export async function getTitles(query) {
  let titlesData;
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
    );
    const resData = await res.json();
    if (resData.Response === "False") throw new Error("Titles not found");
    titlesData = resData.Search.filter((data) => {
      if (data.Poster !== "N/A") {
        return data;
      } else {
        return null;
      }
    });
    return titlesData;
  } catch (err) {
    console.error(err.message);
  }
}
export async function getTitle(query) {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${query}`
    );
    const resData = await res.json();
    if (resData.Response === "False") throw new Error("Title not found");
    return resData;
  } catch (err) {
    console.error(err.message);
  }
}
