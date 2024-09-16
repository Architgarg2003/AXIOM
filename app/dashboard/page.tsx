// "use client";

// import { useUser } from "@clerk/nextjs";
// import React, { useEffect, useState } from 'react';
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button"
// import { Plus } from "lucide-react"
// import Featured from "@/components/Featured";
// import GeneratedTests from "@/components/GeneratedTests";
// import { useAuth } from "@clerk/nextjs";
// import { redirect } from "next/navigation"
// import NewModal from "@/components/NewModal"
// import GitMap from "./components/Heatmap";
// import Greeting from './components/Greeting'
// import RadialChart from "./components/RadialChart";
// import AtsBoard from "./components/Meter";
// import { useRouter } from "next/navigation";
// import { UserButton } from "@clerk/nextjs";
// import Header from "./components/Header";
// import Meter from "./components/Meter";
// import { TestTables } from "./components/TestTables";
// import { Leaderboard } from "./components/Leaderboard";
// import Heading from "@/components/ui/Heading";
// import { useQuery } from 'convex/react';
// import { api } from '@/convex/_generated/api';
// import Loader from "@/components/ui/Loader";
// import { useLoader } from "../LoaderContext";


// const Dashboard = () => {

//   const { userId } = useAuth();


//   // if (!userId) {
//   //   redirect("/sign-in");
//   // }

//   const TotalInteractions = useQuery(api.TotalInteractions.Get_TotalInteraction, { userId: userId || "" });
//   console.log("TotalInteractions", TotalInteractions);

//   const DailyInteraction = useQuery(api.DailyInteractions.Get_AllUserInteractions, { userId: userId || "" });
//   console.log("DailyInteraction", DailyInteraction);

//   const getUserLeaderboardData = useQuery(api.LeaderBoard.getUserLeaderboardData, { userId: userId || "" })
//   console.log("getUserLeaderboardData", getUserLeaderboardData);

//   const TopUsers = useQuery(api.LeaderBoard.getTopUsers);
//   console.log("TopUsers",TopUsers);


//   const AllUsers = useQuery(api.LeaderBoard.getAllUsers);
//   console.log("AllUsers", AllUsers);

//   const UserTestHistory = useQuery(api.GetHistory.getTestHistoryById,{userId:userId || ''})
//   console.log("UserTestHistory", UserTestHistory);
  

//   const percentage = getUserLeaderboardData?.totalAccuracy

//   const { showLoader, hideLoader } = useLoader();
//   const [rank,setRank] = useState<number>();
//   const [dailyStreak, setDailyStreak] = useState<number>();
//   const [maxStreak, setMaxStreak] = useState<number>();

//   if (!TotalInteractions && !DailyInteraction && !getUserLeaderboardData && !TopUsers){
//     showLoader();
//   }else{
//     hideLoader()
//   }


//   // Global Rank

//   useEffect(() => {
//     if (Array.isArray(AllUsers)) {
//       const calculateUserRank = () => {
//         const userIndex = AllUsers.findIndex(entry => entry.userId === userId);
//         if (userIndex === -1) throw new Error("User not found in the leaderboard");
//         console.log("UserRank",userIndex + 1);
//         setRank(userIndex + 1)
//       };

//       calculateUserRank(); // This will now accept a number

//       const today = new Date();
//       const userStreak = getUserDailyStreak(today);
//       setDailyStreak(userStreak);

//       // Maximum Streak
//       // const maxStreak = getMaxStreak();
//       // console.log("maxStreak",maxStreak);
//       // setMaxStreak(maxStreak);
//     }
//   }, [AllUsers]);

//   useEffect(() => {
//     if (Array.isArray(DailyInteraction)) {
//       const calculateUserStreak = () => {
//         // Filter the DailyInteraction data for the current user
//         const userInteractions = DailyInteraction.filter(entry => entry.userId === userId && entry.count > 0);
  
//         if (userInteractions.length === 0) {
//           console.log("User Streak: 0");
//           setMaxStreak(0);
//           return;
//         }
  
//         // Sort the user's interactions by date (assuming date is in a parseable format)
//         const sortedInteractions = userInteractions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
//         let streak = 1; // Start the streak count at 1 for the first valid interaction
//         const oneDayMs = 24 * 60 * 60 * 1000; // Milliseconds in a day
  
