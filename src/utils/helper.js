export function reduceLongTitle(str) {
  let longStr;
  if (str.length > 30) {
    longStr = str.slice(0, 30) + "...";
    return longStr;
  } else {
    return str;
  }
}
export function getDuration(seconds) {
  const hours = seconds / 3600;
  const minutes = (seconds % 3600) / 60;
  const duration = `${Math.floor(hours)}hrs ${
    minutes !== 0 ? `${minutes}m` : ""
  }`;
  return duration;
}
export function getCurrentYear() {
  const year = new Date().getFullYear();
  return year;
}
export function splitGenre(titleGenre) {
  const genres = titleGenre.split(",").map((genre) => genre.trim());
  return genres;
}
export function checkMetascore(score) {
  if (score >= 65 && score <= 100) {
    return "green";
  } else if (score <= 64 && score >= 32) {
    return "yellow";
  } else if (score <= 31 && score >= 0) {
    return "red";
  }
}
export function sortGenres(genres) {
  genres.sort((a, b) => {
    let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  return genres;
}
export function getTitleGenreId(genre, genreList) {
  const genreId = genreList.find((genreObj) => {
    let genreNameValid;
    if (genreObj.name === genre) {
      genreNameValid = true;
    } else if (genreObj.firstAltName && genreObj.firstAltName === genre) {
      genreNameValid = true;
    } else if (genreObj.secAltName && genreObj.secAltName === genre) {
      genreNameValid = true;
    } else {
      genreNameValid = false;
    }
    return genreNameValid;
  })?.id;
  return genreId;
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
    name: "Action & Adventure",
    firstAltName: "Action",
    secAltName: "Adventure",
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
    name: "Sci-Fi & Fantasy",
    firstAltName: "Sci-Fi",
    SecAltName: "Fantasy",
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
    name: "War & Politics",
    firstAltName: "War",
    SecAltName: "Politics",
  },
  {
    id: 37,
    name: "Western",
  },
];
