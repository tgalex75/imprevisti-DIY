import React, { useState, useContext } from "react";
import Dado from "../Components/Dado";
import { initialMessage } from "../Components/InitialMessage";
import { CartContext } from "../context/regContext";
import LayoutBase from "../Components/LayoutBase";
import {MdArrowForward} from "react-icons/md"
import {motion} from "framer-motion"
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import random from "random";

const RinnoviIngaggiMercato = (props) => {
  const { ingaggi, rinnovi, mercato } = useContext(CartContext);

  const [casuale, setCasuale] = useState(null);

  const tipoImprevisto = props.tipoImprevisto;
  
  const baseEstrazioni = {tipoImprevisto}

  const fetchList = () => {
    setCasuale(
      baseEstrazioni?.length > 0 ? random.choice(baseEstrazioni) : initialMessage,
    );
  };

  const listaMsgImprevisto = [
    {
      tipo: "Rinnovi",
      msgIsImpr: "Mercenario",
      msgNoImpr: "Trattativa Libera",
      descrIsImpr: "Raddoppia l'ingaggio o cessione obbligatoria",
      descrNoImpr: "Gestisci la trattativa liberamente",
      linkTo: "/rinnovi",
      linkDesc: "Imprevisti Rinnovi",
    },
    {
      tipo: "Mercato",
      msgIsImpr: "Mercenario",
      msgNoImpr: "Bilancio in Ordine",
      descrIsImpr: "Accetta l'offerta o raddoppia l'ingaggio appena possibile",
      descrNoImpr: "Totale libertà di scelta",
      linkTo: "/mercato",
      linkDesc: "Imprevisti Calciomercato",
    },
    {
      tipo: "Ingaggio",
      msgIsImpr: "Visite non superate",
      msgNoImpr: "Visite OK",
      descrIsImpr:
        "La trattativa salta e non può essere ritentata fino alla prossima finestra di mercato.",
      descrNoImpr: "La trattativa viene chiusa senza conseguenze.",
      linkTo: "/ingaggi",
      linkDesc: "Imprevisti di Ingaggio",
    },
  ];

  const msgImprevisto = listaMsgImprevisto.filter(
    (el) => el.tipo === tipoImprevisto,
  );

  const linksRapidi = listaMsgImprevisto.filter(
    (el) => el.tipo !== tipoImprevisto,
  );

  const { msgNoImpr, msgIsImpr, descrIsImpr, descrNoImpr } = msgImprevisto[0];

  const { titolo, descrizione, isImprev } = casuale
    ? casuale
    : {};

  const titoloH1 = isMobile ? tipoImprevisto : "Imprevisto " + tipoImprevisto;

  return (
    <>
      <LayoutBase titoloH1={titoloH1} isImprev={isImprev} casuale={casuale}>
        {casuale && (
          <section className="relative flex h-full w-full flex-col items-center justify-around">
            <h2
              className={
                isImprev > 0
                  ? "relative top-2 h-1/4 items-center font-H2  text-5xl font-extrabold uppercase [filter:drop-shadow(.05rem_.05rem_0.1rem_#000)] md:flex md:h-full md:text-6xl"
                  : "hidden md:h-full"
              }
            >
              IMPREVISTO!
            </h2>
            <h3 className="h-1/4 items-center justify-center text-3xl font-extrabold uppercase [filter:drop-shadow(.05rem_.05rem_0.1rem_#000)] md:flex md:flex-1 md:text-6xl">
              {titolo}
            </h3>
            {isImprev > 0 && (
              <p
                className={`mt-4 h-2/4 px-4 font-Descr text-xl [filter:drop-shadow(.05rem_.05rem_0.1rem_#000)] md:h-full md:w-2/3 ${descrizione.length > 40 ? "h-3/4 md:text-2xl" : "md:text-3xl"}`}
              >
                {descrizione}
              </p>
            )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="absolute right-1 top-1 mb-2 hidden h-auto w-[20vw] items-start gap-2 overflow-hidden rounded-lg bg-black/50 px-2 pb-4 pt-2 uppercase text-gray-300 md:flex md:flex-col"
        >
          <h6 className="self-center uppercase text-[--clr-prim]">
            Links Rapidi
          </h6>

          {linksRapidi.map((el, i) => {
            return (
              <motion.div
                whileHover={{ x: ".5rem" }}
                transition={{
                  type: "spring",
                  duration: 0.4,
                  ease: "easeIn",
                }}
                key={i}
                className="flex w-full items-center justify-start gap-4 hover:text-[--clr-ter]"
              >
                <MdArrowForward />
                <Link to={el.linkTo}>{el.linkDesc}</Link>
              </motion.div>
            );
          })}
          <motion.div
            whileHover={{ x: ".5rem" }}
            transition={{
              type: "spring",
              duration: 0.4,
              ease: "easeIn",
            }}
            key="prepartita"
            className="flex w-full items-center justify-start gap-4 hover:text-[--clr-ter]"
          >
            <MdArrowForward />
            <Link to="/prepartita">Prepartita</Link>
          </motion.div>
        </motion.div>
          </section>
        )}
      </LayoutBase>

      {Dado(fetchList)}
    </>
  );
};

export default RinnoviIngaggiMercato;
