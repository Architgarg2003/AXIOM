"use client";

import { useUser } from "@clerk/nextjs";
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Button } from "@nextui-org/react"
import { Plus } from "lucide-react"
import Featured from "@/components/Featured";
import GeneratedTests from "@/components/GeneratedTests";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation"
import NewModal  from "@/components/NewModal"
import { ExpandableCardDemo } from "./Dashboard/ExpandableCardDemo";
import Heading from "@/components/ui/Heading";
import { useRouter } from "next/navigation";

const Test = () => {
  const router = useRouter();

  const { userId } = useAuth();

  if (!userId) {
      router.push('/')
  }

  return (
    <main className="h-full w-screen ">
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

    </main>
  );
};

export default Test;