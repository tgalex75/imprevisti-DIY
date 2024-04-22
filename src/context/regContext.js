import { createContext } from "react";
import { db } from "../Data/db";
import { useLiveQuery } from "dexie-react-hooks";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const prepartita = useLiveQuery(async () => db.prepartita.toArray());
  const settimana = useLiveQuery(async () => db.settimana.toArray());
  const serienegativa = useLiveQuery(async () => db.serienegativa.toArray());
  const rinnovi = useLiveQuery(async () => db.rinnovi.toArray());
  const ingaggi = useLiveQuery(async () => db.ingaggi.toArray());
  const mercato = useLiveQuery(async () => db.mercato.toArray());
  const speciali = useLiveQuery(async () => db.speciali.toArray());

  const sezioniAttive = useLiveQuery(async () => db.sezioniAttive.toArray());


  return (
    <CartContext.Provider
      value={{
        prepartita,
        settimana,
        serienegativa,
        rinnovi,
        ingaggi,
        mercato,
        speciali,
        sezioniAttive,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
