import { deleteGuide } from "@/api/guide";
import type { UseMutationCallback } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";

export function useDeleteGuide(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: deleteGuide,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
