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
export const TITLE_MOVIE_GENRES = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Sci-Fi",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

export const TITLE_TV_GENRES = [
  {
    id: 10759,
    name: "Action",
  },
  {
    id: 10759,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 10762,
    name: "Kids",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10763,
    name: "News",
  },
  {
    id: 10764,
    name: "Reality",
  },
  {
    id: 10765,
    name: "Sci-Fi",
  },
  {
    id: 10765,
    name: "Fantasy",
  },
  {
    id: 10766,
    name: "Soap",
  },
  {
    id: 10767,
    name: "Talk",
  },
  {
    id: 10768,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];
