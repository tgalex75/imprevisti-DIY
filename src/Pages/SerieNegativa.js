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
              style={{
                fontFamily: "'Boogaloo', sans-serif",
                filter: "drop-shadow(.05rem .05rem 0.1rem #000)",
              }}
              className={
                isImprev > 0
                  ? "md:flex h-1/4 md:h-full items-center  text-5xl font-extrabold uppercase relative top-2 md:text-6xl"
                  : "hidden md:h-full"
              }
            >
              IMPREVISTO!
            </h2>
              <h3
                style={{
                  filter: "drop-shadow(.05rem .05rem 0.1rem #000)",
                }}
                className="h-1/4 items-center justify-center text-3xl font-extrabold uppercase md:flex md:flex-1 md:text-6xl"
              >
                {titolo}
              </h3>
              {isImprev > 0 && (
                <p
                  style={{
                    fontFamily: "'Handlee', cursive",
                    filter: "drop-shadow(.05rem .05rem 0.1rem #000)",
                  }}
                  className={`mt-4 h-2/4 px-4 text-xl md:h-full md:w-2/3 ${descrizione.length > 40 ? "md:text-2xl h-3/4" : "md:text-3xl"}`}
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
