import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/regContext";
import { motion } from "framer-motion";
import FormImpostazioni from "../Components/FormImpostazioni";
import { db } from "../Data/db";

const ImpostazioniApp = () => {
  const [ dati, setDati ] = useState([]);

  const defaultValues = [
    { id: 100, nomeSezione: "Prepartita", isVisible: 1 },
    { id: 200, nomeSezione: "Settimana", isVisible: 1 },
    { id: 300, nomeSezione: "SerieNegativa", isVisible: 1 },
    { id: 400, nomeSezione: "Rinnovi", isVisible: 1 },
    { id: 500, nomeSezione: "Ingaggi", isVisible: 1 },
    { id: 600, nomeSezione: "Mercato", isVisible: 1 },
  ];

  const {sezioniAttive} = useContext(CartContext)

  useEffect(() => {
    const fetchData = async () => {
      const result = await db.sezioniAttive.toArray();
      result.length === 0 && db.sezioniAttive.bulkAdd(defaultValues)
      setDati(result.length > 0 || defaultValues); // If no record is found, use default values
    };
    fetchData();
  }, []);



  return (
    <section className="flex h-full w-full select-none flex-col items-center justify-start gap-2 px-4 py-6 font-semibold md:justify-around md:p-8">
      <h1>Impostazioni App</h1>
      <motion.main
        initial={{ opacity: 0, x: "-10vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.4, type: "spring" }}
        className="flex h-full w-full select-none flex-col items-center gap-4 rounded-xl bg-black/50 p-6 text-center text-lg shadow-lg ring ring-inset ring-white/75 md:gap-12 md:px-10 md:py-6 md:text-xl"
      >
        <h2 className="text-base md:text-xl">
          Scegli quali sezioni vuoi abilitare ed utilizzare nella Web app:
          <br />
          potrai in qualsiasi momento cambiare questa impostazione
          <br />
          con un click sulla casella corrispondente
        </h2>
        <div
          id="container"
          className="grid grid-cols-2 justify-center gap-6 p-4 md:grid-cols-3"
        >
          {dati?.map((el) => (
            <FormImpostazioni
              key={el.id}
              id={el.id}
              nomeSezione={el.nomeSezione}
              isVisible={el.isVisible}
            />
          ))}
        </div>
      </motion.main>
    </section>
  );
};

export default ImpostazioniApp;
