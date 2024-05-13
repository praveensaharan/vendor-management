import React, { useContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    // Set persistence
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // New sign-in will be persisted with session persistence
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
          setUser(authUser);
          setLoading(false);
        });
        return unsubscribe;
      })
      .catch((error) => {
        console.error(error.code, error.message);
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
