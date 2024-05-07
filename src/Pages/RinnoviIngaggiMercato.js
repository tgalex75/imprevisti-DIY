import React, { useState, useContext, useEffect, useRef } from "react";
import Dado from "../Components/Dado";
import { db } from "../Data/db";
import RegistroGiocatori from "../Components/RegistroGiocatori";
import { initialMessage } from "../Components/InitialMessage";
import { CartContext } from "../context/regContext";
import LayoutBase from "../Components/LayoutBase";
import { MdArrowForward } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import random from "random";

const RinnoviIngaggiMercato = (props) => {
  const tipoImprevisto = props.tipoImprevisto;

  const { [tipoImprevisto]: baseEstrazioni, registroGiocatori } =
    useContext(CartContext);

  const [casuale, setCasuale] = useState(null);

  const fetchList = () => {
    setCasuale(
      baseEstrazioni?.length > 0
        ? random.choice(baseEstrazioni)
        : initialMessage,
    );
  };

  const listaMsgImprevisto = [
    {
      tipo: "rinnovi",
      linkTo: "/rinnovi",
      linkDesc: "Imprevisti Rinnovi",
    },
    {
      tipo: "mercato",
      linkTo: "/mercato",
      linkDesc: "Imprevisti Calciomercato",
    },
    {
      tipo: "ingaggi",
      linkTo: "/ingaggi",
      linkDesc: "Imprevisti di Ingaggio",
    },
  ];

  const linksRapidi = listaMsgImprevisto.filter(
    (el) => el.tipo !== tipoImprevisto,
  );

  const { titolo, descrizione, isImprev } = casuale ? casuale : {};

  const titoloH1 = isMobile
    ? tipoImprevisto
    : "Imprevisto " + tipoImprevisto.toUpperCase();

  const [vociRegistro, setVociRegistro] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchRegistryList(); // eslint-disable-next-line
  }, [vociRegistro]);

  const fetchRegistryList = () => {
    setVociRegistro(registroGiocatori?.length > 0 ? registroGiocatori : []);
  };

  const uploadListDB = async (list) => {
    try {
      const id = await db.registroGiocatori.add({
        name: list.name,
        description: list.description,
        tipo: list.tipo,
      });
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };

  const removeVociRegistro = (id) => {
    db.registroGiocatori.delete(id);
  };

  const deleteListDB = () => {
    db.registroGiocatori.clear()
  };

  console.log(vociRegistro)

  return (
    <>
      <LayoutBase titoloH1={titoloH1} isImprev={isImprev} casuale={casuale}>
        {casuale && (
          <section className="relative flex h-full w-full flex-col items-center justify-around">
            <h2
              className={
                isImprev > 0
                  ? "relative top-2 h-1/4 items-center font-H2  text-5xl font-extrabold uppercase [filter:drop-shadow(.05rem_.05rem_0.1rem_#000)] md:flex md:h-full md:text-6xl"
                  : "invisible md:h-full"
              }
            >
              IMPREVISTO!
            </h2>
            <h3 className="h-1/4 items-center justify-center text-3xl font-extrabold uppercase [filter:drop-shadow(.05rem_.05rem_0.1rem_#000)] md:flex md:flex-1 md:text-6xl">
              {titolo}
            </h3>
            <p
              className={`mt-4 h-2/4 px-4 font-Descr text-xl [filter:drop-shadow(.05rem_.05rem_0.1rem_#000)] md:h-full md:w-2/3 ${descrizione.length > 40 ? "h-3/4 md:text-2xl" : "md:text-3xl"}`}
            >
              {descrizione}
            </p>
            <div className="hidden text-start md:flex md:w-1/3 md:flex-col">
              <label
                htmlFor="nome-giocatore"
                className="mb-1 inline-block text-xs text-gray-300 md:text-sm"
              >
                Giocatore da annotare nel registro
              </label>
              <div className="hidden items-center justify-between gap-2 md:flex">
                <input
                  ref={inputRef}
                  type="text"
                  id="nome-giocatore"
                  className="h-10 w-1/2 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-2 py-2 text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                  name="nomeGiocatore"
                  placeholder="Nome del giocatore"
                />
                <button
                  type="button"
                  className="h-10 w-1/2 rounded-lg bg-sky-700 px-2 py-2 text-center text-sm font-bold text-gray-300 shadow-md transition duration-200 ease-in hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-indigo-200 "
                  onClick={() =>
                    uploadListDB({
                      name: inputRef.current.value,
                      description: titolo,
                      tipo: tipoImprevisto,
                    })
                  }
                >
                  Aggiungi al Registro
                </button>
              </div>
            </div>
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
        <RegistroGiocatori
          vociRegistro={vociRegistro}
          deleteListDB={deleteListDB}
          removeVociRegistro={removeVociRegistro}
          tipoImprevisto={tipoImprevisto}
        />
      </LayoutBase>

      {Dado(fetchList)}
    </>
  );
};

export default RinnoviIngaggiMercato;
