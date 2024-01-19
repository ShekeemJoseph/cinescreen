import { useEffect } from "react";
import { API_KEY } from "../services/apiSearchTitleData";

export function useGetSearchResults(setError, setTitles, query) {
  useEffect(
    function () {
      let titlesData;
      async function fetchTitles() {
        try {
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
          );
          const resData = await res.json();
          if (resData.Response === "False") throw new Error("Title not found");
          titlesData = resData.Search.filter((data) => {
            if (data.Poster !== "N/A") {
              return data;
            } else {
              return null;
            }
          });
          setTitles(titlesData);
        } catch (err) {
          setError(err.message);
        }
      }
      if (query.length < 3) {
        setTitles([]);
        setError("");
        return;
      }
      fetchTitles();
    },
    [query, setError, setTitles]
  );
}
