import { deleteGuide } from "@/api/guide";
import { deleteImagesInPath } from "@/api/image";
import type { UseMutationCallback } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteGuide(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGuide,
    onSuccess: async (deletedGuide) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      if (deletedGuide.image_urls && deletedGuide.image_urls.length > 0) {
        await deleteImagesInPath(
          `${deletedGuide.writer_id}/guide/${deletedGuide.id}`,
        );
      }

      // queryClient.invalidateQueries(["guide-list"]);
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
