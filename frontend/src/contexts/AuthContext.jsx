import react, {createContext, useContext, useEffect, useState} from "react";
import {authAPI} from "../api/api.js";


const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [role, setRole] = useState(() => {
    const storedRole = localStorage.getItem("role");
    return storedRole || null;
  });
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const {data} = await authAPI.getCurrentUser();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    }catch (e) {
      console.error('Auth check failed:', e);
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Only check auth status for protected routes
    const publicPaths = [ '/login', '/register'];
    if (!publicPaths.includes(location.pathname)) {
      checkAuthStatus();
    } else {
      // For public routes, just set loading to false
      setLoading(false);
    }
  }, [location.pathname])

  const login = async(email, password, role) => {
    try{
      const {data} = await authAPI.login(email, password, role);
      console.log(data.logged_in_as);
      setUser(data.user);
      setRole(data.logged_in_as);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.logged_in_as);
      setLoading(false);
      return data.user
    }catch (e) {
      console.error('Login failed:', e);
      throw e;
    }
  }

  const logout = async () => {
    try{
      await authAPI.logout();
      setUser(null);
      setRole(null);
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    }catch (e) {
      console.error('Some error occurred:', e);
      throw e;
    }
  }

  const register = async(userData) => {
    try{
      const { data } = await authAPI.register(userData);
      setUser(data.user);
      setRole(data.logged_in_as);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.logged_in_as);
      return data.user;
    }catch (e) {
      console.error('Registration failed:', e);
      throw e;
    }

  }

  const value = {
    user,
    login,
    logout,
    register,
    role
  }

  // Add debug log when user changes
  useEffect(() => {
    console.log('Current user in AuthContext:', user);
  }, [user]);

  return (
     <AuthContext.Provider value={value}>
       {!loading && children}
     </AuthContext.Provider>
  )
}