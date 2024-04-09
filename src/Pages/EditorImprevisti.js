import { useState, useRef, useCallback, useContext } from "react";
import { motion } from "framer-motion";
import { MdDeleteForever } from "react-icons/md";
import { MdClear } from "react-icons/md";
import { AddImprevisti } from "../Funzioni/AddImprevisti";
import { CartContext } from "../context/regContext";
import { DelImprevisti } from "../Funzioni/DelImprevisti";
import { isMobile } from "react-device-detect";

const EditorImprevisti = () => {
  const [selectRefState, setSelectRefState] = useState("prepartita");

  const { [selectRefState]: registro } = useContext(CartContext);

  const selectRef = useRef(null);

  const handleSelectRef = useCallback(() => {
    setSelectRefState(selectRef.current.value);
  }, []);

  return (
    <section className="flex h-full w-full flex-col items-center justify-between p-2 font-bold overflow-y-auto md:overflow-hidden md:px-4 md:pb-2">
      <h1>Editor Imprevisti</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="h-full w-full items-center justify-around rounded-lg bg-black/50 text-gray-300 md:flex md:flex-col md:overflow-hidden md:px-2"
      >
        {/* Lista Imprevisti Attuale */}

        <div className="relative flex h-1/2 md:h-2/3 w-full overflow-y-auto flex-col items-center justify-center md:gap-2 p-1 text-xs md:text-base">
          <header className="w-full items-center justify-between p-1 md:flex">
            <h3 className="w-full text-center md:text-start uppercase text-[--clr-prim] md:w-1/3">
              Imprevisti {selectRefState}
            </h3>
            <label
              htmlFor="tipoImprevisto"
              className="flex w-full items-center justify-around md:w-1/3 md:justify-center md:gap-2"
            >
              Lista da editare
              <select
                ref={selectRef}
                onChange={handleSelectRef}
                className="w-fit self-center rounded-md border p-1 text-sm font-semibold dark:border-black/20 dark:bg-black/30 dark:text-gray-300 dark:placeholder-black/10 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option value="prepartita">Prepartita</option>
                <option value="settimana">Settimana</option>
                <option value="serienegativa">Serie Negativa</option>
                <option value="speciali">Speciali</option>
              </select>
            </label>
            <strong className="mt-2 block text-center text-xs font-semibold md:mt-0 md:w-1/3 md:text-end md:text-base">
              Numero imprevisti: {registro?.length}
            </strong>
          </header>

          {/* Rendered Elements */}

          {isMobile ? (
            <ul className="flex h-full w-full flex-col gap-1 overflow-y-auto rounded-lg border p-2">
              <div className="flex min-h-8 items-center bg-gray-700/80 ps-2 text-[.5rem] leading-none font-bold uppercase italic">
                <div className="w-full flex-col">
                  <span className="block w-full border-gray-300/20 bg-transparent p-1">
                    Imprevisto S/N
                  </span>
                  <span className="block w-full border-gray-300/20 bg-transparent p-1">
                    Titolo
                  </span>
                </div>
                <div className="w-full flex-col">
                  <span className="block w-full border-gray-300/20 bg-transparent p-1" style={selectRefState === "settimana" ? {visibility: "hidden"} : {}}>
                    Ulteriore Estrazione
                  </span>
                  <span className="block w-full border-gray-300/20 bg-transparent p-1">
                    Descrizione
                  </span>
                </div>

                <MdClear size={42} className="mx-2" />
              </div>
              {registro?.map((el) => (
                <li
                  key={el.id}
                  className="text-[.6rem] leading-none flex h-12 gap-2 odd:bg-gray-700/20 bg-gray-400/20 ps-2 font-normal hover:bg-[--clr-prim] hover:text-black"
                >
                  <div className="flex w-full flex-col p-1">
                    <span className="block h-full w-full bg-transparent font-semibold uppercase">
                      {el.isImprev === 1 ? "SI" : "NO"}
                    </span>
                    <span className="block h-full w-full bg-transparent text-start font-semibold uppercase">
                      {el.titolo}
                    </span>
                  </div>
                  <div className="flex w-full flex-col justify-around p-1">
                    <span className="block h-full w-full bg-transparent text-start font-semibold uppercase" style={selectRefState === "settimana" ? {visibility: "hidden"} : {}}>
                      {el.ultEstrazione === 1 ? "SI" : "NO"}
                    </span>
                    <span className="block h-full w-full bg-transparent text-start font-semibold uppercase overflow-y-auto">
                      {el.descrizione}
                    </span>
                  </div>
                  <MdDeleteForever
                    size={42}
                    className="mx-2 cursor-pointer self-center transition-all hover:scale-125"
                    onClick={() => DelImprevisti(selectRefState, el.id)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <ul className="flex h-full w-full flex-col gap-1 overflow-y-auto rounded-lg border p-2">
              <div className="flex min-h-4 items-center justify-between gap-2 bg-gray-700/80 ps-2 text-center text-xs font-bold uppercase italic">
                <span className="h-full w-1/6 border-gray-300/20 bg-transparent p-1">
                  Imprevisto S/N
                </span>
                <span className="h-full w-1/6 border-gray-300/20 bg-transparent p-1 text-left">
                  Titolo
                </span>
                <span className="h-full w-3/6 border-gray-300/20 bg-transparent p-1 text-left">
                  Descrizione
                </span>
                <span className="h-full w-1/6 border-gray-300/20 bg-transparent p-1" style={selectRefState === "settimana" ? {visibility: "hidden"} : {}}>
                  Ulteriore Estrazione
                </span>

                <MdClear size={24} className="mx-2" />
              </div>
              {registro?.map((el) => (
                <li
                  key={el.id}
                  className="text-md flex min-h-4 items-center justify-between gap-2 bg-gray-700/20 ps-2 text-center font-normal hover:bg-[--clr-prim] hover:text-black"
                >
                  <span className="h-full w-1/6 rounded border border-gray-300/20 bg-transparent p-1 font-semibold uppercase">
                    {el.isImprev === 1 ? "SI" : "NO"}
                  </span>
                  <span className="h-full w-1/6 rounded border border-gray-300/20 bg-transparent p-1 text-start font-semibold uppercase">
                    {el.titolo}
                  </span>
                  <span className="h-full w-3/6 overflow-auto rounded border border-gray-300/20 bg-transparent p-1 text-start font-semibold">
                    {el.descrizione}
                  </span>
                  <span className="h-full w-1/6 rounded border border-gray-300/20 bg-transparent p-1 font-semibold" style={selectRefState === "settimana" ? {visibility: "hidden"} : {}}>
                    {el.ultEstrazione === 1 ? "SI" : "NO"}
                  </span>
                  <MdDeleteForever
                    size={24}
                    className="mx-2 cursor-pointer transition-all hover:scale-125"
                    onClick={() => DelImprevisti(selectRefState, el.id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Form "AGGIUNGI Imprevisti" */}

        <div className="flex w-full items-center px-1 pb-8">
          <AddImprevisti tipoImprevisto={selectRefState} />
        </div>
      </motion.div>
    </section>
  );
};

export default EditorImprevisti;
