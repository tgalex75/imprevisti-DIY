import React, { useState, useRef, useEffect } from "react";
import { isMobile } from "react-device-detect";
import ModuloTattica from "../Components/ModuloTattica";
import {
  tattiche,
  mySelect,
  arrayRange,
  data,
  listaTattiche,
} from "../Funzioni/schemi";

const giocatoreNum = isMobile ? "G n. " : "Giocatore n. ";
const overallPlaceholder = isMobile ? "OV" : "Overall";

const MediaOverall = () => {
  const selectRef = useRef(null);
  const selectRefMassimale = useRef(null);

  const [schema, setSchema] = useState(() => {
    const saved = localStorage.getItem("schema");
    const initialValue = JSON.parse(saved);
    return initialValue || "4-2-1-3";
  });

  const [massimale, setMassimale] = useState(() => {
    const saved = localStorage.getItem("massimale");
    const initialValue = JSON.parse(saved);
    return initialValue || "2";
  });

  useEffect(() => {
    localStorage.setItem("schema", JSON.stringify(schema));
  }, [schema]);

  useEffect(() => {
    localStorage.setItem("massimale", JSON.stringify(massimale));
  }, [massimale]);

  const filteredTactics = listaTattiche.filter((item) => item.nome === schema);

  useEffect(() => {
    setValues(null);
  }, [schema]);

  const getSchema = () => {
    setSchema(selectRef.current.value);
  };

  const getMassimale = () => {
    setMassimale(selectRefMassimale.current.value);
  };

  let valoriOverall = arrayRange(58, 99, 1);

  const [values, setValues] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  let sum = 0;

  const calcolaMedia = () => {
    for (let i in values) {
      sum += parseFloat(values[i]);
    }
    return (sum / 11).toFixed();
  };

  const result = calcolaMedia();

  const tactics = (arr, func, val) => {
    return (
      <section
        id="schemi"
        className="absolute left-1/2 top-1/2 flex w-4/5 -translate-x-1/2 -translate-y-1/2 flex-col-reverse items-center"
      >
        {filteredTactics[0].formazione.map((el, i, array) => (
          <ModuloTattica
          key={i}
          arr={arr}
          start={el === 1 ? 0 : array[i - 1]}
          end={el}
          giocatoreNum={giocatoreNum}
          func={func}
          placeholder={overallPlaceholder}
          val={val}
          />
          ))}
          <h3 className="mb-6 text-2xl font-bold">{schema}</h3>
      </section>
    );
  };

  return (
    <>
      <main
        id="media--overall"
        className="flex h-full w-full flex-col items-center justify-between gap-4 bg-[--clr-cont] py-4"
      >
        <h1 className="relative pb-4">Media Overall</h1>
        <div className="absolute translate-x-1/2 md:translate-x-0 right-1/2 md:right-2 top-12 scale-75 md:scale-100 md:top-1/3 flex flex-col gap-1 md:self-end md:pe-6">
          {mySelect("Scegli la tattica", selectRef, getSchema, tattiche)}
          {mySelect("Scegli il massimale", selectRefMassimale, getMassimale, [
            "+2",
            "+3",
            "+4",
            "+5",
          ])}
        </div>
        {schema && tactics(data, handleChange, valoriOverall)}
        <div
          style={result < 1 ? { visibility: "hidden" } : {}}
          className="rounded-xl border-2 border-[--clr-prim] px-8 text-center font-bold ring ring-inset ring-white/75 md:mb-4 md:me-8 md:self-end md:border-4 md:p-2 md:px-20"
        >
          <span className="text-md md:text-xl">Media:</span>
          <h4 className="text-5xl md:text-8xl">{result}</h4>
          <p className="md:text-lg text-md">
            Limite massimo: {parseInt(result) + parseInt(massimale)}
          </p>
          <small className="text-sm font-medium">
            Massimale applicato: +{parseInt(massimale)}
          </small>
        </div>
      </main>
    </>
  );
};

export default MediaOverall;
