const IS_LOGGED_KEY = "is_logged";

export const setIsLogged = () => {
  localStorage.setItem(IS_LOGGED_KEY, "true");
};

export const clearIsLogged = () => {
  localStorage.removeItem(IS_LOGGED_KEY);
};

export const getIsLogged = () => {
  return localStorage.getItem(IS_LOGGED_KEY);
};
