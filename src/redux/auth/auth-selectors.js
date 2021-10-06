export const getIsAuthorized = state => state.auth.isAuthorized;
export const getLoadingUser = state => state.auth.isLoading;
export const getUserName = state => state.auth.user.name;
export const getUserAvatar = state => state.auth.avatar;

export const getStatusLoadingUser = state => state.auth.isLoadingUser;
