import { useContext } from "react";
import { CartContext } from "../context/regContext";
import { motion } from "framer-motion";
import FormImpostazioni from "../Components/FormImpostazioni";
import { db } from "../Data/db";

const ImpostazioniApp = () => {
  const { sezioniAttive } = useContext(CartContext);

  const selectTheme = async (name) => {
    await db.defaultTheme.update(1, { theme: name });
    console.log(name);
  };
  const themesButtons = [
    { id: 1, name: "light-standard", type: "light" },
    { id: 2, name: "dark-neon", type: "dark" },
    { id: 3, name: "light-teal", type: "light" },
    { id: 4, name: "dark-yellow", type: "dark" },
    { id: 5, name: "light-brown", type: "light" },
    { id: 6, name: "dark-mint", type: "dark" },
  ];

  return (
    <section className="flex h-full w-full select-none flex-col items-center justify-start gap-2 px-4 py-6 font-semibold md:justify-around md:p-8">
      <h1>Impostazioni App</h1>
      <motion.main
        initial={{ opacity: 0, x: "-10vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.4, type: "spring" }}
        className="flex h-full w-full select-none flex-col items-center gap-4 rounded-xl bg-[--clr-cont] p-6 text-center text-lg shadow-lg ring ring-inset ring-white/75 md:gap-12 md:px-10 md:py-6 md:text-xl"
      >
        <h2 className="text-base md:text-lg px-2 md:px-12 leading-none">
          Scegli quali sezioni vuoi abilitare ed utilizzare nella Web app:
          potrai in qualsiasi momento cambiare questa impostazione
          con un click sulla casella corrispondente
        </h2>
        <div
          id="container"
          className="grid grid-cols-2 justify-center gap-6 rounded-lg border p-4 md:grid-cols-6 md:gap-4 md:border-none md:p-6"
        >
          {sezioniAttive?.map((el) => (
            <FormImpostazioni
              key={el.id}
              id={el.id}
              nomeSezione={el.nomeSezione}
              isVisible={el.isVisible}
            />
          ))}
        </div>
        <h3 className="leading-none">Scegli il Tema dell'interfaccia</h3>
        <section
          id="themesButtons"
          className="grid grid-cols-2 md:flex w-full gap-3 justify-center text-[.6rem] md:text-xs md:grid-cols-6 mx-4"
        >
          {themesButtons?.map((el) => (
            <button
              data-theme={el.name}
              key={el.id}
              className="flex h-16 w-full flex-col rounded-lg border border-[#eee] hover:scale-105 transition-all duration-200 bg-[--clr-bg] p-2 uppercase md:h-20"
              onClick={() => selectTheme(el.name)}
            >
              <div className="grid h-2/3 md:h-[85%] w-full grid-cols-6 gap-1">
                <span className="col-span-3 h-full w-full -skew-x-12 border bg-[--clr-prim]"></span>
                <span className="col-span-2 h-full w-full -skew-x-12 border bg-[--clr-sec]"></span>
                <span className="h-full w-full -skew-x-12 border bg-[--clr-ter] "></span>
              </div>
              <span
                className={`h-1/3 md:h-[15%] font-bold ${el.type === "dark" ? "text-[#eee]" : "text-[#222]"}`}
              >
                {el.name}
              </span>
            </button>
          ))}
        </section>
      </motion.main>
    </section>
  );
};

export default ImpostazioniApp;
