import supabase from "./supabase";
import { UAParser } from "ua-parser-js";

export async function getClicksForUrls(urlsId) {
  const { data, error } = await supabase.from("clicks").select("*").in("url_id", urlsId);
  if (error) {
    console.error(error.message);
    throw new Error("Unable to load clicks");
  }
  return data;
}

const parser = new UAParser();

export async function storeClicks({ id, originalUrl }) {
  try {
    const res = parser.getResult();
    const device = res.type || "desktop";
    const response = await fetch("https://ipapi.co/json");
    const { city, country_name: country } = await response.json();

    await supabase.from("clicks").insert({
      url_id: id,
      city,
      country,
      device,
    });

    window.location.href = originalUrl;
  } catch (error) {
    console.error("error recording click:", error);
  }
}

export async function getClickForUrl(url_id) {
  let { data, error } = await supabase.from("clicks").select("*").eq("url_id", url_id).single();

  if (error) {
    console.error(error.message);
    throw new Error("Unable to load stats.");
  }
  return data;
}
