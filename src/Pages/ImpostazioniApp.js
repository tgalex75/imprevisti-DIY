import {useContext} from "react";
import { CartContext } from "../context/regContext";
import { motion } from "framer-motion";

const ImpostazioniApp = () => {

  const {sezioniattive} = useContext(CartContext)

  console.log(sezioniattive)
  
  return (
    <section className="flex h-full w-full select-none flex-col items-center justify-start gap-2 border border-yellow-600 px-4 py-6 font-bold md:justify-around md:p-8">
      <h1>Impostazioni App</h1>
      <motion.main
        initial={{ opacity: 0, x: "-10vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.4, type: "spring" }}
        className="flex h-full w-full select-none flex-col items-center gap-6 rounded-xl bg-black/50 p-6 text-center text-lg shadow-lg ring ring-inset ring-white/75 md:gap-2 md:px-10 md:py-6 md:text-xl"
      >
        <h2 className="text-base md:text-xl p-">
          Scegli quali sezioni vuoi abilitare ed utilizzare nella Web app:
          <br />
          potrai in qualsiasi momento cambiare questa impostazione
        </h2>
        <div>

        </div>

      </motion.main>
    </section>
  );
};

export default ImpostazioniApp;
