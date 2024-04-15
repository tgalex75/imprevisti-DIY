import { useContext } from "react";
import { CartContext } from "../context/regContext";
import { motion } from "framer-motion";
import FormImpostazioni from "../Components/FormImpostazioni";

const ImpostazioniApp = () => {

  const { sezioniAttive } = useContext(CartContext);

  console.log(sezioniAttive.length)

  return (
    <section className="flex h-full w-full select-none flex-col items-center justify-start gap-2 px-4 py-6 font-bold md:justify-around md:p-8">
      <h1>Impostazioni App</h1>
      <motion.main
        initial={{ opacity: 0, x: "-10vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.4, type: "spring" }}
        className="flex h-full w-full select-none flex-col items-center gap-4 rounded-xl bg-black/50 p-6 text-center text-lg shadow-lg ring ring-inset ring-white/75 md:gap-2 md:px-10 md:py-6 md:text-xl"
      >
        <h2 className="text-base md:text-xl">
          Scegli quali sezioni vuoi abilitare ed utilizzare nella Web app:
          <br />
          potrai in qualsiasi momento cambiare questa impostazione
        </h2>
        <div
          id="container"
          className=" grid grid-cols-2 gap-6 border border-pink-500 p-4 md:grid-cols-3"
        >
          {/* <FormImpostazioni element="Prepartita" />
          <FormImpostazioni element="Settimana" />
          <FormImpostazioni element="Serie Negativa" />
          <FormImpostazioni element="Rinnovi" />
          <FormImpostazioni element="Ingaggi" />
          <FormImpostazioni element="Mercato" /> */}
          {sezioniAttive.map((el)=> (
            <FormImpostazioni id={el.id } element={el.nomeSezione} isvisible={el.isVisible} />
          )
        )}
        </div>
      </motion.main>
    </section>
  );
};

export default ImpostazioniApp;
