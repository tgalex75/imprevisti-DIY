import { MdInfoOutline, MdClose } from "react-icons/md";
import { useState } from "react";
import { motion } from "framer-motion";
import ImageUploader from "./ImageUploader";

const EditImage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    isModalOpen && (
      <>
        <motion.div
          className="fixed left-1/2 top-1/2 z-[1001] flex h-4/5 w-4/5 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-6 rounded-xl border-8 border-[--clr-prim] bg-[--clr-bg]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeOut", delay: .5, duration: .7, type : "spring"}}
        >
          <MdInfoOutline size={56} />
         <ImageUploader />
          <MdClose size={28} className="absolute top-2 right-2 cursor-pointer" onClick={()=>setIsModalOpen(false)}/>
        </motion.div>
      </>
    )
  );
};

export default EditImage;
