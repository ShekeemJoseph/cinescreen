import supabase from "./supabase";

export async function getWatchList(userId) {
  let query = supabase.from("watchlist").select("*");
  if (userId !== null) query = query.eq("userId", userId);
  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("Watchlist could not be loaded");
  }
  return data;
}
export async function createBookmark(bookmarkedTitle) {
  const { data, error } = await supabase
    .from("watchlist")
    .insert([bookmarkedTitle])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Watchlist could not be added");
  }
  return data;
}

export async function deleteImdbBookmark(titleImdbId) {
  const { error } = await supabase
    .from("watchlist")
    .delete()
    .eq("titleImdbId", titleImdbId);
  if (error) {
    console.error(error);
    throw new Error("Watchlist could not be deleted");
  }
}
export async function deleteTmdbBookmark(titleTmdbId) {
  const { error } = await supabase
    .from("watchlist")
    .delete()
    .eq("titleTmdbId", titleTmdbId);
  if (error) {
    console.error(error);
    throw new Error("Watchlist could not be deleted");
  }
}
