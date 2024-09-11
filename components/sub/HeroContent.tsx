

// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import {
//   slideInFromLeft,
//   slideInFromRight,
//   slideInFromTop,
// } from "@/utils/motion";
// import { SparklesIcon } from "@heroicons/react/24/solid";
// import Image from "next/image";
// import Link from "next/link";

// const HeroContent = () => {
//   return (
//     <motion.div
//       initial="hidden"
//       animate="visible"
//       className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
//     >
//       <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
//         {/* <motion.div
//           variants={slideInFromTop}
//           className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
//         >
//           <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
//           <h1 className="Welcome-text text-[13px]">
//             Introducing AXIOM: Beyond Doubt
//           </h1>
//         </motion.div> */}

//         <motion.div
//           variants={slideInFromLeft(0.5)}
//           className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
//         >
//           <span>
//             Empowering You with
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
//               {" "}
//               AI-Powered Tests & Interview Prep{" "}
//             </span>
//             {/* Tailored for Success */}
//           </span>
//         </motion.div>

//         <motion.p
//           variants={slideInFromLeft(0.8)}
//           className="text-lg text-gray-400 my-5 max-w-[600px]"
//         >
//           Axiom is your personal platform for AI-driven assessments and
//           interviews, crafted from your resume and designed to boost your career
//           journey. Step into our gamified world and collaborate with peers.
//         </motion.p>
//         <motion.a
//           variants={slideInFromLeft(1)}
//           className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
//         >
//          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
//           <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
//           <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
//            <a href={'/sign-in'}>Get Started!</a>
//           </span>
//       </button>
//         </motion.a>
//       </div>

//       <motion.div
//         variants={slideInFromRight(0.8)}
//         className="w-full h-full flex justify-center items-center"
//       >
//         <Image
//           src="/icon.png"
//           alt="work icons"
//           height={750}
//           width={750}
//         />
//       </motion.div>
//     </motion.div>
//   );
// };

// export default HeroContent;




"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        {/* <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Introducing AXIOM: Beyond Doubt
          </h1>
        </motion.div> */}

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span>
            Empowering You with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {" "}
              AI-Powered Tests & Interview Prep{" "}
            </span>
            {/* Tailored for Success */}
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-5 max-w-[600px]"
        >
          Axiom is your personal platform for AI-driven assessments and
          interviews, crafted from your resume and designed to boost your career
          journey. Step into our gamified world and collaborate with peers.
        </motion.p>

        <motion.div
          variants={slideInFromLeft(1)}
          className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
        >
          <Link href="/sign-in">
            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Get Started!
              </span>
            </button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        <Image
          src="/icon.png"
          alt="work icons"
          height={750}
          width={750}
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
