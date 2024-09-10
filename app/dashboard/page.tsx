"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from 'react';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Featured from "@/components/Featured";
import GeneratedTests from "@/components/GeneratedTests";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation"
import NewModal from "@/components/NewModal"
import GitMap from "./components/Heatmap";
import Greeting from './components/Greeting'
import RadialChart from "./components/RadialChart";
import AtsBoard from "./components/Meter";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Header from "./components/Header";
import Meter from "./components/Meter";
import { TestTables } from "./components/TestTables";
import { Leaderboard } from "./components/Leaderboard";
import Heading from "@/components/ui/Heading";
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Loader from "@/components/ui/Loader";
import { useLoader } from "../LoaderContext";


const Dashboard = () => {

  const { userId } = useAuth();

  if (!userId) {
      redirect("/sign-in");
  }

  const TotalInteractions = useQuery(api.TotalInteractions.Get_TotalInteraction, { userId: userId});
  console.log("TotalInteractions", TotalInteractions);

  const DailyInteraction = useQuery(api.DailyInteractions.Get_AllUserInteractions,{userId:userId});
  console.log("DailyInteraction", DailyInteraction);

  const getUserLeaderboardData = useQuery(api.LeaderBoard.getUserLeaderboardData, { userId: userId })
  console.log("getUserLeaderboardData", getUserLeaderboardData);

  const TopUsers = useQuery(api.LeaderBoard.getTopUsers);
  console.log("TopUsers",TopUsers);


  const AllUsers = useQuery(api.LeaderBoard.getAllUsers);
  console.log("AllUsers", AllUsers);
  

  const percentage = getUserLeaderboardData?.totalAccuracy

  const { showLoader, hideLoader } = useLoader();
  const [rank,setRank] = useState<number>();
  const [dailyStreak, setDailyStreak] = useState<number>();
  const [maxStreak, setMaxStreak] = useState<number>();

  if (!TotalInteractions && !DailyInteraction && !getUserLeaderboardData && !TopUsers){
    showLoader();
  }else{
    hideLoader()
  }


  // Global Rank

  useEffect(() => {
    if (Array.isArray(AllUsers)) {
      const calculateUserRank = () => {
        const userIndex = AllUsers.findIndex(entry => entry.userId === userId);
        if (userIndex === -1) throw new Error("User not found in the leaderboard");
        console.log("UserRank",userIndex + 1);
        setRank(userIndex + 1)
      };

      calculateUserRank(); // This will now accept a number

      const today = new Date();
      const userStreak = getUserDailyStreak(today);
      setDailyStreak(userStreak);

      // Maximum Streak
      const maxStreak = getMaxStreak();
      console.log("maxStreak",maxStreak);
      setMaxStreak(maxStreak);
    }
  }, [AllUsers]);


  const getUserDailyStreak = (date: any): number => { // Added return type
    const dailyInteractions = DailyInteraction?.filter(interaction =>
      interaction.date === date.toISOString().split('T')[0] &&
      interaction.userId === userId
    ) || []; // Default to an empty array if DailyInteraction is undefined
    return dailyInteractions.length > 0 ? 1 : 0; // Return 1 if there's a streak, otherwise 0
  };

  // const getMaxStreak = () => {
  //   const sortedDates = Array.from(new Set(DailyInteraction?.map(interaction => interaction.date))); // Convert Set to Array
  //   sortedDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  //   let maxStreak = 0;
  //   let currentStreak = 0;

  //   for (let i = 0; i < sortedDates.length; i++) {
  //     const currentDate = new Date(sortedDates[i]);
  //     const streak = getUserDailyStreak(currentDate);
  //     currentStreak += streak;
  //     maxStreak = Math.max(maxStreak, currentStreak);
  //   }

  //   return maxStreak;
  // };

  const getMaxStreak = () => {
    if (!DailyInteraction || DailyInteraction.length === 0) {
      return 0;
    }

    // Extract unique dates from DailyInteraction and sort them
    const sortedDates = Array.from(new Set(DailyInteraction.map(interaction => interaction.date)));
    sortedDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    let maxStreak = 0;
    let currentStreak = 0;
    let lastDate = null;

    // Iterate through sorted dates to calculate streak
    for (let i = 0; i < sortedDates.length; i++) {
      const currentDate = new Date(sortedDates[i]);

      if (lastDate) {
        // Check if the current date is the next consecutive day
        const expectedNextDate = new Date(lastDate);
        expectedNextDate.setDate(expectedNextDate.getDate() + 1);

        if (currentDate.getTime() === expectedNextDate.getTime()) {
          // Consecutive day, increment the streak
          currentStreak += 1;
        } else {
          // Break in streak, reset current streak
          currentStreak = 1; // Start new streak with current date
        }
      } else {
        // First date in the list, start with streak of 1
        currentStreak = 1;
      }

      // Update max streak if needed
      maxStreak = Math.max(maxStreak, currentStreak);

      // Update last date
      lastDate = currentDate;
    }

    return maxStreak;
  };

  


  return (                                                                                                                                                                                                                                                                                                                                                                                                                              
    <main className="  w-full px-10 ">
      <Header rank={rank} maxStreak={maxStreak} />
      <Separator className="bg-gray-400  " />
      <div className="flex mt-5 flex-col h-full w-full gap-5  p-5 bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 border border-slate-100 overflow-hidden overflow-x-scroll rounded-xl">
        <div>
          <div className="flex flex-row w-full items-start justify-between gap-3 overflow-hidden">
            <div className="w-[70%]">
              <GitMap totalInteractions={TotalInteractions} dailyInteractions={DailyInteraction || []}/>
            </div>
            <div className="w-[29%] flex flex-col gap-3">
              <Meter percentage={percentage ?? 0} title="Accuracy" />
              {/* <Meter percentage={50} title="Accuracy"/> */}
            </div>
          </div> 
        </div>
        <div className="w-full flex flex-row gap-3 h-[60rem] ">
          <div className="bg-white w-[70%] p-7 rounded-xl pt-10 ">
            <Heading>
              History
            </Heading>
            <Separator />
            <TestTables />
          </div>
          <div className="bg-white w-[29%] p-7 pt-10 rounded-xl -mt-[13.5rem]">
            <Heading>
              Leaderboard
            </Heading>
            <Separator />
            <Leaderboard TopUsers={TopUsers}/>
          </div>
        </div>
       
      </div>
      <Loader/>
    </main>
  );
};

export default Dashboard;