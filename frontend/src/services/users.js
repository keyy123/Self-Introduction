import api from "./apiConfig";
import jwtDecode from "jwt-decode";



export const signUp = async (credentials) => {
  try {
    const res = await api.post("/auth/sign-up", credentials);
    console.log(res)
    localStorage.setItem("token", res.data.token);
    let user = jwtDecode(res.data.token);
    console.log(user)
    return user;
  } catch (e) {
    throw e;
  }
};

export const login = async (credentials) => {
  try {
    const res = await api.post("/auth/login", credentials)
    localStorage.setItem("token", res.data.token);
    let user = res.data.user
    console.log(user)
    return user
  } catch (e) {
    throw e;
  }
};

export const signOut = async () => {
  try {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("username")
    return true
  } catch (e) {
    throw e;
  }
};

export const verify = async () => {
  try {
    const token = localStorage.getItem('token')
    if (token) {
      const res = await api.get('/auth/verify')
      return res.data
    } else {
      return false
    }
  } catch (e) {
    throw e;
  }
};