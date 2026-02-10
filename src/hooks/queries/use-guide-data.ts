import { fetchGuideById } from "@/api/guide";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

type GetDataType = "list" | "detail";

export function useGuideData({
  guideId,
  type,
}: {
  guideId?: number;
  type: GetDataType;
}) {
  return useQuery({
    queryKey: QUERY_KEYS.guide.byId(guideId!),
    queryFn: () => fetchGuideById(guideId!),
    enabled: type === "list" ? false : true,
  });
}
