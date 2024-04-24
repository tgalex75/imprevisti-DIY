import React from "react";

const ModuloTattica = (props) => {
  const { arr, start, end, giocatoreNum, func, placeholder, val } = props;

  return (
    <div className="flex items-center justify-center gap-2">
      {arr.slice(start, end).map((el) => {
        return (
          <div
            key={el.id}
            className={`flex flex-col items-center ${
              end - start > 3 && "first:mb-4 last:mb-4"
            }`}
          >
            <label
              htmlFor={`p${el.id}`}
              className="md:text-md block text-xs md:text-sm font-semibold text-[--clr-text]"
            >
              {giocatoreNum} {el.nome}
            </label>
            <select
              id={`p${el.id}`}
              name={`p${el.nome}`}
              onChange={func}
              className="my-2 w-16 rounded-lg border-2 border-transparent bg-[--clr-prim] p-2 text-xs md:text-sm font-semibold text-gray-800 hover:border-gray-200 md:w-44 md:text-md"
            >
              <option value="">{placeholder}</option>
              {val.map((num) => (
                <option key={num} value={num} className="text-xl">
                  {num}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
};

export default ModuloTattica;
