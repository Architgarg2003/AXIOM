// "use client"; // Ensures the component is client-side only

// import React, { useEffect, useState } from 'react';
// import { Separator } from "@/components/ui/separator";
// // import Featured from "@/components/Featured";
// // import GeneratedTests from "@/components/GeneratedTests";
// import { useAuth, useUser } from "@clerk/nextjs";
// // import NewModal from "@/components/NewModal";
// import { useAction, useMutation, useQuery } from "convex/react";
// import { useLoader } from "../LoaderContext";
// import { api } from "../../convex/_generated/api";
// // import Loader from "@/components/ui/Loader";
// import { useRouter } from 'next/navigation';


// import dynamic from 'next/dynamic';

// const Loader = dynamic(() => import('@/components/ui/Loader'), { ssr: false });
// const NewModal = dynamic(() => import('@/components/NewModal'), { ssr: false });
// const GeneratedTests = dynamic(() => import('@/components/GeneratedTests'), { ssr: false });
// const Featured = dynamic(() => import('@/components/Featured'), { ssr: false });

// const Test = () => {
//   const { userId } = useAuth();
//   const { user } = useUser();
//   const [questions, setQuestions] = useState<any>(null);
//   const [jobDescription, setJd] = useState<string>("");
//   const [resume, setResume] = useState<string>("");
//   const [jobTitle, setJobTitle] = useState<string>("");
//   const [companyName, setCompanyName] = useState<string>("");
//   const [difficulty, setDifficulty] = useState<string>("");
//   const [routeId, setRouteId] = useState<string | null>(null);

//   const generateMCQ = useAction(api.create_mcq.generateMCQ);
//   const pushMCQ = useMutation(api.create_mcq.push_mcq);
//   const generateTags = useAction(api.GetTags.getTags);
//   const createCards = useMutation(api.CreateCard.Create_card);
//   const createEmbedding = useAction(api.createEmbedding.createEmbeddings);
//   const allCards = useQuery(api.getAllGeneratedCards.getAllGeneratedCards);
//   const heatmapfunction = useMutation(api.PushHeatMap.handleDailyInteraction);
//   const LeaderBoardEntry = useMutation(api.LeaderBoard.ensureLeaderboardEntry);
//   const InitializeTodaysEntry = useMutation(api.PushHeatMap.onLoginInteraction);
//   const { showLoader, hideLoader } = useLoader();
//   const router = useRouter();

//   // Redirect if user is not authenticated
//   useEffect(() => {
//     if (!userId) {
//       router.push('/');
//     }
//   }, [userId, router]);

//   // Handle analytics and leaderboard updates
//   useEffect(() => {
//     async function handleAnalytics() {
//       if (userId && user?.firstName) {
//         await Promise.all([
//           heatmapfunction({ userId }),
//           LeaderBoardEntry({ userId, username: user.firstName }),
//           InitializeTodaysEntry({ userId })
//         ]);
//       }
//     }
//     handleAnalytics();
//   }, [userId, user?.firstName, heatmapfunction, LeaderBoardEntry, InitializeTodaysEntry]);

//   const handleGenerateMCQ = async () => {
//     showLoader();
//     try {
//       if (!userId) {
//         console.error("User ID is not available");
//         return;
//       }

//       const mcqArray = await generateMCQ({ jobTitle, jobDescription, resume, difficulty, companyName });
//       setQuestions(mcqArray);

//       const tags = await generateTags({ questions: mcqArray });
//       const testId = await pushMCQ({ userId, mcqArray });

//       if (!testId) {
//         console.error("Test not pushed");
//         return;
//       }

//       let jobTitleEmbedding;
//       let embeddingsArray;
//       try {
//         jobTitleEmbedding = await createEmbedding({ text: jobTitle });
//         if (!jobTitleEmbedding || !jobTitleEmbedding.values) {
//           throw new Error('Invalid embedding response');
//         }
//         embeddingsArray = Array.isArray(jobTitleEmbedding.values)
//           ? jobTitleEmbedding.values
//           : [jobTitleEmbedding.values];
//       } catch (error) {
//         console.error("Error creating embedding:", error);
//         return;
//       }

//       const cardId = await createCards({
//         tags,
//         companyName,
//         jobTitle,
//         jobDescription,
//         userId,
//         testId,
//         resume,
//         difficulty,
//         jobTitleEmbeddings: embeddingsArray
//       });

//       if (cardId && testId) {
//         router.push(`/${testId}/start`);
//       }
//     } catch (error) {
//       console.error("Error creating questions:", error);
//     } finally {
//       hideLoader();
//     }
//   };

//   // Handle loading state
//   useEffect(() => {
//     if (!allCards) {
//       showLoader();
//     } else {
//       hideLoader();
//     }
//   }, [allCards, showLoader, hideLoader]);

//   return (
//     <main className="h-full w-screen">
//       <div className="flex flex-row justify-between">
//         <div className="p-10 pb-2">
//           <h1 className="flex flex-col items-start gap-3">
//             <span className="text-lg font-semibold text-gray-600">Welcome to</span>
//             <span className="text-4xl font-bold text-[#7c3aed] flex flex-row gap-2">
//               Axiom <span className="text-black">Tests</span>
//             </span>
//           </h1>
//         </div>
//         <div className="px-20 py-[4.5rem] pb-2">
//           <NewModal
//             handleGenerateMCQ={handleGenerateMCQ}
//             setJd={setJd}
//             setResume={setResume}
//             setJobTitle={setJobTitle}
//             setCompanyName={setCompanyName}
//             setDifficulty={setDifficulty}
//           />
//         </div>
//       </div>
//       <div>
//         <Separator className="bg-gray-400 w-[92%] ml-10" />
//       </div>
//       <Featured />
//       <GeneratedTests allCards={allCards} />
//       <Loader />
//     </main>
//   );
// };

