import { useEffect, createContext } from "react";
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
  const registroGiocatori = useLiveQuery(async () =>
    db.registroGiocatori.toArray(),
  );

  const defaultValues = [
    { id: 100, nomeSezione: "Prepartita", isVisible: 1 },
    { id: 200, nomeSezione: "Settimana", isVisible: 1 },
    { id: 300, nomeSezione: "Serie Negativa", isVisible: 1 },
    { id: 400, nomeSezione: "Rinnovi", isVisible: 1 },
    { id: 500, nomeSezione: "Ingaggi", isVisible: 1 },
    { id: 600, nomeSezione: "Mercato", isVisible: 1 },
  ];

  const defaultThemeValue = [{ id: 1, theme: "dark" }];

  useEffect(() => {
    const fetchData = async () => {
      const result = await db.sezioniAttive.toArray();
      result.length === 0 && db.sezioniAttive.bulkAdd(defaultValues);
      const resultTheme = await db.defaultTheme.toArray();
      resultTheme.length === 0 && db.defaultTheme.bulkAdd(defaultThemeValue);
    };
    fetchData(); // eslint-disable-next-line
  }, []);

  const sezioniAttive = useLiveQuery(async () => db.sezioniAttive.toArray());

  const defaultTheme = useLiveQuery(async () => db.defaultTheme.toArray());

  const themeValue = defaultTheme?.map(el => el.theme)[0]

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
        defaultValues,
        registroGiocatori,
        themeValue,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
