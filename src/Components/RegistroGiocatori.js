import { motion } from "framer-motion";
import { MdClear, MdChevronLeft } from "react-icons/md";

const RegistroGiocatori = (props) => {
  const {
    registroGiocatori,
    deleteListDB,
    removeVociRegistro,
    tipoImprevisto,
    isHidden,
    setIsHidden
  } = props;
  const handleToggle = ()=> setIsHidden(prev => !prev)
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className={`absolute ${isHidden ? "-left-full" : "left-1"} top-1/2 hidden duration-700 h-[99%] w-[20vw] z-1 -translate-y-1/2 flex-col items-center justify-between overflow-hidden rounded-lg bg-black/50 pt-2 text-gray-300 md:flex md:flex-col`}
      >
        <h6 className="uppercase text-[--clr-prim]">Registro Giocatori</h6>
        <ul className="flex h-full w-full flex-col gap-1 overflow-y-auto pb-2">
          {registroGiocatori?.map((el) => (
            <li
              key={el.id}
              style={
                el.tipo === tipoImprevisto
                  ? { borderLeft: "3px solid var(--clr-sec)" }
                  : {}
              }
              className="flex items-center justify-between bg-gray-700/20 ps-1 text-left text-[0.7rem] uppercase"
            >
              {el.name} - {el.description} - {el.tipo}
              <MdClear
                size={18}
                className="cursor-pointer fill-red-700 transition-all hover:scale-125 hover:fill-red-600"
                onClick={() => removeVociRegistro(el.id)}
              />
            </li>
          ))}
        </ul>
        <button
          className="block h-8 w-full bg-[--clr-prim]"
          onClick={deleteListDB}
        >
          Resetta lista
        </button>
      </motion.div>
      <MdChevronLeft size={52} color="var(--clr-prim)" className={`hidden md:block ${isHidden ? "rotate-180 left-1 blink" : "left-[19vw] rotate-0"} hover:scale-125 duration-700 -z-1 cursor-pointer absolute top-1/2 -translate-y-1/2 transition-all`} onClick={handleToggle} />
    </>
  );
};

export default RegistroGiocatori;
