import { useEffect, createContext, useState } from "react";
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
  const registroGiocatori = useLiveQuery(async () => db.registroGiocatori.toArray());

  const defaultValues = [
    { id: 100, nomeSezione: "Prepartita", isVisible: 1 },
    { id: 200, nomeSezione: "Settimana", isVisible: 1 },
    { id: 300, nomeSezione: "Serie Negativa", isVisible: 1 },
    { id: 400, nomeSezione: "Rinnovi", isVisible: 1 },
    { id: 500, nomeSezione: "Ingaggi", isVisible: 1 },
    { id: 600, nomeSezione: "Mercato", isVisible: 1 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const result = await db.sezioniAttive.toArray();
      result.length === 0 && db.sezioniAttive.bulkAdd(defaultValues);
    };
    fetchData(); // eslint-disable-next-line
  }, []);

  const sezioniAttive = useLiveQuery(async () => db.sezioniAttive.toArray());

  // Salvare lo stato "theme" nel localStorage
  const getFromLocalStorage = () => {
    return localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : "dark-mode";
  };

  // Funzione che aggiorna il tema in base allo State

  const [theme, setTheme] = useState(getFromLocalStorage());

  // Funzione che cambia il tema in base al valore dello State

  const cambiaTema = () => {
    theme === "light-mode" ? setTheme("dark-mode") : setTheme("light-mode");
  };

  // Al cambio ddello state "theme" verrà attaccata una classe al TAG html
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

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
        theme,
        cambiaTema,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
