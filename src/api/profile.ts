import { generateRandomName } from "@/lib/generate-random-name";
import supabase from "@/lib/supabase";
import { deleteImagesInPath, uploadImage } from "./image";
import type { PositionType, RoleType } from "@/lib/types";

export async function fetchProfile(userId: string) {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
}

export async function createProfile(userId: string) {
  const randomName = generateRandomName();
  const { data, error } = await supabase.from("profile").insert({
    id: userId,
    name: `_${randomName}`,
  });

  if (error) throw error;

  return data;
}

export async function updateProfile({
  userId,
  name,
  role,
  avatarImageFile,
}: {
  userId: string;
  name: string;
  role: RoleType;
  avatarImageFile?: File;
}) {
  // 기존 이미지 삭제
  if (avatarImageFile) {
    await deleteImagesInPath(`${userId}/avatar`);
  }

  let newAvatarImageUrl;
  if (avatarImageFile) {
    const fileExtension = avatarImageFile.name.split(".").pop() || "webp";
    const filePath = `${userId}/avatar/${new Date().getTime()}-${crypto.randomUUID()}.${fileExtension}`;

    newAvatarImageUrl = await uploadImage({
      file: avatarImageFile,
      filePath,
    });
  }

  const { data, error } = await supabase
    .from("profile")
    .update({
      name,
      role,
      avatar_url: newAvatarImageUrl,
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
