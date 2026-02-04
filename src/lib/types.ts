import { type Database } from "@/database.types";

export type ProfileEntity = Database["public"]["Tables"]["profile"]["Row"];

export type UseMutationCallback = {
  onSuccess?: () => void;
  onError?: () => void;
  onMutate?: () => void;
  onSettled?: () => void;
};

export type Theme = "system" | "dark" | "light";
