import { MdInfoOutline } from "react-icons/md";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const WelcomeModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    let returningUser = localStorage.getItem("avvisoModale");
    setIsModalOpen(!returningUser);
  }, []);

  const chiudiModale = () => {
    localStorage.setItem("avvisoModale", true);
    setIsModalOpen(false);
  };

  return (
    isModalOpen && (
      <>
        <motion.div
          className="fixed left-1/2 top-1/2 z-[1001] flex h-4/5 w-4/5 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-6 rounded-xl border-8 border-[--clr-prim] bg-[--clr-ter]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeOut", delay: .5, duration: .7, type : "spring"}}
        >
          <MdInfoOutline size={56} />
          <h2 className="bold font-H2 text-6xl">Benvenuta/o!</h2>
          <p className="w-3/4 md:w-1/2 text-center font-Descr text-2xl">
            Apri il menu in alto a destra e clicca su{" "}
            <span className="font-bold">ISTRUZIONI</span> per iniziare a
            padroneggiare la Web App!
          </p>
          <button
            className="w-3/4 md:w-1/3 rounded-lg bg-[--clr-prim] px-4 py-2 text-xl font-semibold"
            onClick={chiudiModale}
          >
            Ok... ho capito!
          </button>
        </motion.div>
      </>
    )
  );
};

export default WelcomeModal;
