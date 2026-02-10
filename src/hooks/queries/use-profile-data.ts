import { createProfile, fetchProfile } from "@/api/profile";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import type { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export function useProfileData(userId?: string) {
  const session = useSession();
  const isMyProfile = session?.user.id === userId;

  return useQuery({
    queryKey: QUERY_KEYS.profile.byId(userId!),
    queryFn: async () => {
      try {
        const profile = await fetchProfile(userId!);

        return profile;
      } catch (error) {
        if (isMyProfile && (error as PostgrestError).code === "PGRST116") {
          return await createProfile(userId!);
        }

        throw error;
      }
    },
    enabled: !!userId,
  });
}