//         for (let i = 1; i < sortedInteractions.length; i++) {
//           const currentDate = new Date(sortedInteractions[i].date);
//           const previousDate = new Date(sortedInteractions[i - 1].date);
  
//           // Check if the current date is exactly one day after the previous date
//           const dayDifference = (currentDate.getTime() - previousDate.getTime()) / oneDayMs;
  
//           if (dayDifference === 1) {
//             streak++; // Increment streak if the days are consecutive
//           } else if (dayDifference > 1) {
//             // If more than 1 day has passed, reset the streak
//             streak = 1;
//           }
//         }
  
//         console.log("User Streak:", streak);
//         setMaxStreak(streak); // Store the streak in your state
//       };
  
//       calculateUserStreak(); // Call the function to calculate the user's streak
//     }
//   }, [DailyInteraction]);
  
  
//   const getUserDailyStreak = (date: any): number => { // Added return type
//     const dailyInteractions = DailyInteraction?.filter(interaction =>
//       interaction.date === date.toISOString().split('T')[0] &&
//       interaction.userId === userId
//     ) || []; // Default to an empty array if DailyInteraction is undefined
//     return dailyInteractions.length > 0 ? 1 : 0; // Return 1 if there's a streak, otherwise 0
//   };

//   // const getMaxStreak = () => {
//   //   const sortedDates = Array.from(new Set(DailyInteraction?.map(interaction => interaction.date))); // Convert Set to Array
//   //   sortedDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

//   //   let maxStreak = 0;
//   //   let currentStreak = 0;

//   //   for (let i = 0; i < sortedDates.length; i++) {
//   //     const currentDate = new Date(sortedDates[i]);
//   //     const streak = getUserDailyStreak(currentDate);
//   //     currentStreak += streak;
//   //     maxStreak = Math.max(maxStreak, currentStreak);
//   //   }

//   //   return maxStreak;
//   // };

//   const getMaxStreak = () => {
//     if (!DailyInteraction || DailyInteraction.length === 0) {
//       return 0;
//     }

//     // Extract unique dates from DailyInteraction and sort them
//     const sortedDates = Array.from(new Set(DailyInteraction.map(interaction => interaction.date)));
//     sortedDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

//     let maxStreak = 0;
//     let currentStreak = 0;
//     let lastDate = null;

//     // Iterate through sorted dates to calculate streak
//     for (let i = 0; i < sortedDates.length; i++) {
//       const currentDate = new Date(sortedDates[i]);

//       if (lastDate) {
//         // Check if the current date is the next consecutive day
//         const expectedNextDate = new Date(lastDate);
//         expectedNextDate.setDate(expectedNextDate.getDate() + 1);

//         if (currentDate.getTime() === expectedNextDate.getTime()) {
//           // Consecutive day, increment the streak
//           currentStreak += 1;
//         } else {
//           // Break in streak, reset current streak
//           currentStreak = 1; // Start new streak with current date
//         }
//       } else {
//         // First date in the list, start with streak of 1
//         currentStreak = 1;
//       }

//       // Update max streak if needed
//       maxStreak = Math.max(maxStreak, currentStreak);

//       // Update last date
//       lastDate = currentDate;
//     }

//     return maxStreak;
//   };

  


//   return (                                                                                                                                                                                                                                                                                                                                                                                                                              
//     <main className="  w-full px-10 ">
//       <Header rank={rank} maxStreak={maxStreak} />
//       <Separator className="bg-gray-400  " />
//       <div className="flex mt-5 flex-col h-full w-full gap-5  p-5 bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 border border-slate-100 overflow-hidden overflow-x-scroll rounded-xl">
//         <div>
//           <div className="flex flex-row w-full items-start justify-between gap-3 overflow-hidden">
//             <div className="w-[66%]">
//               <GitMap totalInteractions={TotalInteractions} dailyInteractions={DailyInteraction || []}/>
//             </div>
//             <div className="w-[33%] flex flex-col gap-3">
//               <Meter percentage={percentage ?? 0} title="Accuracy" />
//               {/* <Meter percentage={50} title="Accuracy"/> */}
//             </div>
//           </div> 
//         </div>
//         <div className="w-full flex flex-row gap-3 h-[60rem] ">
//           <div className="bg-white w-[66%] p-7 rounded-xl pt-10 ">
//             <Heading>
//               History
//             </Heading>
//             <Separator />
//             <TestTables UserTestHistory={UserTestHistory} />
//           </div>
//           <div className="bg-white w-[33%] p-7 pt-10 rounded-xl -mt-[15rem]">
//             <Heading>
//               Leaderboard
//             </Heading>
//             <Separator />
//             <Leaderboard TopUsers={TopUsers}/>
//           </div>
//         </div>
       
