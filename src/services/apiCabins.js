import supabase, { supabaseUrl } from "./supabase.js";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // create/edit cabin
  let query = supabase.from("cabins");

  // A - CREATE CABINS
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B - EDIT CABINS
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  // handle errors
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  // upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // Delete the cabin if there is an error uploading the image
  if (storageError) {
    // Handle error
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabins image couldn't be uploaded");
  }

  return data;
}

export async function deleteCabins(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
}
