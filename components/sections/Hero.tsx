"use client";

import { useRef } from "react";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { heroImages } from "@/lib/utils";

export const Hero = () => {
  const firstRow = heroImages.slice(0, 5);
  const secondRow = heroImages.slice(5, 10);
  const thirdRow = heroImages.slice(10, 15);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <section
      id="#"
      ref={ref}
      className="h-[290vh] 2xl:h-[250vh] overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="space-y-5"
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-10 mt-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-10 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-10">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto pt-48 px-4 w-full left-0 top-0">
      <h1 className="text-5xl md:text-7xl font-bold dark:text-white">
        Somos <br /> Dabkearte Mendoza
      </h1>
      <p className="max-w-2xl text-lg md:text-xl mt-8 dark:text-neutral-200">
        Bailamos Dabke <br />
        Queremos que te enamores de esta danza, como lo estamos nosotros<br />
        Somos de Mendoza - Argentina. 
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    img: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      key={product.title}
      className="group/product h-80 2xl:h-96 w-[23rem] 2xl:w-[30rem] relative flex-shrink-0"
    >
      <div className="block group-hover/product:shadow-2xl">
        <img
          src={product.img}
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </div>
      <div className="absolute inset-0 h-full w-full opacity-0 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
