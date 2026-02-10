import type { CreateGuideType } from "@/api/post";
import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

export type EditGuideType = CreateGuideType & { image_urls: string };

const initialState: EditGuideType = {
  writer_id: "",
  title: "",
  content: "",
  locations: "",
  tags: "",
  image_urls: "",
};

const useGuideEditorStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        setGuideEditor: ({
          writer_id,
          title,
          content,
          locations,
          tags,
          image_urls,
        }: EditGuideType) => {
          set({
            writer_id,
            title,
            content,
            locations,
            tags,
            image_urls,
          });
        },

        resetGuideEditor: () => set(initialState),
      },
    })),
    { name: "guideEditStore" },
  ),
);

export const useSetGuideEditor = () => {
  const setGuideData = useGuideEditorStore(
    (store) => store.actions.setGuideEditor,
  );
  return setGuideData;
};

export const useResetGuideEditor = () => {
  const resetGuideData = useGuideEditorStore(
    (store) => store.actions.resetGuideEditor,
  );
  return resetGuideData;
};

export const useGuideEditor = () => {
  const store = useGuideEditorStore();
  return store;
};
