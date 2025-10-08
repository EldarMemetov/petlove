export const selectNews = (state) => state.news?.items ?? [];
export const selectCurrentNews = (state) => state.news?.currentNews ?? null;
export const selectLoading = (state) => state.news?.loading ?? false;
export const selectError = (state) => state.news?.error ?? null;
