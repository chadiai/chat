import { useState, useEffect, useContext, createContext } from "react";
import firebaseClient from "./firebase/firebaseClient";
import { getAuth, onIdTokenChanged } from "firebase/auth";
import Cookies from "js-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  firebaseClient();
  const [user, setUser] = useState(null);

  const [isAuthenticated, setAutenticated] = useState(null);

  useEffect(async () => {
    const auth = await getAuth();
    return onIdTokenChanged(auth, async (user) => {
      if (!user) {        
        setAutenticated(false);
        setUser(false);
        Cookies.set("token", "",{sameSite: 'None', secure: true});
        return
      }
      const token = await user.getIdToken();
      setUser(user);
      setAutenticated(true);
      Cookies.set("token", token,{sameSite: 'None', secure: true});
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user , isAuthenticated}}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
