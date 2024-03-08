import supabase from "./supabase";

export async function getRatings(userId) {
  let query = supabase.from("ratings").select("*");
  if (userId !== null) query = query.eq("userId", userId);
  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("Ratings could not be loaded");
  }
  return data;
}
export async function createRating(ratedTitle) {
  const { data, error } = await supabase
    .from("ratings")
    .insert([ratedTitle])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Rating could not be added");
  }
  return data;
}
export async function updateRating(updatedRate) {
  const { data, error } = await supabase
    .from("ratings")
    .update({ rating: updatedRate.rating })
    .eq("id", updatedRate.id)
    .select();
  if (error) {
    console.error(error);
    throw new Error("Rating could not be updated");
  }
  return data;
}
export async function deleteRating(id) {
  const { error } = await supabase.from("ratings").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Rating could not be deleted");
  }
}
