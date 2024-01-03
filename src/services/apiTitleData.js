const API_Titles_URL = "https://moviesdatabase.p.rapidapi.com/titles?";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "06be5c5da4msh57da3ae22a9b43bp127c9fjsnd45a69425767",
    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
  },
};
export async function getHomePageMovies() {
  try {
    const res = await fetch(
      `${API_Titles_URL}startYear=1980&list=top_rated_english_250&sort=year.decr&info=base_info&endYear=2023&limit=15`,
      options
    );
    if (!res.ok) throw Error("Could not get movies");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}
export async function getHomePageSeries() {
  try {
    const res = await fetch(
      `${API_Titles_URL}startYear=1980&list=top_rated_series_250&sort=year.decr&info=base_info&endYear=2023&limit=15`,
      options
    );
    if (!res.ok) throw Error("Could not get series");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}
export async function getNewReleases() {
  let data;
  try {
    const res = await fetch(
      `${API_Titles_URL}startYear=2023&info=base_info&endYear=2023&limit=50`,
      options
    );

    if (!res.ok) throw Error("Something went wrong with fetching movies");
    const resData = await res.json();
    data = resData.results
      .filter((result) => {
        if (
          result.primaryImage?.url != null &&
          result.meterRanking?.currentRank != null
        ) {
          return result;
        } else {
          return null;
        }
      })
      .sort((a, b) => a.releaseDate.month - b.releaseDate.month);
    return data;
  } catch (error) {
    console.error(error.message);
  }
}
