// "use client";
// import { useConvexAuth } from "convex/react";
// import Main from "@/components/main";
// import { UserButton } from "@clerk/clerk-react";
// import Link from "next/link";
// import { useState } from "react";
// import { useAuth } from "@clerk/clerk-react";
// import { redirect } from "next/navigation";

// export default function Home() {
//   const { isLoading, isAuthenticated } = useConvexAuth();
//   const { userId } = useAuth();

//   if(userId){
//     redirect('/exploreTest')
//   }
  
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {/* <Main /> */}
//       <main className="flex min-h-screen flex-col items-center justify-between P-24">
//         <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm flex">
//           <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//             Convex + Clerk + Next.js App Router Example
//           </p>
//           <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
//             {isAuthenticated ? (
//               <UserButton afterSignOutUrl="/" />
//             ) : (
//               <Link
//                 href="/sign-in"
//                 className="flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
//               >
//                 Sign In
//               </Link>
//             )}
//           </div>
//         </div>

//         <div className="relative flex place-items-center">
//           {isAuthenticated ? (
//             <div className="flex flex-col items-center">
//               <h1 className="text-4xl font-bold mb-4">Welcome, you are signed in!</h1>
//             </div>
//           ) : (
//             <h1 className="text-4xl font-bold">Welcome, please sign in!</h1>
//           )}
//         </div>

//         <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
//           {/* Add your content here */}
//         </div>
//       </main>
//     </div>
//   );
// }








"use client";
import { useConvexAuth } from "convex/react";
import Main from "@/components/main";
import { UserButton } from "@clerk/clerk-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { redirect } from "next/navigation";
import Encryption from "@/components/main/Encryption";
import Hero from "@/components/main/Hero";
import Projects from "@/components/main/Projects";
import Skills from "@/components/main/Skills";
import Loader from "@/components/ui/Loader";
import { useLoader } from "./LoaderContext";
import StarsCanvas from "@/components/main/StarBackground";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";

export default function Home() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { userId } = useAuth();
  const { showLoader, hideLoader } = useLoader();


  if (userId) {
    redirect('/exploreTest')
  }


  if (isLoading) {
    showLoader();
    return (
      <div>
        <Loader />
      </div>
    )
  }

  hideLoader();

  return (
    <div className="bg-[#030014] overflow-y-scroll overflow-x-hidden">
      <StarsCanvas />
      <Navbar />
      <div className="h-full w-full">
        <div className="flex flex-col gap-20">
          <Hero />
          <Skills />
          <Encryption />
          <Projects />
        </div>
      </div>
      <Footer />
    </div>
  );
}
