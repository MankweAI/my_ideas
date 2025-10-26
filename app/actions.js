// app/actions.js
"use server";

import { createClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function createIdeaAction(formData) {
  const supabase = createClient();
  const title = formData.get("title");
  const description = formData.get("description");

  const { error } = await supabase.from("ideas").insert({ title, description });

  if (error) {
    console.error("Error inserting idea:", error);
    // You can return an error object here to handle it on the client
    return { error: error.message };
  }

  revalidatePath("/");
}

