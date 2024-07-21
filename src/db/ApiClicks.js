import supabase from "./supabase";

export async function getClicksForUrls(urlsId) {
  const { data, error } = await supabase.from("clicks").select("*").in("url_id", urlsId);
  if (error) {
    console.error(error.message);
    throw new Error("Unable to load clicks");
  }
  return data;
}
