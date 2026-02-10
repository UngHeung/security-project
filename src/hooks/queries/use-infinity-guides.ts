import { fetchGuideList } from "@/api/guide";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

const PAGE_SIZE = 10;

export function useInfiniteGuideData(writerId?: string) {
  const queryClient = useQueryClient();
  const session = useSession();
  const userId = session?.user.id;

  return useInfiniteQuery({
    queryKey: !writerId
      ? QUERY_KEYS.guide.list
      : QUERY_KEYS.guide.userList(writerId),
    queryFn: async ({ pageParam }) => {
      const from = Number(pageParam) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const guideList = await fetchGuideList({
        from,
        to,
        userId: userId!,
        writerId,
      });

      guideList.forEach((guide) => {
        queryClient.setQueryData(QUERY_KEYS.guide.byId(guide.id), guide);
      });

      return guideList.map((guide) => guide.id);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length;
    },
    staleTime: Infinity,
  });
}
