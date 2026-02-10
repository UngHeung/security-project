import { fetchGuideById } from "@/api/guide";
import type { UseMutationCallback } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";

export function useSelectGuide(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: fetchGuideById,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
