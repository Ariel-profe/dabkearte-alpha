"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";

import { useOutsideClick } from "@/hooks/use-outside";
import {SparklesText} from "../ui/sparkles-text";
import { team } from "@/lib/utils";

export function Team() {
  const [active, setActive] = useState<(typeof team)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <section className="bg-slate-950 py-20" id="equipo">
      <SparklesText text="El team DabkeArte" className="container px-3 text-center lg:text-end" />
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-10 w-10"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div className="h-full">
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p 
                      className="text-primary text-xl"
                      layoutId={`description-${active.description}-${id}`}
                    >
                      {active.description}
                    </motion.p>
                  </div>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-slate-600 text-md h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

        {/* TeamCard */}
      <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mx-auto w-full gap-4 container px-3">
        {team.map((card, index) => (
         <motion.div
         layoutId={`card-${card.title}-${id}`}
         key={`card-${card.title}-${id}`}
         onClick={() => setActive(card)}
         className="p-2 flex flex-col md:flex-row justify-between items-center hover:bg-primary rounded-xl cursor-pointer"
       >
         <div className="flex gap-4 flex-col md:flex-row items-center md:items-start">
           <motion.div layoutId={`image-${card.title}-${id}`}>
             <img
               src={card.src}
               alt={card.title}
               className="h-14 w-14 md:h-24 md:w-24 rounded-lg object-cover object-top"
             />
           </motion.div>
           <div className="">
             <motion.h3
               layoutId={`title-${card.title}-${id}`}
               className="font-medium text-slate-200 text-center md:text-left"
             >
               {card.title}
             </motion.h3>
             <motion.p
               layoutId={`description-${card.description}-${id}`}
               className="text-slate-400 text-center md:text-left"
             >
               {card.description}
             </motion.p>
           </div>
         </div>
         <motion.button
           layoutId={`button-${card.title}-${id}`}
           className="hidden md:block px-4 py-2 text-xl rounded-full font-bold bg-golden hover:bg-primary hover:text-secondary text-black mt-4 md:mt-0"
         >
           <MdArrowOutward />
         </motion.button>
       </motion.div>
        ))}
      </ul>
    </section>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};


