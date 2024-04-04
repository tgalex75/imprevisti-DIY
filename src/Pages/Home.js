import React from "react";
import { Link } from "react-router-dom";
import Img1 from "../assets/imgs/img1.jpg";
import Img2 from "../assets/imgs/img2.jpg";
import Img3 from "../assets/imgs/img3.jpg";
import Img4 from "../assets/imgs/img4.jpg";
import Img5 from "../assets/imgs/img5.jpg";
import { isMobile } from "react-device-detect";

const dettagliImprevisti = [
  { id: 1, impr: "Imprevisti prepartita", img: Img1, link: "/prepartita" },
  { id: 2, impr: "Imprevisti Settimanali", img: Img2, link: "/settimana" },
  {
    id: 3,
    impr: "Imprevisti serie negativa",
    img: Img3,
    link: "/serie-negativa",
  },
  {
    id: 4,
    impr: "Media Overall",
    img: Img4,
    link: "/calcolo-media",
  },
  {
    id: 5,
    impr: "Editor Imprevisti",
    img: Img5,
    link: "/editor-imprevisti",
  },
];

const Home = () => {
  return (
    <section className="flex h-full w-full flex-col flex-wrap items-center justify-around bg-stone-950 font-bold text-gray-800 md:flex-row md:flex-nowrap">
      {dettagliImprevisti.map((el) => (
        <div
          key={el.id}
          style={{
            boxShadow: "-12px 0px 10px -3px rgba(2,2,2,0.5)",
            zIndex: el.id,
          }}
          className="ease-[cubic-bezier(0.770, 0.000, 0.175, 1.000)] group flex h-1/5 w-full cursor-pointer items-center justify-start transition-all duration-500 hover:text-gray-300 md:h-full md:w-1/5 md:hover:h-full md:hover:w-full"
        >
          <h2
            style={{
              writingMode: isMobile ? "" : "vertical-lr",
              transform: isMobile ? "" : "rotate(180deg)",
              textShadow: "rgb(34, 34, 34) 0px 4px 4px",
            }}
            className="flex h-full w-1/5 items-center justify-center bg-[--clr-ter] px-4 text-center text-[1.7vw] font-bold uppercase text-gray-200 drop-shadow-lg transition-all group-hover:w-2/6 group-hover:border-l-[.35rem] group-hover:border-[--clr-ter] group-hover:bg-[--clr-prim] group-hover:px-6 md:w-auto md:justify-start md:px-2 md:ps-8 md:text-[2.2vw] md:group-hover:w-auto md:group-hover:border-l-[.5rem]"
          >
            {el.impr}
          </h2>
          <div
            style={{
              backgroundImage: `url(${el.img})`,
              /* height: "100vh", */
            }}
            className="flex h-full w-5/6 items-end justify-end bg-black/20 bg-cover bg-top bg-no-repeat grayscale transition-all group-hover:w-4/6 group-hover:grayscale-0 md:w-full md:bg-center md:group-hover:w-full "
          >
            <Link
              to={el.link}
              className="block h-full w-full bg-transparent"
            ></Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Home;
