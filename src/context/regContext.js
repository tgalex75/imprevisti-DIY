import { createContext, useEffect } from "react";
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

  useEffect(() => {
    (sezioniAttive?.length === 0) &&
      db.sezioniAttive.bulkPut([
        { id: 100, nomeSezione: "Prepartita", isVisible: 1 },
        { id: 200, nomeSezione: "Settimana", isVisible: 1 },
        { id: 300, nomeSezione: "Serie Negativa", isVisible: 1 },
        { id: 400, nomeSezione: "Rinnovi", isVisible: 1 },
        { id: 500, nomeSezione: "Ingaggi", isVisible: 1 },
        { id: 600, nomeSezione: "Mercato", isVisible: 1 },
      ]);// eslint-disable-next-line
  }, []);

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
