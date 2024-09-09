"use client";
import React, { Children, useState } from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
  IconUserCircle,
  IconHeadset,
  IconTrophy,
  IconChecklist,
  IconMicrophone,
  IconWorld,
  IconRobot,
} from "@tabler/icons-react";
import { Lens } from "../ui/lens";

const Encryption = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full h-full  " id="features">
      {/* Heading Section */}
      <h2 className="text-4xl font-bold text-white mb-8">
        <span className="text-5xl md:text-[8rem] font-bold mt-2 leading-none bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
          Features
        </span>
      </h2>

      {/* Features Grid */}
      <BentoGrid className="max-w-6xl mx-auto gap-8 p-8">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={<span className="text-white">{item.title}</span>}
            description={<p className="text-white">{item.description}</p>}
            header={item.header}
            icon={item.icon}
            className={`flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] px-[20px] py-[10px] rounded-xl ${
              i === 3 || i === 6 || i === 7 ? "md:col-span-2" : ""
            }`}
          />
        ))}
      </BentoGrid>
    </div>
  );
};

const Skeleton = ({ image }: { image: string }) => {
  const [hovering, setHovering] = useState(false);
  return (
    <div className="flex items-center overflow-hidden justify-center w-full h-full min-h-[8rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
      {image && (
        <Lens hovering={hovering} setHovering={setHovering}>
          <img
            src={image}
            alt="Loading..."
            className="w-full h-full object-cover rounded-xl"
          />
        </Lens>
      )}
    </div>
  );
};

const items = [
  {
    title: "Personalized Dashboard",
    description: "Access tailored content, tests, and interviews based on your goals.",
    header: <Skeleton image={'/NextWebsite.png'}/>, // Replace Skeleton with image
    icon: <IconUserCircle className="h-6 w-6 text-white" />, // User icon
  },
  {
    title: "Open-World Gamified Forum",
    description: "Interact with other users in an immersive 3D world using spatial audio.",
    header: <Skeleton image={'/NextWebsite.png'}/>, // Replace Skeleton with image
    icon: <IconWorld className="h-6 w-6 text-white" />, // Globe icon
  },
  {
    title: "Spatial Audio Chat",
    description: "Talk with others in real time as if you were in the same room.",
    header: <Skeleton image={'/NextWebsite.png'}/>, // Replace Skeleton with image
    icon: <IconHeadset className="h-6 w-6 text-white" />, // Headset icon
  },
  {
    title: "Leaderboard & Ratings",
    description: "Climb the leaderboard based on your performance in tests and interviews.",
    header: <Skeleton image={'/NextWebsite.png'}/>, // Replace Skeleton with image
    icon: <IconTrophy className="h-6 w-6 text-white" />, // Trophy icon
  },
  {
    title: "AI-Powered Assessments",
    description:
      "Tailored tests based on your resume and target companies to help you practice effectively.",
    header: <Skeleton image={'/NextWebsite.png'}/>, // Replace Skeleton with image
    icon: <IconRobot className="h-6 w-6 text-white" />, // AI icon
  },
  {
    title: "Personalized Interview Practice",
    description:
      "Mock interviews crafted to fit your profile and aspirations, giving you real-time feedback.",
    header: <Skeleton image={'/NextWebsite.png'}/>, // Replace Skeleton with image
    icon: <IconMicrophone className="h-6 w-6 text-white" />, // Microphone icon
  },
  {
    title: "Global Collaboration & FAQ",
    description:
      "Join a global community of users, explore, interact, and learn from collective experiences.",
    header:<Skeleton image={'/NextWebsite.png'}/>, // Replace Skeleton with image
    icon: <IconWorld className="h-6 w-6 text-white" />, // Globe icon
  },
];

export default Encryption;
