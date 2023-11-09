import React, { createContext, useContext, useEffect, useState } from "react";

const SignContext = createContext();

export const SignProvider = ({ children }) => {
  const [signType, setSignType] = useState("login");
  const signIn = () => {
    setSignType("login");
  };
  const signUp = () => {
    setSignType("register");
  };
  useEffect(() => {
    console.log(signType);
  }, [signType]);
  return (
    <SignContext.Provider value={{ signType, signIn, signUp }}>
      {children}
    </SignContext.Provider>
  );
};

export const useSign = () => {
  return useContext(SignContext);
};

export default SignContext;
