import { createGuideWithImages } from "@/api/guide";
import type { UseMutationCallback } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";

export function useCreateGuide(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: createGuideWithImages,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
