import { updateGuide } from "@/api/guide";
import { QUERY_KEYS } from "@/lib/constants";
import type { GuideEntity, UseMutationCallback } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateGuide(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGuide,
    onSuccess: (updatedGuide) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.setQueryData<GuideEntity>(
        QUERY_KEYS.guide.byId(updatedGuide.id),
        (prevGuide) => {
          if (!prevGuide)
            throw new Error(
              `${updatedGuide.id}에 해당하는 가이드를 찾을 수 없습니다.`,
            );

          return { ...prevGuide, ...updatedGuide };
        },
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
