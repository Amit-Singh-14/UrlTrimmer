import supabase, { supabaseUrl } from "./supabase";

export async function getUrls(user_id) {
  const { data, error } = await supabase.from("urls").select("*").eq("user_id", user_id);
  if (error) {
    console.error(error.message);
    throw new Error("Unable to load URLs");
  }
  return data;
}

export async function deleteUrl(id) {
  const { data, error } = await supabase.from("urls").delete().eq("id", id);
  if (error) {
    console.error(error.message);
    throw new Error("Unable to delete Url");
  }

  return data;
}

export async function createUrl({ title, customUrl, LongUrl, user_id }, qrcode) {
  console.log(LongUrl);
  const short_url = Math.random().toString(36).substring(2, 6);
  const fileName = `qr-${short_url}`;

  const { error: storageError } = await supabase.storage.from("qr-code").upload(fileName, qrcode);

  if (storageError) throw new Error(storageError.message);

  const qr_code = `${supabaseUrl}/storage/v1/object/public/qr-code/${fileName}`;

  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        original_url: LongUrl,
        custom_url: customUrl || null,
        qr: qr_code,
        short_url,
        user_id,
      },
    ])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error("error creating short url");
  }

  return data;
}

export async function getLongUrl(id) {
  let { data: shortLinkData, error: shortLinkError } = await supabase
    .from("urls")
    .select("id, original_url")
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .single();

  if (shortLinkError && shortLinkError.code !== "PGRST116") {
    console.error("Error fetching short link:", shortLinkError);
    return;
  }

  return shortLinkData;
}

export async function getUrl({ id, user_id }) {
  let { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.error(error.message);
    throw new Error("Short Url not found");
  }
  return data;
}
