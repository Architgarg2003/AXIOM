// "use client"

// import React from 'react'
// import {motion} from 'framer-motion'
// import { useInView } from 'react-intersection-observer'
// import Image from 'next/image';
// import { ContainerScroll } from '../ui/container-scroll-animation';
// import { slideInFromTop } from '@/utils/motion';

// const SkillDataProvider: React.FC = (): React.ReactNode => {
//   return (

//     <motion.div
//     initial="hidden"
//     animate="visible"
//     className="flex flex-col overflow-hidden"
//   >
//     <ContainerScroll
//       titleComponent={<>
//           <motion.h1
//             variants={slideInFromTop}
//             className="text-4xl md:text-5xl font-semibold text-white dark:text-white mb-4"
//           >
//             Discover the Future of <br />
//             <span className="text-5xl md:text-[8rem] font-bold mt-2 leading-none bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
//               AI-Driven Assessments
//             </span>
//           </motion.h1>
//       </>}
//       children={undefined}
//     >
//       {/* Uncomment and customize if needed */}
//       {/* <Image
//         src={`/linear.webp`}
//         alt="hero"
//         height={720}
//         width={1400}
//         className="mx-auto rounded-2xl object-cover h-full object-left-top"
//         draggable={false}
//       /> */}
//     </ContainerScroll>
//   </motion.div>
// );
// };





// export default SkillDataProvider



"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ContainerScroll } from "../ui/container-scroll-animation";
import { slideInFromTop } from "@/utils/motion";

const SkillDataProvider: React.FC = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col overflow-hidden"
    >
      <ContainerScroll
        titleComponent={
          <>
            <motion.h1
              variants={slideInFromTop}
              className="text-4xl md:text-5xl font-semibold text-white dark:text-white mb-4"
            >
              Discover the Future of <br />
              <span className="text-5xl md:text-[8rem] font-bold mt-2 leading-none bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
                AI-Driven Assessments
              </span>
            </motion.h1>
          </>
        }
      >
        {/* Customize the image as needed */}
        <Image
          src={`/pr.jpeg`}
          alt="hero"
          height={740}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </motion.div>
  );
};

export default SkillDataProvider;
