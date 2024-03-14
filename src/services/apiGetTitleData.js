import { getCurrentYear } from "../utils/helper";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGEwZDIzNjAyMmQyMzI4NTQ3ZWEzZWMzYmY3MTI3OSIsInN1YiI6IjY1ZWY3N2RmYWUyNmJlMDE4NTMyYTVkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3c0E7lQnnuRk5qaeMmVuV_aboBKLLaWjQ3_57zYeDFg",
  },
};
const API_Titles_URL = "https://moviesdatabase.p.rapidapi.com/titles?";

export async function getPageMovies(year, genre) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&year=${
        year ? year : getCurrentYear()
      }&with_genres=${genre ? genre : ""}`,
      options
    );
    if (!res.ok) throw Error("Could not get movies");
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(error.message);
  }
}
export async function getPageSeries(year, genre) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&year=${
        year ? year : getCurrentYear()
      }&with_genres=${genre ? genre : ""}`,
      options
    );
    if (!res.ok) throw Error("Could not get series");
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(error.message);
  }
}
export async function getTrending() {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/trending/all/week?language=en-US",
      options
    );

    if (!res.ok) throw Error("Something went wrong with fetching movies");
    const { results } = await res.json();
    const sortedResults = results.sort(
      (a, b) =>
        new Date(b.release_date ? b.release_date : b.first_air_date).getTime() -
        new Date(a.release_date ? a.release_date : a.first_air_date).getTime()
    );
    return sortedResults;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getRelatedGenre(genre, year, mediaType) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/${
        mediaType === "movie" ? "movie" : "tv"
      }?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&year=${
        year ? year : getCurrentYear()
      }&with_genres=${genre ? genre : ""}`,
      options
    );
    if (!res.ok) throw Error("Could not get series");
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(error.message);
  }
}