//       </div>
//       <Loader/>
//     </main>
//   );
// };

// export default Dashboard;





"use client";

import { useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from 'react';
import { Separator } from "@/components/ui/separator";
// import GitMap from "./components/Heatmap";
import Header from "./components/Header";
// import Meter from "./components/Meter";
import { TestTables } from "./components/TestTables";
import { Leaderboard } from "./components/Leaderboard";
import Heading from "@/components/ui/Heading";
import { useMutation, useQueries, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useLoader } from "../LoaderContext";
// import Loader from "@/components/ui/Loader";


import dynamic from 'next/dynamic';
import Modal from "@/components/ui/FileModal";

const Loader = dynamic(() => import('@/components/ui/Loader'), { ssr: false });
const Meter = dynamic(() => import('./components/Meter'), { ssr: false });
const GitMap = dynamic(() => import('./components/Heatmap'), { ssr: false });

const Dashboard = () => {
  const { userId } = useAuth();

  const TotalInteractions = useQuery(api.TotalInteractions.Get_TotalInteraction, { userId: userId || "" });
  console.log("TotalInteractions", TotalInteractions);

  const DailyInteraction = useQuery(api.DailyInteractions.Get_AllUserInteractions, { userId: userId || "" });
  console.log("DailyInteraction", DailyInteraction);

  const getUserLeaderboardData = useQuery(api.LeaderBoard.getUserLeaderboardData, { userId: userId || "" });
  console.log("getUserLeaderboardData", getUserLeaderboardData);

  const TopUsers = useQuery(api.LeaderBoard.getTopUsers);
  console.log("TopUsers", TopUsers);

  const AllUsers = useQuery(api.LeaderBoard.getAllUsers);
  console.log("AllUsers", AllUsers);

  const UserTestHistory = useQuery(api.GetHistory.getTestHistoryById, { userId: userId || '' });
  console.log("UserTestHistory", UserTestHistory);

  const UserInterviewHistory = useQuery(api.GetHistory.getInterviewHistoryById, { userId: userId || '' });
  console.log("UserTestHistory", UserTestHistory);

  const ResumeFiles = useQuery(api.fetchFiles.FetchResumeFiles, { userId: userId || '' })
  console.log("FetchResumeFiles : ", ResumeFiles)

  const generateUploadUrl = useMutation(api.uploadPdF.generateUploadUrl)
  const saveFile = useMutation(api.uploadPdF.saveFile)


  const percentage = getUserLeaderboardData?.totalAccuracy;

  const { showLoader, hideLoader } = useLoader();
  const [rank, setRank] = useState<number>();
  const [dailyStreak, setDailyStreak] = useState<number>();
  const [maxStreak, setMaxStreak] = useState<number>();

  //
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = async (uploadedFiles: any) => {
    // Ensure uploadedFiles is not empty
    if (uploadedFiles.length > 0) {
      // Get the first file from the FileList
      const file = uploadedFiles[0];

      console.log("Uploaded File:", file);

      try {
        // Generate the upload URL
        const postUrl = await generateUploadUrl();

        // Send the file to the generated URL
        const result = await fetch(postUrl, {
          method: 'POST',
          headers: { 'Content-Type': file.type },  // Set the correct file type
          body: file,  // Pass the file as the body
        });

        // Parse the response to get the storageId
        const { storageId } = await result.json();

        // Save file details (you may pass userId from context or props)
        await saveFile({
          storageId,
          userId: userId || '', // Ensure userId is available
          fileName: file.name,  // Name of the uploaded file
          fileType: file.type,  // Type of the file
        });

      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.warn("No files selected for upload.");
    }
  };


  const handleModalOpen = ()=>{
     setIsModalOpen(true)
  }
// 
  useEffect(() => {
    if (!TotalInteractions && !DailyInteraction && !getUserLeaderboardData && !TopUsers) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [TotalInteractions, DailyInteraction, getUserLeaderboardData, TopUsers, showLoader, hideLoader]);

  useEffect(() => {
    if (Array.isArray(AllUsers)) {
      const calculateUserRank = () => {
        const userIndex = AllUsers.findIndex(entry => entry.userId === userId);
        if (userIndex === -1) {
          console.error("User not found in the leaderboard");
          return;
        }
        console.log("UserRank", userIndex + 1);
        setRank(userIndex + 1);
      };

      calculateUserRank();

      const today = new Date();
      const userStreak = getUserDailyStreak(today);
      setDailyStreak(userStreak);

      // Maximum Streak calculation here if needed
    }
  }, [AllUsers, userId]);

  useEffect(() => {
    if (Array.isArray(DailyInteraction)) {
      const calculateUserStreak = () => {
        const userInteractions = DailyInteraction.filter(entry => entry.userId === userId && entry.count > 0);
        if (userInteractions.length === 0) {
          console.log("User Streak: 0");
          setMaxStreak(0);
          return;
        }

        const sortedInteractions = userInteractions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        let streak = 1;
        const oneDayMs = 24 * 60 * 60 * 1000;

        for (let i = 1; i < sortedInteractions.length; i++) {
          const currentDate = new Date(sortedInteractions[i].date);
          const previousDate = new Date(sortedInteractions[i - 1].date);
          const dayDifference = (currentDate.getTime() - previousDate.getTime()) / oneDayMs;

          if (dayDifference === 1) {
            streak++;
          } else if (dayDifference > 1) {
            streak = 1;
          }
        }

        console.log("User Streak:", streak);
        setMaxStreak(streak);
      };

      calculateUserStreak();
    }
  }, [DailyInteraction, userId]);

  const getUserDailyStreak = (date: Date): number => {
    const dailyInteractions = DailyInteraction?.filter(interaction =>
      interaction.date === date.toISOString().split('T')[0] &&
      interaction.userId === userId
    ) || [];
    return dailyInteractions.length > 0 ? 1 : 0;
  };

  const getMaxStreak = () => {
    if (!DailyInteraction || DailyInteraction.length === 0) {
      return 0;
    }

    const sortedDates = Array.from(new Set(DailyInteraction.map(interaction => interaction.date)));
    sortedDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    let maxStreak = 0;
    let currentStreak = 0;
    let lastDate = null;

    for (let i = 0; i < sortedDates.length; i++) {
      const currentDate = new Date(sortedDates[i]);

      if (lastDate) {
        const expectedNextDate = new Date(lastDate);
        expectedNextDate.setDate(expectedNextDate.getDate() + 1);

        if (currentDate.getTime() === expectedNextDate.getTime()) {
          currentStreak += 1;
        } else {
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }

      maxStreak = Math.max(maxStreak, currentStreak);
      lastDate = currentDate;
    }

    return maxStreak;
  };

  return (
    <main className="w-full px-10">
      <Header rank={rank} maxStreak={maxStreak} handleModalOpen={handleModalOpen}  />
      <Separator className="bg-gray-400" />
      <div className="flex mt-5 flex-col h-full w-full gap-5 p-5 bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 border border-slate-100 overflow-hidden overflow-x-scroll rounded-xl">
        <div>
          <div className="flex flex-row w-full items-start justify-between gap-3 overflow-hidden">
            <div className="w-[66%]">
              <GitMap totalInteractions={TotalInteractions} dailyInteractions={DailyInteraction || []} />
            </div>
            <div className="w-[33%] flex flex-col gap-3">
              <Meter percentage={percentage ?? 0} title="Accuracy" />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row gap-3 h-[60rem]">
          <div className="bg-white w-[66%] p-7 rounded-xl pt-10">
            <Heading>History</Heading>
            <Separator />
            <TestTables UserTestHistory={UserTestHistory} UserInterviewHistory={UserInterviewHistory} />
          </div>
          <div className="bg-white w-[33%] p-7 pt-10 rounded-xl -mt-[15rem]">
            <Heading>Leaderboard</Heading>
            <Separator />
            <Leaderboard TopUsers={TopUsers} />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleFileUpload}
        ResumeFiles={ResumeFiles}
      />
      <Loader />
    </main>
  );
};

export default Dashboard;
