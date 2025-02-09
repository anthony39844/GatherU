import React, { createContext, useContext, ReactNode } from "react";

interface IdContextType {
  id: string | null;
  setId: (id: string) => void;
}

const IdContext = createContext<IdContextType | undefined>(undefined);

export const IdProvider = ({ children }: { children: ReactNode }) => {
  const [id, setId] = React.useState<string | null>(null);

  return (
    <IdContext.Provider value={{ id, setId }}>{children}</IdContext.Provider>
  );
};

export const getId = () => {
  const context = useContext(IdContext);
  if (!context) {
    throw new Error("useId must be used within an IdProvider");
  }
  return context;
};
