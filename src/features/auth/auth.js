export const auth = {
  login: (user) => {
    localStorage.setItem("taskflow-user", JSON.stringify(user));
    localStorage.setItem("taskflow-token", "demo-token");
  },

  logout: () => {
    localStorage.removeItem("taskflow-user");
    localStorage.removeItem("taskflow-token");
  },

  getUser: () => {
    return JSON.parse(localStorage.getItem("taskflow-user"));
  },

  getToken: () => {
    return localStorage.getItem("taskflow-token");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("taskflow-token");
  },
};
