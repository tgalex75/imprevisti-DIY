import React, { useState, useContext } from "react";
import Dado from "../Components/Dado";
import random from "random";
import FetchImprevisto from "../Funzioni/FetchImprevisto";
import { initialMessage } from "../Components/InitialMessage";
//import { motion } from "framer-motion";
import LayoutBase from "../Components/LayoutBase";
import { CartContext } from "../context/regContext";

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
          <section className="flex h-full w-full flex-col items-center justify-around">
            <h2
              style={{
                fontFamily: "'Boogaloo', sans-serif",
                filter: "drop-shadow(.05rem .05rem 0.1rem #000)",
              }}
              className={
                isImprev > 0
                ? "md:flex h-1/4 md:h-full items-center  text-5xl font-extrabold uppercase relative top-2 md:text-6xl"
                : "invisible md:h-full"
              }
            >
              {isImprSpeciale ? "Imprevisto SPECIALE" : "IMPREVISTO!"}
            </h2>
            {!isImprSpeciale ? (
              <>
                <h3
                  style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
                  className={`md:flex h-1/4 items-center text-4xl font-extrabold uppercase md:h-full md:text-5xl ${
                    titolo === "IMPREVISTO SPECIALE" && "hidden"
                  }`}
                >
                  {titolo}
                </h3>
                <p
                  style={{ fontFamily: "'Handlee', cursive" }}
                  className={`mt-4 h-2/4 px-4 text-xl md:h-full md:w-2/3 ${descrizione.length > 40 ? "md:text-2xl h-3/4" : "md:text-3xl"}`}
                >
                  {isImprev > 0 && descrizione}
                </p>
              </>
            ) : (
              <>
                <FetchImprevisto />
              </>
            )}
          </section>
        )}
      </LayoutBase>
      {Dado(fetchList)}
    </>
  );
};

export default Settimana;
