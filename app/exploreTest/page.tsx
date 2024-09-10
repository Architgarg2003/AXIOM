"use client";

// import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from 'react';
import { Separator } from "@/components/ui/separator";
import { Button } from "@nextui-org/react"
import { Plus } from "lucide-react"
import Featured from "@/components/Featured";
import GeneratedTests from "@/components/GeneratedTests";
import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation"
import NewModal  from "@/components/NewModal"
import { useAction, useMutation, useQuery } from "convex/react";
import { useLoader } from "../LoaderContext";
import { api } from "../../convex/_generated/api"
import Loader from "@/components/ui/Loader";
import { useRouter } from 'next/navigation';

const Test = () => {

  const { userId } = useAuth();
  const { user } = useUser();
  const [questions, setQuestions] = useState<any>(null)
  const [jobDescription, setJd] = useState<string>("")
  const [resume, setResume] = useState<string>("")
  const [jobTitle, setJobTitle] = useState<string>("")
  const [companyName, setCompanyName] = useState<string>("")
  const [difficulty, setDifficulty] = useState<string>("")
  const [routeId, setRouteId] = useState<string | null>(null); // Update state type to accept string

  const generateMCQ = useAction(api.create_mcq.generateMCQ);
  const pushMCQ = useMutation(api.create_mcq.push_mcq);
  const generateTags = useAction(api.GetTags.getTags);
  const createCards = useMutation(api.CreateCard.Create_card);
  const createEmbedding = useAction(api.createEmbedding.createEmbeddings);
  const allCards = useQuery(api.getAllGeneratedCards.getAllGeneratedCards);
  const heatmapfunction = useMutation(api.PushHeatMap.handleDailyInteraction);
  const LeaderBoardEntry = useMutation(api.LeaderBoard.ensureLeaderboardEntry);
  const InitializeTodaysEntry = useMutation(api.PushHeatMap.onLoginInteraction);
  console.log(allCards);

  // const fetchTest = useQuery(api.GetTest.getTestData)
  const { showLoader, hideLoader } = useLoader();

 

  const router = useRouter();

  if (!userId) {
      redirect("/sign-in");
  }
  const name = user?.firstName;

  useEffect(() => {
    async function  heat() {
      if (userId && name){
        const handleHeatMap = await heatmapfunction({ userId });
        console.log("heatmap: ",handleHeatMap);
        
        const handleLeaderBoard = await LeaderBoardEntry({ userId: userId, username: name  });
        console.log("leaderboard: ", handleLeaderBoard);

        const handleTodayHeat = await InitializeTodaysEntry({userId});
        console.log("handleTodayHeat:", handleTodayHeat);
      }
    }
    heat();
  }, [])


   const handleGenerateMCQ = async () => {
        showLoader();
        try {
            if (!userId) {
                console.error("User ID is not available");
                return;
            }

            const mcqArray = await generateMCQ({ jobTitle, jobDescription, resume, difficulty, companyName })
            setQuestions(mcqArray);
            console.log(mcqArray);

            const tags = await generateTags({ questions: mcqArray });
            console.log(tags);

          
            const testId = await pushMCQ({
                userId: userId,
                mcqArray: mcqArray,
            });
            setRouteId(testId); // This will now work without type error
            console.log("testId: ",testId);

            if (!testId) {
                console.error("test not pushed");
                return;
            }
            
            // const jobTitleEmbeddings = await createEmbedding({text:jobTitle})

            let jobTitleEmbedding;
            let embeddingsArray; // Declare embeddingsArray here
            try {
                jobTitleEmbedding = await createEmbedding({ text: jobTitle });
                console.log(jobTitleEmbedding?.values);
                if (!jobTitleEmbedding || !jobTitleEmbedding?.values) {
                    throw new Error('Invalid embedding response');
                }
                embeddingsArray = Array.isArray(jobTitleEmbedding?.values)
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
            console.log("cardId: ", cardId);


            // const test = await GET_TestData(testId);
            // console.log(test);
            if(cardId && testId){
              router.push(`/${testId}/start`)
            }
          

        } catch (error) {
            console.error("Error creating questions:", error)
        }
        // finally{
        //   hideLoader();
        // }
    }

    useEffect(()=>{
      if(routeId){
        router.push(`/${routeId}/start`);
        // hideLoader();
      }
    }, [routeId])


    if(!allCards){
      showLoader();
      return(
        <main className='h-full w-full'>
          <Loader />
        </main>
      )
    }
    hideLoader();
  

  return (
    <main className="h-full w-screen ">
      <div className="flex flex-row justify-between">
        <div className="p-10 pb-2">
          <h1 className="flex flex-col items-start gap-3">
            <span className="text-lg font-semibold text-gray-600">
              Welcome to
            </span>
            <span className="text-4xl font-bold text-[#7c3aed] flex flex-row gap-2">
              Axiom
              <span className="text-black">
                Tests
              </span>

            </span>
          </h1>
        </div>
        <div className="px-20 py-[4.5rem] pb-2">
          <NewModal handleGenerateMCQ={handleGenerateMCQ} setJd={setJd} setResume={setResume} setJobTitle={setJobTitle} setCompanyName={setCompanyName} setDifficulty={setDifficulty}/>
        </div>
      </div>
      <div>
        <Separator className="bg-gray-400 w-[92%] ml-10" />
      </div>
      <Featured />
      <GeneratedTests allCards={allCards}/>
      <Loader/>
    </main>
  );
};

export default Test;