import { useState } from "react";

export interface RefreshState {
  isRefreshing: boolean;
  setIsRefreshing: (refreshing: boolean) => void;
}

export const useRefresh = (): RefreshState => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  return { isRefreshing, setIsRefreshing };
};

export const createRefreshControl = (isRefreshing: boolean, onRefresh: () => void) => ({
  refreshing: isRefreshing,
  onRefresh,
});