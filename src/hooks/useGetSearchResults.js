import { useEffect } from "react";
import { options } from "../services/apiGetTitleData";

export function useGetSearchResults(setError, setTitles, query) {
  useEffect(
    function () {
      async function fetchTitles() {
        try {
          setError("");

          const res = await fetch(
            `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
            options
          );
          const resData = await res.json();
          if (resData.Response === "False") throw new Error("Title not found");

          setTitles(resData.results);
        } catch (err) {
          setError(err.message);
        }
      }
      if (query.length <= 3) {
        setTitles([]);
        setError("");
        return;
      }
      fetchTitles();
    },
    [query, setError, setTitles]
  );
}
