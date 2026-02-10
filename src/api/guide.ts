import supabase from "@/lib/supabase";
import type { GuideEntity } from "@/lib/types";
import { uploadImage } from "./image";

export type CreateGuideType = Pick<
  GuideEntity,
  "writer_id" | "title" | "content" | "locations" | "tags"
>;

export async function fetchGuideById(guideId: number) {
  const { data, error } = await supabase
    .from("guide")
    .select("*")
    .eq("id", guideId)
    .single();

  if (error) throw error;

  return data;
}

export async function fetchGuideList() {
  const { data, error } = await supabase.from("guide").select("*");

  if (error) throw error;

  return data;
}

export async function createGuide({
  writer_id,
  title,
  content,
  locations,
  tags,
}: CreateGuideType) {
  const { data, error } = await supabase
    .from("guide")
    .insert({
      writer_id,
      title,
      content,
      locations,
      tags,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createGuideWithImages({
  contents,
  imageFiles,
}: {
  contents: CreateGuideType;
  imageFiles: File[];
}) {
  const guide = await createGuide(contents);

  if (!imageFiles.length) return guide;

  try {
    const uploadImageUrls: string[] = [];

    if (imageFiles?.length > 0) {
      await Promise.all(
        imageFiles.map((file) => {
          const fileExtension = file.name.split(".").pop() || "webp";
          const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
          const filePath = `${contents.writer_id}/${guide.id}/${fileName}`;

          uploadImageUrls.push(filePath);

          uploadImage({
            file,
            filePath: filePath,
          });
        }),
      );
    }

    const updatedGuide = await updateGuide({
      id: guide.id,
      image_urls: uploadImageUrls.join(" ").trim(),
    });

    return updatedGuide;
  } catch (error) {
    deleteGuide(guide.id);
    throw error;
  }
}

export async function updateGuide(post: Partial<GuideEntity> & { id: number }) {
  const { data, error } = await supabase
    .from("guide")
    .update(post)
    .eq("id", post.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteGuide(guideId: number) {
  const { data, error } = await supabase
    .from("guide")
    .delete()
    .eq("id", guideId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
