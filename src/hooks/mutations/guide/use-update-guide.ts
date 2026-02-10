import { updateGuide } from "@/api/guide";
import type { UseMutationCallback } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateGuide(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGuide,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