// export default Test;







"use client"; // Ensures the component is client-side only

import React, { useEffect, useState } from 'react';
import { Separator } from "@/components/ui/separator";
// import Featured from "@/components/Featured";
// import GeneratedTests from "@/components/GeneratedTests";
import { useAuth, useUser } from "@clerk/nextjs";
// import NewModal from "@/components/NewModal";
import { useAction, useMutation, useQuery } from "convex/react";
import { useLoader } from "../LoaderContext";
import { api } from "../../convex/_generated/api";
// import Loader from "@/components/ui/Loader";
import { useRouter } from 'next/navigation';


import dynamic from 'next/dynamic';

const Loader = dynamic(() => import('@/components/ui/Loader'), { ssr: false });
const NewModal = dynamic(() => import('@/components/NewModal'), { ssr: false });
const GeneratedTests = dynamic(() => import('@/components/GeneratedTests'), { ssr: false });
const Featured = dynamic(() => import('@/components/Featured'), { ssr: false });

const Test = () => {
  const { userId } = useAuth();
  const { user } = useUser();
  const [questions, setQuestions] = useState<any>(null);
  const [jobDescription, setJd] = useState<string>("");
  const [resume, setResume] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [routeId, setRouteId] = useState<string | null>(null);

  const generateMCQ = useAction(api.create_mcq.generateMCQ);
  const pushMCQ = useMutation(api.create_mcq.push_mcq);
  const generateTags = useAction(api.GetTags.getTags);
  const createCards = useMutation(api.CreateCard.Create_card);
  const createEmbedding = useAction(api.createEmbedding.createEmbeddings);
  const allCards = useQuery(api.getAllGeneratedCards.getAllGeneratedCards);
  const allFeaturedCards = useQuery(api.getAllFeaturedCards.getAllFeaturedCards);
  const heatmapfunction = useMutation(api.PushHeatMap.handleDailyInteraction);
  const LeaderBoardEntry = useMutation(api.LeaderBoard.ensureLeaderboardEntry);
  const InitializeTodaysEntry = useMutation(api.PushHeatMap.onLoginInteraction);
  const { showLoader, hideLoader } = useLoader();
  const router = useRouter();

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!userId) {
      router.push('/');
    }
  }, [userId, router]);

  // Handle analytics and leaderboard updates
  useEffect(() => {
    async function handleAnalytics() {
      if (userId && user?.firstName) {
        await Promise.all([
          heatmapfunction({ userId }),
          LeaderBoardEntry({ userId, username: user.firstName }),
          InitializeTodaysEntry({ userId })
        ]);
      }
    }
    handleAnalytics();
  }, [userId, user?.firstName, heatmapfunction, LeaderBoardEntry, InitializeTodaysEntry]);

  const handleGenerateMCQ = async () => {
    showLoader();
    try {
      if (!userId) {
        console.error("User ID is not available");
        return;
      }

      const mcqArray = await generateMCQ({ jobTitle, jobDescription, resume, difficulty, companyName });
      setQuestions(mcqArray);

      const tags = await generateTags({ questions: mcqArray });
      const testId = await pushMCQ({ userId, mcqArray });

      if (!testId) {
        console.error("Test not pushed");
        return;
      }

      let jobTitleEmbedding;
      let embeddingsArray;
      try {
        jobTitleEmbedding = await createEmbedding({ text: jobTitle });
        if (!jobTitleEmbedding || !jobTitleEmbedding.values) {
          throw new Error('Invalid embedding response');
        }
        embeddingsArray = Array.isArray(jobTitleEmbedding.values)
          ? jobTitleEmbedding.values
          : [jobTitleEmbedding.values];
      } catch (error) {
        console.error("Error creating embedding:", error);
        return;
      }

      const cardId = await createCards({
        tags,
        companyName,
        jobTitle,
        jobDescription,
        userId,
        testId,
        resume,
        difficulty,
        jobTitleEmbeddings: embeddingsArray
      });

      if (cardId && testId) {
        router.push(`/${testId}/start`);
      }
    } catch (error) {
      console.error("Error creating questions:", error);
    } finally {
      hideLoader();
    }
  };

  // Handle loading state
  useEffect(() => {
    if (!allCards && !allFeaturedCards) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [allCards, allFeaturedCards, showLoader, hideLoader]);

  return (
    <main className="h-full w-screen">
      <div className="flex flex-row justify-between">
        <div className="p-10 pb-2">
          <h1 className="flex flex-col items-start gap-3">
            <span className="text-lg font-semibold text-gray-600">Welcome to</span>
            <span className="text-4xl font-bold text-[#7c3aed] flex flex-row gap-2">
              Axiom <span className="text-black">Tests</span>
            </span>
          </h1>
        </div>
        <div className="px-20 py-[4.5rem] pb-2">
          <NewModal
            handleGenerateMCQ={handleGenerateMCQ}
            setJd={setJd}
            setResume={setResume}
            setJobTitle={setJobTitle}
            setCompanyName={setCompanyName}
            setDifficulty={setDifficulty}
          />
        </div>
      </div>
      <div>
        <Separator className="bg-gray-400 w-[92%] ml-10" />
      </div>
      <Featured allFeaturedCards={allFeaturedCards} />
      <GeneratedTests allCards={allCards} />
      <Loader />
    </main>
  );
};

export default Test;
