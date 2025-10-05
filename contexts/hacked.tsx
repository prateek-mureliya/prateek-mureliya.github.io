"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type HackedContextType = {
  isHacked: boolean;
  setIsHacked: (isHacked: boolean) => void;
};

const HackedContext = createContext<HackedContextType>({} as HackedContextType);

export const HackedContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isHacked, dispatch] = useState(false);

  const setIsHacked = (isHacked: boolean) => {
    dispatch(isHacked);
  };

  return (
    <HackedContext.Provider value={{ isHacked, setIsHacked }}>
      {children}
    </HackedContext.Provider>
  );
};

export const useHackedContext = () => {
  const context = useContext(HackedContext);

  if (!context) {
    throw new Error(
      "useHackedContext must be used within a HackedContextProvider"
    );
  }

  return context;
};
