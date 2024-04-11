import { useState, useRef, useCallback, useContext } from "react";
import { motion } from "framer-motion";
import { AddImprIngaggi } from "../Funzioni/AddImprIngaggi";
import { CartContext } from "../context/regContext";

const EditorImprevisti = () => {
  const [selectRefState, setSelectRefState] = useState("prepartita");

  const { [selectRefState]: registro } = useContext(CartContext);

  const selectRef = useRef(null);

  const handleSelectRef = useCallback(() => {
    setSelectRefState(selectRef.current.value);
  }, []);

  return (
    <section className="flex h-full w-full flex-col items-center justify-between overflow-y-auto p-2 font-bold md:overflow-hidden md:px-4 md:pb-2">
      <h1>Editor Imprevisti</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="h-full w-full items-center justify-around rounded-lg bg-black/50 text-gray-300 md:flex md:flex-col md:overflow-hidden md:px-2"
      >
        {/* Lista Imprevisti Attuale */}

        <div className="relative flex h-1/2 w-full flex-col items-center justify-center overflow-y-auto p-1 text-xs md:h-2/3 md:gap-2 md:text-base">
          <header className="w-full items-center justify-between p-1 md:flex">
            <h3 className="w-full text-center uppercase text-[--clr-prim] md:w-1/3 md:text-start">
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
                <option value="rinnovi">Rinnovi</option>
                <option value="ingaggi">Ingaggi</option>
                <option value="mercato">Mercato</option>
              </select>
            </label>
            <strong className="mt-2 block text-center text-xs font-semibold md:mt-0 md:w-1/3 md:text-end md:text-base">
              Numero imprevisti: {registro?.length}
            </strong>
          </header>

          {/* Rendered Elements */}
        </div>

        {/* Form "AGGIUNGI Imprevisti" */}

        {/* <div className="flex w-full items-center px-1 pb-8"> */}
          {selectRefState === "ingaggi" && (
            <AddImprIngaggi
              tipoImprevisto={selectRefState}
              registro={registro}
            />
          )}
        {/* </div> */}
      </motion.div>
    </section>
  );
};

export default EditorImprevisti;
