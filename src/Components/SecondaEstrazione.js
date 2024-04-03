import React, { useState, useRef } from "react";
import firstkit from "../assets/imgs/blu.png";
import awaykit from "../assets/imgs/white.png";
import gkKit from "../assets/imgs/gray.png";
import IndicatoreGiocatoriImpr from "./IndicatoreGiocatoriImpr";
import { isMobile } from "react-device-detect";
import random from "random";
import pickRandom from "pick-random";
import { numberArrayFromRange } from "number-array-from-range";

const SecondaEstrazione = () => {
  const [inputFieldRosa, setInputFieldRosa] = useState(null);
  const [inputFieldEstratti, setInputFieldEstratti] = useState(null);
  const refEstratti = useRef(null);
  const refRosa = useRef(null);

  const handleRefEstratti = () => {
    setInputFieldEstratti(
      parseInt(refEstratti.current.value) <= 10
        ? parseInt(refEstratti.current.value)
        : 10,
    );
  };

  const handleRefRosa = () => {
    setInputFieldRosa(parseInt(refRosa.current.value));
  };

  const [secondExtractedNumber, setSecondExtractedNumber] = useState(null);

  const [randomJersey, setRandomJersey] = useState(null);

  const teamKits = [firstkit, awaykit];

  const genSecondRandomNumber = () => {
    const playersArray = numberArrayFromRange(1, inputFieldRosa);
    setSecondExtractedNumber(
      pickRandom(playersArray, { count: inputFieldEstratti }),
    );
    setRandomJersey(random.choice(teamKits));
  };

  return (
    <section className="flex h-[50dvh] w-full items-center justify-around gap-2 rounded-md border-2 border-gray-300/20 px-1 md:h-[40dvh] md:min-h-[50%] md:px-8">
      <div className="absolute right-1/2 top-1/2 flex h-fit translate-x-1/2 scale-75 flex-col items-center justify-around gap-2 rounded-lg px-2 md:right-12 md:top-1/4 md:translate-x-0 md:scale-100 md:gap-4">
        <div className="flex w-full flex-col items-center justify-around gap-2">
          <label
            htmlFor="name-with-label"
            className="self-start text-xs text-gray-300 md:text-sm"
          >
            A chi toccherà oggi?
          </label>
          <input
            onChange={handleRefEstratti}
            ref={refEstratti}
            type="number"
            id="input-giocatori-estratti"
            className="md:text-md min-h-[2rem] w-full flex-1 appearance-none rounded-lg border-gray-300 bg-white px-4 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-4 focus:ring-sky-700 md:min-h-[3rem] "
            name="randomPlayerNum"
            placeholder="Quanti estratti? (max 10)"
          />
          <input
            onChange={handleRefRosa}
            ref={refRosa}
            type="number"
            id="rosa-quanti-giocatori"
            className="md:text-md min-h-[2rem] w-full flex-1 appearance-none rounded-lg border-gray-300 bg-white px-4 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-4 focus:ring-sky-700 md:min-h-[3rem] "
            name="randomPlayerNum"
            placeholder="Su quanti giocatori?"
          />
        </div>
        <button
          type="button"
          onClick={genSecondRandomNumber}
          className="min-h-[2rem] w-full rounded-lg bg-sky-700 px-4 text-center text-sm font-semibold text-gray-100 shadow-md transition duration-200 ease-in hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-[--clr-ter] focus:ring-offset-2 focus:ring-offset-sky-800 md:h-12 "
        >
          Estrai
        </button>
      </div>
      {secondExtractedNumber && (
        <>
          <div
            id="extractedPlayers"
            className="flex h-full w-full flex-wrap items-center justify-around rounded-lg md:self-start"
          >
            {secondExtractedNumber.map((player, idx) => {
              return (
                <div
                  key={"playerNumber." + idx}
                  className={`flex w-1/5 items-center justify-center overflow-hidden rounded bg-contain bg-center bg-no-repeat transition-all ${inputFieldEstratti > 5 ? "h-1/3 md:h-1/2" : "h-1/2 md:h-full"}`}
                  style={{
                    backgroundImage:
                      player === 1 ? `url(${gkKit})` : `url(${randomJersey})`,
                  }}
                >
                  <span
                    className={`block pt-2 font-['Oswald'] text-4xl font-bold md:text-7xl ${randomJersey === awaykit ? "text-[--clr-ter]" : "text-gray-300"}`}
                  >
                    {player}
                  </span>
                </div>
              );
            })}
          </div>
          {!isMobile && (
            <IndicatoreGiocatoriImpr extractedPlayer={secondExtractedNumber} />
          )}
        </>
      )}
    </section>
  );
};

export default SecondaEstrazione;
