"use client";

import { useUser } from "@clerk/nextjs";
import React from 'react';
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

const Dashboard = () => {

  const { userId } = useAuth();

  if (!userId) {
      redirect("/sign-in");
  }

  const router = useRouter();


  return (                                                                                                                                                                                                                                                                                                                                                                                                                              
    <main className="  w-full px-10 ">
      <Header/>
      <Separator className="bg-gray-400  " />
      <div className="flex mt-5 flex-col h-full w-full gap-5  p-5 bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 border border-slate-100 overflow-hidden overflow-x-scroll rounded-xl">
        <div>
          <div className="flex flex-row w-full items-start justify-between gap-3 overflow-hidden">
            <div className="w-[70%]">
              <GitMap />
            </div>
            <div className="w-[29%] flex flex-col gap-3">
              <Meter percentage={50} title="Accuracy" />
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
            <Leaderboard />
          </div>
        </div>
       
      </div>
    </main>
  );
};

export default Dashboard;
