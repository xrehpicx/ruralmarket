import React, { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      console.log(user);
      localStorage.setItem("user", JSON.stringify(user));
      if (window.location.href !== window.location.origin + "/") {
        window.location.href = window.location.origin;
      }
    }
  }, [user]);

  useEffect(() => {
    const utemp = localStorage.getItem("user");
    if (utemp) setUser(JSON.parse(utemp));
  }, []);
  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
}
