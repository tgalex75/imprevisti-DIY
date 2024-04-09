import { db } from "../Data/db";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { isMobile } from "react-device-detect";

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
        titolo: disabledField
          ? "NESSUN IMPREVISTO"
          : refState === "speciale"
            ? "IMPREVISTO SPECIALE"
            : data.titolo,
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
      className="flex h-full w-full flex-col items-center justify-between gap-2 py-2 font-normal md:px-4"
    >
      <h3 className="text-center uppercase text-[--clr-prim]">
        Aggiungi il tuo imprevisto
      </h3>

      <label
        htmlFor="isImprev"
        className="flex  w-full items-center justify-center gap-2 md:w-1/3"
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
          className="w-fit self-center rounded-md border p-1 text-xs font-semibold md:text-sm dark:border-gray-300/80 dark:bg-black/30 dark:text-gray-300 dark:placeholder-black/10 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
      <section className="w-full rounded-md border p-1 md:flex md:p-2">
        <div className="w-full gap-2 md:flex md:w-1/2 md:flex-col">
          <label className="my-1 flex flex-col gap-4 text-xs font-semibold md:text-sm">
            Titolo Imprevisto
            {errorsImprevisti.titolo && (
              <span className="w-full self-start text-[--clr-prim]">
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
              className="block w-2/3 rounded p-1 text-xs font-semibold uppercase text-black placeholder:normal-case placeholder:italic disabled:placeholder:text-black md:w-1/3 md:text-sm"
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
              className="block w-2/3 self-start rounded p-1 text-xs font-semibold uppercase text-black placeholder:normal-case placeholder:italic disabled:placeholder:text-black md:w-1/3 md:text-sm"
              placeholder="IMPREVISTO SPECIALE"
            />
          )}

          {/* ESTRAZIONE EXTRA? */}

          <div
            className="flex items-center gap-2 py-2 pe-2"
            style={
              tipoImprevisto === "settimana" ? { visibility: "hidden" } : {}
            }
          >
            <label
              htmlFor="ultEstrazione"
              className="text-xs font-semibold text-gray-300 md:me-4 md:text-sm"
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
              className="ms-2 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 md:m-0 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="ultEstrazioneNO">No</label>
            <input
              {...registerImprevisti("ultEstrazione")}
              disabled={disabledField || refState === "speciale"}
              id="ultEstrazioneNO"
              name="ultEstrazione"
              type="radio"
              value={0}
              className="ms-2 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 md:m-0 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
          </div>
        </div>

        {/* DESCRIZIONE */}
        <div className="flex flex-col gap-2 md:w-1/2 ">

          {/* ELIMINA DOPO IMPREVISTO ? */}

          {tipoImprevisto === "speciali" && (
            <div
              className="flex items-center gap-2 pe-2"
              style={
                tipoImprevisto === "settimana" ? { visibility: "hidden" } : {}
              }
            >
              <label
                htmlFor="eliminaDopoEstrazione"
                className="text-xs font-semibold text-gray-300 md:me-4 md:text-sm"
              >
                Vuoi che venga eliminato dopo l'estrazione?
              </label>
              <label htmlFor="eliminaYES">Sì</label>
              <input
                {...registerImprevisti("ultEstrazione", {required: true})}
                disabled={disabledField || refState === "speciale"}
                id="eliminaYES"
                name="eliminaDopoEstrazione"
                defaultChecked
                type="radio"
                value={1}
                className="ms-2 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 md:m-0 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label htmlFor="eliminaNO">No</label>
              <input
                {...registerImprevisti("eliminaDopoEstrazione")}
                id="eliminaNO"
                name="eliminaDopoEstrazione"
                type="radio"
                value={0}
                className="ms-2 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 md:m-0 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
            </div>
          )}
          <label className="my-1 flex w-full items-center gap-4 self-start text-xs font-semibold md:text-sm">
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
            rows={isMobile ? 3 : tipoImprevisto === "speciali" ? 2 : 4}
            disabled={disabledField || refState === "speciale"}
            id="descrizione"
            placeholder="Descrizione dell'imprevisto"
            className="w-full rounded p-1 text-xs font-semibold text-black placeholder:italic md:text-sm"
          />
        </div>
      </section>
      <button
        type="submit"
        className="w-full rounded-lg bg-sky-700 py-1 font-semibold hover:bg-sky-600 md:w-1/3"
      >
        Salva ed Invia
      </button>
    </form>
  );
}
