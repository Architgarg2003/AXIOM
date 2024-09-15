// "use client";

// import { useUser } from "@clerk/nextjs";
// import React from 'react';
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@nextui-org/react"
// import { Plus } from "lucide-react"
// import Featured from "@/components/Featured";
// import GeneratedTests from "@/components/GeneratedTests";
// import { useAuth } from "@clerk/nextjs";
// import { redirect } from "next/navigation"
// import NewModal  from "@/components/NewModal"
// import Heading from "@/components/ui/Heading";
// import { useRouter } from "next/navigation";
// import { api } from "@/convex/_generated/api";
// import { useQuery } from "convex/react";
// import BucketCards from "./components/BucketCards";

// const BucketList = () => {
//   const router = useRouter();

//   const { userId } = useAuth() as {userId : string};


//   if (!userId) {
//       router.push('/')
//   }

//   const testList = useQuery(api.wishlist.getUserBucket,{userId});
//   console.log(testList);

//   return (
//     <main className="h-full w-screen ">
//       <div className="flex flex-row justify-between">
//         <div className="p-10 pb-2">
//           <h1 className="flex flex-col items-start gap-3">
//             <span className="text-lg font-semibold text-gray-600">
//               Your
//             </span>
//             <span className="text-4xl font-bold text-[#7c3aed] flex flex-row gap-2">
//               Axiom
//               <span className="text-black">
//                 Bucketlist
//               </span>

//             </span>
//           </h1>
//         </div>
//       </div>
//       <div>
//         <Separator className="bg-gray-400 w-[92%] ml-10" />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 p-4">
//         {/* <!-- Example grid item --> */}
//         <div className="p-4 border border-gray-200 bg-gray-100">
//           Item 1
//         </div>
//         <BucketCards/>
//         <div className="p-4 border border-gray-200 bg-gray-100">
//           Item 2
//         </div>
//         <div className="p-4 border border-gray-200 bg-gray-100">
//           Item 3
//         </div>
//         <div className="p-4 border border-gray-200 bg-gray-100">
//           Item 1
//         </div>
//         <div className="p-4 border border-gray-200 bg-gray-100">
//           Item 2
//         </div>
//         <div className="p-4 border border-gray-200 bg-gray-100">
//           Item 3
//         </div>
//         {/* <!-- Add more grid items as needed --> */}
//       </div>


//     </main>
//   );
// };

// export default BucketList;






// "use client";

// import { useUser } from "@clerk/nextjs";
// import React from 'react';
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@nextui-org/react";
// import { Plus } from "lucide-react";
// import Featured from "@/components/Featured";
// import GeneratedTests from "@/components/GeneratedTests";
// import { useAuth } from "@clerk/nextjs";
// import { redirect } from "next/navigation";
// import NewModal from "@/components/NewModal";
// import Heading from "@/components/ui/Heading";
// import { useRouter } from "next/navigation";
// import { api } from "@/convex/_generated/api";
// import { useQuery } from "convex/react";
// import BucketCards from "./components/BucketCards";
// import { useLoader } from "../LoaderContext";
// import dynamic from 'next/dynamic';

// const Loader = dynamic(() => import('@/components/ui/Loader'), { ssr: false });

// const BucketList = () => {
//   const router = useRouter();

//   const { userId } = useAuth() as { userId: string };

//   if (!userId) {
//     router.push('/');
//     return null; // Ensure the component doesn't render when redirecting
//   }

//   const testList = useQuery(api.wishlist.getUserBucket, { userId });
//   // console.log(testList);
//   const { showLoader, hideLoader } = useLoader();

//   if(!testList){
//     showLoader();
//   }else{
//     hideLoader();
//   }

//   return (
//     <main className="h-full w-screen ">
//       <div className="flex flex-row justify-between">
//         <div className="p-10 pb-2">
//           <h1 className="flex flex-col items-start gap-3">
//             <span className="text-lg font-semibold text-gray-600">
//               Your
//             </span>
//             <span className="text-4xl font-bold text-[#7c3aed] flex flex-row gap-2">
//               Axiom
//               <span className="text-black">
//                 Bucketlist
//               </span>
//             </span>
//           </h1>
//         </div>
//       </div>
//       <div>
//         <Separator className="bg-gray-400 w-[92%] ml-10 " />
//       </div>
//       <div className="px-20 pr-32 mt-10">
//         <h1 className="text-2xl font-semibold">Stared Test</h1>
//         <Separator className="bg-gray-400 w-full " />
//         {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 p-4"> */}
//           {/* Map over the testList to render BucketCards */}
//           {testList?.map((item: { cardId: string }) => (
//             <div key={item.cardId}  className="  flex items-center flex-col overflow-hidden overflow-x-scroll">
//               <BucketCards   cardId={item.cardId} />
//             </div>
//           ))}
//         {/* </div> */}
//       </div>
//       <Loader/>
      
//     </main>
//   );
// };

// export default BucketList;





"use client";

import { useUser } from "@clerk/nextjs";
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Button } from "@nextui-org/react";
import { Plus } from "lucide-react";
import Featured from "@/components/Featured";
import GeneratedTests from "@/components/GeneratedTests";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import NewModal from "@/components/NewModal";
import Heading from "@/components/ui/Heading";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import BucketCards from "./components/BucketCards";
import { useLoader } from "../LoaderContext";
import dynamic from 'next/dynamic';

const Loader = dynamic(() => import('@/components/ui/Loader'), { ssr: false });

const BucketList = () => {
  const router = useRouter();

  const { userId } = useAuth() as { userId: string };

  if (!userId) {
    router.push('/');
    return null; // Ensure the component doesn't render when redirecting
  }

  const testList = useQuery(api.wishlist.getUserBucket, { userId });
  const InterviewList = useQuery(api.InterviewWishlist.getUserBucket, { userId });


  const { showLoader, hideLoader } = useLoader();

  if (!testList) {
    showLoader();
  } else {
    hideLoader();
  }

  return (
    <main className="h-full w-screen">
      <div className="flex flex-row justify-between">
        <div className="p-10 pb-2">
          <h1 className="flex flex-col items-start gap-3">
            <span className="text-lg font-semibold text-gray-600">
              Your
            </span>
            <span className="text-4xl font-bold text-[#7c3aed] flex flex-row gap-2">
              Axiom
              <span className="text-black">
                Bucketlist
              </span>
            </span>
          </h1>
        </div>
      </div>
      <div>
        <Separator className="bg-gray-400 w-[92%] ml-10" />
      </div>
      <div className="px-20 pr-32 mt-10">
        <h1 className="text-2xl font-semibold">Starred Test</h1>
        <Separator className="bg-gray-400 w-full" />
        {/* Add horizontal scrolling for the whole card deck */}
        <div className="overflow-x-auto w-full">
          <div className="flex space-x-4 p-4">
            {testList?.map((item: { cardId: string }) => (
              <div key={item.cardId} className="flex-shrink-0">
                <BucketCards cardId={item.cardId} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="px-20 pr-32 mt-10">
        <h1 className="text-2xl font-semibold">Starred Interview</h1>
        <Separator className="bg-gray-400 w-full" />
        {/* Add horizontal scrolling for the whole card deck */}
        <div className="overflow-x-auto w-full">
          <div className="flex space-x-4 p-4">
            {InterviewList?.map((item: { cardId: string }) => (
              <div key={item.cardId} className="flex-shrink-0">
                <BucketCards isInterview={true} cardId={item.cardId} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Loader />
    </main>
  );
};

export default BucketList;
