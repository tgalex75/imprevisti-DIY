import React, { useState, useContext } from "react";
import { CartContext } from "../context/regContext";
import { MdHome, MdMenu, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import pdfLink from "../assets/pdf/istruzioni.pdf";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";

const Navbar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const { sezioniAttive, defaultValues } = useContext(CartContext);

  const isVisibleArray = sezioniAttive?.map((number) => number.isVisible) || defaultValues


  const handleClick = () => {
    setIsOpenMenu((prevMenu) => !prevMenu);
  };

  const dettagliMenu = [
    { id: 1, voceLi: "Home", linkTo: "/" },
    { id: 2, voceLi: "Prepartita", linkTo: "/prepartita", isVisible: isVisibleArray[0], },
    { id: 3, voceLi: "Settimanale", linkTo: "/settimana", isVisible: isVisibleArray[1], },
    {
      id: 4,
      voceLi: "Serie Negativa",
      linkTo: "/serie-negativa", isVisible: isVisibleArray[2],
    },
    { id: 5, voceLi: "Rinnovi", linkTo: "/rinnovi", isVisible: isVisibleArray[3], },
    { id: 6, voceLi: "Ingaggi", linkTo: "/ingaggi", isVisible: isVisibleArray[4], },
    { id: 7, voceLi: "Mercato", linkTo: "/mercato", isVisible: isVisibleArray[5], },
    { id: 8, voceLi: "Media Overall", linkTo: "/calcolo-media" },
    { id: 10, voceLi: "Editor Imprevisti", linkTo: "/editor-imprevisti" },
    { id: 11, voceLi: "Impostazioni App", linkTo: "/impostazioni" },
    { id: 12, voceLi: "Istruzioni", linkTo: pdfLink, target: "_blank" },
  ];

  //Sostituire div con <Link> from react-router
  const linksMenu = dettagliMenu.map((voce) => {
    return (
      <div key={voce.id} className={`${voce.isVisible === 0 && "hidden"}`}>
        <Link to={voce.linkTo} target={voce?.target}>
          <motion.li
            layout
            whileHover={{ scale: 1.2 }}
            transition={{
              type: "spring",
              duration: 0.4,
              ease: "easeIn",
              stiffness: 200,
            }}
            className="p-4 px-8 text-lg font-bold uppercase hover:text-[--clr-sec] md:text-xl"
          >
            {voce.voceLi}
          </motion.li>
        </Link>
      </div>
    );
  });

  return (
    <nav className="fixed z-[1000] flex h-auto w-full items-center justify-between px-2 py-1 md:px-6 md:py-3">
      <div
        style={isMobile ? { visibility: "hidden" } : {}}
        className="flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-gray-300/30"
      >
        <Link to="/">
          <MdHome
            size={36}
            style={
              isOpenMenu
                ? { display: "none" }
                : {
                    filter: "drop-shadow(.25rem .25rem 0.15rem #222)",
                  }
            }
            className="fill-gray-300 hover:fill-gray-200"
          />
        </Link>
      </div>
      <div className="flex cursor-pointer items-center justify-center rounded-full p-1 hover:bg-gray-300/30 md:p-2">
        {!isOpenMenu ? (
          <MdMenu
            size={isMobile ? 28 : 36}
            style={{
              filter: "drop-shadow(.25rem .25rem 0.15rem #222)",
            }}
            className="fill-gray-300 hover:fill-gray-200"
            onClick={handleClick}
          />
        ) : (
          <MdClose
            size={isMobile ? 28 : 36}
            className="fill-gray-300 hover:fill-gray-200"
            onClick={handleClick}
          />
        )}
        <ul
          style={isOpenMenu ? { right: 0 } : { right: "-100%" }}
          onClick={handleClick}
          className="absolute top-0 z-[-1] flex h-screen w-full flex-col items-center justify-start bg-black/95 py-2 text-center text-gray-300 transition-[0.5s] md:w-[30vw] md:justify-around md:gap-2 md:py-2"
        >
          {linksMenu}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
