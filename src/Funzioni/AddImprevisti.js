import { db } from "../Data/db";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import {isMobile} from "react-device-detect"

export function AddImprevisti(props) {
  const { tipoImprevisto } = props;

  const [refState, setRefState] = useState("imprevisto");

  const ref = useRef(null);

  const handleRefState = () => {
    setRefState(ref.current.value);
  };

  const disabledField = refState === "noImprevisto";

  async function addImpr(data, e) {
    try {
      const id = await db[tipoImprevisto].add({
        titolo: disabledField ? "NESSUN IMPREVISTO" : (refState === "speciale" ? "IMPREVISTO SPECIALE" : data.titolo ),
        descrizione: data.descrizione,
        isImprev: disabledField ? 0 : 1,
        ultEstrazione: disabledField ? 0 : parseInt(data.ultEstrazione),
      });
      console.log(id);
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
    setRefState("imprevisto");
  }

  const {
    register: registerImprevisti,
    handleSubmit: handleSubmitImprevisti,
    formState: { errors: errorsImprevisti },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmitImprevisti(addImpr)}
      className="flex h-full w-full flex-col items-center justify-between gap-2 md:px-4 py-2 font-normal"
    >
      <h3 className="text-center uppercase text-[--clr-prim]">
        Aggiungi il tuo imprevisto
      </h3>

      <label
        htmlFor="isImprev"
        className="flex  w-full md:w-1/3 items-center justify-center gap-2"
      >
        Cosa vuoi inserire?
        {errorsImprevisti.isImprev && (
          <span className="text-[--clr-prim]">
            Seleziona un tipo di imprevisto!
          </span>
        )}
        <select
          id="isImprev"
          name="isImprev"
          {...registerImprevisti("isImprev")}
          defaultChecked
          ref={ref}
          onChange={handleRefState}
          className="w-fit self-center rounded-md border p-1 text-sm font-semibold dark:border-gray-300/80 dark:bg-black/30 dark:text-gray-300 dark:placeholder-black/10 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          <option value="imprevisto">IMPREVISTO</option>
          <option
            className={`${tipoImprevisto === "speciali" && "hidden"}`}
            value="noImprevisto"
          >
            NESSUN IMPREVISTO
          </option>
          <option
            className={`${tipoImprevisto === "prepartita" || tipoImprevisto === "settimana" ? "visible" : "hidden"}`}
            value="speciale"
          >
            IMPREVISTO SPECIALE
          </option>
        </select>
      </label>

      {/* TITOLO */}
      <section className="md:flex border md:p-2 rounded-md w-full p-1">
        <div className="md:flex md:flex-col w-full md:w-1/2 gap-2">
          <label className="my-1 flex flex-col gap-4 text-sm font-semibold">
            Titolo Imprevisto
            {errorsImprevisti.titolo && (
              <span className="text-[--clr-prim] w-full self-start">
                Il campo Titolo è obbligatorio - max 20 caratteri
              </span>
            )}
          </label>
          {refState !== "speciale" ? (
            <input
              name="titolo"
              {...registerImprevisti("titolo", {
                required: disabledField ? false : true,
                maxLength: 20,
              })}
              disabled={disabledField}
              className="block w-2/3 md:w-1/3 rounded p-1 text-xs md:text-sm font-semibold uppercase text-black placeholder:normal-case placeholder:italic disabled:placeholder:text-black"
              placeholder={
                disabledField ? "NESSUN IMPREVISTO" : "Titolo dell'imprevisto"
              }
            />
          ) : (
            <input
              name="titolo"
              {...registerImprevisti("titolo", {
                required: false,
                maxLength: 20,
              })}
              disabled
              className="block w-2/3 md:w-1/3 self-start rounded p-1 text-sm font-semibold uppercase text-black placeholder:normal-case placeholder:italic disabled:placeholder:text-black"
              placeholder="IMPREVISTO SPECIALE"
            />
          )}

          {/* ESTRAZIONE EXTRA? */}

          <div className="flex items-center gap-2 py-2 pe-2" style={tipoImprevisto === "settimana" ? {visibility: "hidden"} : {}}>
            <label
              htmlFor="ultEstrazione"
              className="md:me-4 text-sm font-semibold text-gray-300"
            >
              Ulteriore estrazione necessaria dopo la prima?
            </label>
            <label htmlFor="ultEstrazioneYES">Sì</label>
            <input
              {...registerImprevisti("ultEstrazione")}
              disabled={disabledField || refState === "speciale"}
              id="ultEstrazioneYES"
              name="ultEstrazione"
              defaultChecked
              type="radio"
              value={1}
              className="h-4 ms-2 md:m-0 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="ultEstrazioneNO">No</label>
            <input
              {...registerImprevisti("ultEstrazione")}
              disabled={disabledField || refState === "speciale"}
              id="ultEstrazioneNO"
              name="ultEstrazione"
              type="radio"
              value={0}
              className="h-4 ms-2 md:m-0 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
          </div>
        </div>

        {/* DESCRIZIONE */}
        <div className="flex md:w-1/2 flex-col gap-2 ">
          <label className="my-1 flex w-full items-center gap-4 self-start text-sm font-semibold">
            Descrizione Imprevisto
            {errorsImprevisti.descrizione && (
              <span className="text-[--clr-prim]">
                Il campo descrizione è obbligatorio
              </span>
            )}
          </label>
          <textarea
            name="descrizione"
            {...registerImprevisti("descrizione", {
              required: disabledField || refState === "speciale" ? false : true,
            })}
            rows={isMobile ? 3 : 4}
            disabled={disabledField || refState === "speciale"}
            id="descrizione"
            placeholder="Descrizione dell'imprevisto"
            className="w-full rounded p-1 text-sm font-semibold text-black placeholder:italic"
          />
        </div>
      </section>
      <button
        type="submit"
        className="w-full md:w-1/3 rounded-lg bg-sky-700 py-1 font-semibold hover:bg-sky-600"
      >
        Salva ed Invia
      </button>
    </form>
  );
}
