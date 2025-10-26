// app/actions.js
"use server";

import { createClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function createIdeaAction(formData) {
  // ... (your existing createIdeaAction function)
  const supabase = createClient();
  const title = formData.get("title");
  const description = formData.get("description");

  const { error } = await supabase.from("ideas").insert({ title, description });

  if (error) {
    console.error("Error inserting idea:", error);
    return { error: error.message };
  }

  revalidatePath("/");
}

// ADD THIS NEW FUNCTION
export async function deleteIdeaAction(formData) {
  const supabase = createClient();
  const id = formData.get("id");

  const { error } = await supabase.from("ideas").delete().match({ id });

  if (error) {
    console.error("Error deleting idea:", error);
    return { error: error.message };
  }

  revalidatePath("/");
}
