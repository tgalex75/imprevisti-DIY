import React, { useState, useContext } from "react";
import Dado from "../Components/Dado";
import { initialMessage } from "../Components/InitialMessage";
import { CartContext } from "../context/regContext";
import LayoutBase from "../Components/LayoutBase";
import SecondaEstrazione from "../Components/SecondaEstrazione";
import { isMobile } from "react-device-detect";
import random from "random";

const SerieNegativa = () => {
  const { serienegativa } = useContext(CartContext);

  const [casuale, setCasuale] = useState(null);

  const fetchList = () => {
    setCasuale(
      serienegativa?.length > 0 ? random.choice(serienegativa) : initialMessage,
    );
  };

  const { titolo, descrizione, isImprev, ultEstrazione } = casuale
    ? casuale
    : {};

  const titoloH1 = isMobile ? "Serie Negativa" : "Imprevisto Serie Negativa";

  return (
    <>
      <LayoutBase titoloH1={titoloH1} isImprev={isImprev} casuale={casuale}>
        {casuale && (
          <section className="flex h-full w-full flex-col items-center justify-around">
            {/* BOX PRIMA ESTRAZIONE */}
            <h2
              className={
                isImprev > 0
                  ? "relative top-2 h-1/4 items-center font-H2  text-5xl font-extrabold uppercase  md:flex md:h-full md:text-6xl"
                  : "hidden md:h-full"
              }
            >
              IMPREVISTO!
            </h2>
            <h3 className="h-1/4 items-center justify-center text-3xl font-extrabold uppercase  md:flex md:flex-1 md:text-6xl">
              {titolo}
            </h3>
            {isImprev > 0 && (
              <p
                className={`mt-4 h-2/4 px-4 font-Descr text-xl  md:h-full md:w-2/3 ${descrizione.length > 40 ? "h-3/4 md:text-2xl" : "md:text-3xl"}`}
              >
                {descrizione}
              </p>
            )}
            {ultEstrazione > 0 && <SecondaEstrazione />}
          </section>
        )}
      </LayoutBase>

      {Dado(fetchList)}
    </>
  );
};

export default SerieNegativa;
