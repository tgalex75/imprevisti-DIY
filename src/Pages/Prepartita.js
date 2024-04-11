import React, { useState, useContext } from "react";
import SecondaEstrazione from "../Components/SecondaEstrazione";
import FetchImprevisto from "../Funzioni/FetchImprevisto";
import { initialMessage } from "../Components/InitialMessage";
import LayoutBase from "../Components/LayoutBase";
import Dado from "../Components/Dado";
import { CartContext } from "../context/regContext";
import random from "random";

const Prepartita = () => {
  const { prepartita } = useContext(CartContext);

  const [casuale, setCasuale] = useState(null);

  const fetchList = () => {
    setCasuale(
      prepartita?.length > 0 ? random.choice(prepartita) : initialMessage,
    );
  };

  const { titolo, descrizione, isImprev, ultEstrazione } = casuale
    ? casuale
    : {};

  const titoloH1 = "Imprevisto Prepartita";
  const isImprSpeciale = titolo === "IMPREVISTO SPECIALE";

  return (
    <>
      <LayoutBase titoloH1={titoloH1} isImprev={isImprev} casuale={casuale}>
        {casuale && (
          <section className="flex h-full w-full flex-col items-center justify-around">
            <h2
              className={
                isImprev > 0
                  ? "relative top-2 h-1/4 items-center font-H2 text-5xl font-extrabold uppercase [filter:drop-shadow(.05rem_.05rem_0.1rem_#000)] md:flex md:h-full md:text-6xl"
                  : "invisible md:h-full"
              }
            >
              {isImprSpeciale ? "Imprevisto SPECIALE" : "IMPREVISTO!"}
            </h2>
            {!isImprSpeciale ? (
              <>
                <h3
                  className={`h-1/4 items-center text-4xl font-extrabold uppercase [filter:drop-shadow(.05rem_.05rem_0.1rem_#000)] md:flex md:h-full md:text-5xl ${
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
                <FetchImprevisto tipoImprevisto="prepartita"/>
              </>
            )}
            {ultEstrazione === 1 && !isImprSpeciale && <SecondaEstrazione />}
          </section>
        )}
      </LayoutBase>
      {Dado(fetchList)}
    </>
  );
};

export default Prepartita;
