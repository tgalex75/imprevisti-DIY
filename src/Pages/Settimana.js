import React, { useState, useContext } from "react";
import Dado from "../Components/Dado";
import random from "random";
import FetchImprevisto from "../Funzioni/FetchImprevisto";
import { initialMessage } from "../Components/InitialMessage";
//import { motion } from "framer-motion";
import LayoutBase from "../Components/LayoutBase";
import { CartContext } from "../context/regContext";
import { motion } from "framer-motion";

const Settimana = () => {
  const { settimana } = useContext(CartContext);

  const [casuale, setCasuale] = useState(null);

  const fetchList = () => {
    setCasuale(
      settimana?.length > 0 ? random.choice(settimana) : initialMessage,
    );
  };

  const { titolo, descrizione, isImprev } = casuale ? casuale : {};

  const titoloH1 = "Imprevisto Settimanale";
  const isImprSpeciale = titolo === "IMPREVISTO SPECIALE";

  return (
    <>
      <LayoutBase titoloH1={titoloH1} isImprev={isImprev} casuale={casuale}>
        {casuale && (
          <motion.section
            initial={{ opacity: 0, x: "-10vw" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.3, type: "spring" }}
            key={Math.random()}
            className="flex h-full w-full flex-col items-center justify-around"
          >
            <h2
              className={
                isImprev > 0
                  ? "relative top-2 h-1/4 items-center font-H2  text-5xl font-extrabold uppercase [filter:drop-shadow(.05rem_.05rem_0.1rem_#000)] md:flex md:h-full md:text-6xl"
                  : "invisible md:h-full"
              }
            >
              {isImprSpeciale ? "Imprevisto SPECIALE" : "IMPREVISTO!"}
            </h2>
            {!isImprSpeciale ? (
              <>
                <h3
                  className={`h-1/4 items-center text-4xl font-extrabold uppercase [filter:drop-shadow(.05rem_.05rem_0.1rem_#000)]  md:flex md:h-full md:text-5xl ${
                    titolo === "IMPREVISTO SPECIALE" && "hidden"
                  }`}
                >
                  {titolo}
                </h3>
                <p
                  className={`mt-4 h-2/4 px-4 font-Descr text-xl md:h-full md:w-2/3 ${descrizione.length > 40 ? "h-3/4 md:text-2xl" : "md:text-3xl"}`}
                >
                  {isImprev > 0 && descrizione}
                </p>
              </>
            ) : (
              <>
                <FetchImprevisto tipoImprevisto="settimana" />
              </>
            )}
          </motion.section>
        )}
      </LayoutBase>
      {Dado(fetchList)}
    </>
  );
};

export default Settimana;
