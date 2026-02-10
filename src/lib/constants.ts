export const QUERY_KEYS = {
  profile: {
    all: ["profile"],
    list: ["profile", "list"],
    byId: (userId: string) => ["profile", "byId", userId],
  },
};

export const BUCKET_NAME = "uploads";

export const POSITION_MAP = {
  0: "임시",
  1: "사원",
  2: "주임",
  3: "선임",
  4: "책임",
  5: "팀장",
  6: "파트장",
  7: "실장",
  8: "어드민",
};
