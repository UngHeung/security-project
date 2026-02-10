import { type Database } from "@/database.types";
import type { POSITION_MAP } from "./constants";

export type ProfileEntity = Database["public"]["Tables"]["profile"]["Row"];
export type GuideEntity = Database["public"]["Tables"]["guide"]["Row"];

export type UseMutationCallback = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};

export type Theme = "system" | "dark" | "light";

export type PositionType =
  | "임시"
  | "사원"
  | "주임"
  | "선임"
  | "책임"
  | "팀장"
  | "파트장"
  | "실장"
  | "어드민";

export type RoleType = keyof typeof POSITION_MAP;
