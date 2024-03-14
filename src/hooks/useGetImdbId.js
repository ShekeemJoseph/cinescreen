import { useEffect } from "react";
import { options } from "../services/apiGetTitleData";

export async function useGetImdbId(
  labelType,
  titles,
  setTitleImdbList,
  mediaType
) {
  useEffect(() => {
    let imbdIdList = [];
    for (let i = 0; i < titles.length; i++) {
      async function fetchImdbId() {
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/${
              labelType === "Movies" ||
              mediaType === "movie" ||
              titles[i].media_type === "movie"
                ? "movie"
                : "tv"
            }/${titles[i].id}/external_ids`,
            options
          );
          if (!res.ok) throw new Error("Title Id not found");
          const data = await res.json();
          imbdIdList.push(data.imdb_id);
          setTitleImdbList(imbdIdList);
        } catch (error) {
          console.error(error.message);
        }
      }
      fetchImdbId();
    }
  }, [labelType, titles, setTitleImdbList, mediaType]);
}
