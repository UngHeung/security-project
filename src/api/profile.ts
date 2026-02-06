import supabase from "@/lib/supabase";

export async function fetchProfile(userId: string) {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
}

export async function updateProfile({
  userId,
  name,
  email,
  phone,
  avatar_url,
}: {
  userId: string;
  name: string;
  email: string;
  phone: string;
  avatar_url: string;
}) {
  const { data, error } = await supabase
    .from("profile")
    .update({
      name,
      phone,
      avatar_url,
      email,
    })
    .eq("id", userId)
    .single();
}
