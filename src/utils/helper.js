export function reduceLongTitle(str) {
  let longStr;
  if (str.length > 30) {
    longStr = str.slice(0, 30) + "...";
    return longStr;
  } else {
    return str;
  }
}
export function getCurrentYear() {
  const year = new Date().getFullYear();
  return year;
}
export function splitGenre(titleGenre) {
  const genreArr = titleGenre.split(",");
  return genreArr;
}
export const defaultYear = getCurrentYear() - 1;
export function checkMetascore(score) {
  if (score >= 65 && score <= 100) {
    return "green";
  } else if (score <= 64 && score >= 32) {
    return "yellow";
  } else if (score <= 31 && score >= 0) {
    return "red";
  }
}
export const TITLE_GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "News",
  "Romance",
  "Sci-Fi",
  "Sport",
  "Talk-Show",
  "Thriller",
  "War",
  "Western",
];
