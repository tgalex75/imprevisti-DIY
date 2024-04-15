import { db } from "../Data/db";
import { useForm } from "react-hook-form";

const FormImpostazioni = (props) => {
  const { id, element, isVisible } = props;

  const aggiornaImpostazioni = async (data) => {
    try {
      const idSezione = await db.sezioniAttive.update(id, {
        isVisible: data.isVisible,
      });
      console.log(idSezione);
    } catch (error) {
      console.log(error);
    }
  };

  const { register, handleSubmit } = useForm();

  return (
    <form
      onSubmit={handleSubmit(aggiornaImpostazioni)}
      className="flex h-3/4 w-5/6 select-none flex-col items-center justify-start gap-2 rounded-lg px-4 py-6 font-normal md:justify-around md:p-4"
    >
      <div
        className="flex flex-col items-center gap-2 rounded-lg bg-[--clr-prim] p-4 text-sm md:text-base"
        key={id}
      >
        <h4 className="w-full font-semibold uppercase">{element}</h4>
        {/* <input
          {...register("nomeSezione")}
          value={element}
          className="hidden"
        /> */}
        <div className="flex h-full w-full items-center justify-around gap-2">
          <label htmlFor="isVisibleYES" className="w-full">
            Attivo
          </label>
          <input
            {...register("isVisible")}
            checked={isVisible}
            id="isVisibleYES"
            value={1}
            className="w-4"
            type="radio"
            name="isVisible"
          />
          <label htmlFor="isVisibleNO" className="w-full">
            Disattivo
          </label>
          <input
            {...register("isVisible")}
            checked={!isVisible}
            id={"isVisibleNO"}
            value={0}
            className="w-4"
            type="radio"
            name="isVisible"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-sky-700 py-1 font-normal hover:bg-sky-600"
      >
        Salva
      </button>
    </form>
  );
};

export default FormImpostazioni;
