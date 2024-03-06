import supabase from "./supabase";

export async function getRatings() {
  const { data, error } = await supabase.from("ratings").select("*");
  if (error) {
    console.error(error);
    throw new Error("Ratings could not be loaded");
  }
  return data;
}
