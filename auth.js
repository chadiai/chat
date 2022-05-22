import { useState, useEffect, useContext, createContext } from "react";
import firebaseClient from "./firebase/firebaseClient";
import { getAuth, onIdTokenChanged,updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Cookies from "js-cookie";

firebaseClient();
const AuthContext = createContext({});
const storage = getStorage();

export const AuthProvider = ({ children }) => {
  
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

export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');
  setLoading(true);
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);
  updateProfile(currentUser, {photoURL});  
  setLoading(false);
  
  alert("Uploaded file!");
}

export const useAuth = () => useContext(AuthContext);
