import { createContext } from "react";
import { db } from "../Data/db";
import { useLiveQuery } from "dexie-react-hooks";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const prepartita = useLiveQuery(async () => db.prepartita.toArray());
  const settimana = useLiveQuery(async () => db.settimana.toArray());
  const serienegativa = useLiveQuery(async () => db.serienegativa.toArray());
  const speciali = useLiveQuery(async () => db.speciali.toArray());


  return (
    <CartContext.Provider
      value={{
        prepartita,
        settimana,
        serienegativa,
        speciali,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
