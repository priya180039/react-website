import React, { createContext, useContext, useState } from "react";

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [sideToggle, setSideToggle] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  return (
    <HeaderContext.Provider
      value={{ sideToggle, setSideToggle, menuToggle, setMenuToggle }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  return useContext(HeaderContext);
};

export default HeaderContext;
