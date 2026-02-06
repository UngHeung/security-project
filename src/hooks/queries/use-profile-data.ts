import { fetchProfile } from "@/api/profile";
import { QUERY_KEYS } from "@/lib/constants";
import type { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export function useProfileData(userId?: string) {
  return useQuery({
    queryKey: QUERY_KEYS.profile.byId(userId!),
    queryFn: async () => {
      try {
        const profile = await fetchProfile(userId!);
        return profile;
      } catch (error) {
        if ((error as PostgrestError).code === "PGRST116") {
          return; // await createProfile(userId!);
        }
      }
    },
    enabled: !!userId,
  });
}
