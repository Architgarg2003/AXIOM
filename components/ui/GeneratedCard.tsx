// "use client";
// import React, { useState } from "react";
// import { Card, CardBody, Button } from "@nextui-org/react";
// import { Toggle } from "./Toggle";
// import { FaStar } from "react-icons/fa";
// import { Badge } from "./Badge";
// import { ArrowBigUp } from "lucide-react";
// import dynamic from 'next/dynamic';

// // Import PreModal directly
// import PreModal from "../PreModal";

// interface CardItem {
//     title: string;
//     color: string;
// }

// export default function GeneratedCard() {


//     const colors = ["#d8b4fe", "#e9d5ff", "#c4b5fd", "#ddd6fe", "#f5d0fe"];
//     const list: CardItem[] = [
//         { title: "Orange", color: "#d8b4fe" }
//     ];

//     const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];


//     return (
//         <>
//             <div className="overflow-x-auto whitespace-nowrap">
//                 <div className="inline-flex space-x-4">
//                     {list.map((item, index) => (
//                         <Card
//                             shadow="sm"
//                             key={index}
//                             className="w-[95%] rounded-2xl border border-gray-400"
//                         >
//                             <CardBody className="p-2 bg-white rounded-t-2xl w-full h-[18rem] flex flex-col">
//                                 <div
//                                     style={{ backgroundColor: getRandomColor() }}
//                                     className="w-full h-full rounded-xl flex flex-col justify-between"
//                                 >
//                                     <div className="flex flex-col items-start text-left pt-8 pl-4 pr-4 max-w-full">
//                                         <h2 className="text-md font-semibold">Company</h2>
//                                         <h1 className="text-2xl font-bold w-full break-words whitespace-normal mb-2">
//                                             Senior UI/UX Designer
//                                         </h1>
//                                         <div className="flex flex-row items-start gap-3 flex-wrap">
//                                             <Badge
//                                                 size={"sm"}
//                                                 className="border-gray-400 text-sm rounded-full"
//                                                 variant="outline"
//                                             >
//                                                 20 May, 2023
//                                             </Badge>
//                                         </div>
//                                     </div>
//                                     <div className="flex flex-row items-end justify-between p-3">
//                                         <div className="flex gap-1">
//                                             <Toggle variant="outline" className="bg-white">
//                                                 <FaStar className="text-gray-500 data-[state=on]:text-[hsl(271.5,81.3%,55.9%)]" />
//                                             </Toggle>
//                                             <Toggle variant="outline" className="bg-white">
//                                                 <ArrowBigUp className="text-gray-500 data-[state=on]:text-[hsl(271.5,81.3%,55.9%)]" />
//                                             </Toggle>
//                                         </div>
//                                         <div>
//                                             <PreModal />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </CardBody>
//                         </Card>
//                     ))}
//                 </div>
//             </div>
//         </>
//     );
// }





import { Card, CardBody } from "@nextui-org/react";
import { Toggle } from "./Toggle";
import { FaStar } from "react-icons/fa";
import { Badge } from "./Badge";
import { ArrowBigUp } from "lucide-react";
import PreModal from "../PreModal";
import { useLoader } from "@/app/LoaderContext";



interface GeneratedCardProps {
    companyName: string;
    jobTitle: string;
    createdAt: string;
    starsCount: number;
    upvoteCount: number;
    tags: string[];
    user:string
}

export default function GeneratedCard({
    companyName,
    jobTitle,
    createdAt,
    starsCount,
    upvoteCount,
    tags,
    user
}: GeneratedCardProps) {
    const colors = ["#d8b4fe", "#e9d5ff", "#c4b5fd", "#ddd6fe", "#f5d0fe"];
    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
    // const { showLoader, hideLoader } = useLoader();
   
    return (
        <Card
            shadow="sm"
            className="w-[95%] rounded-2xl border border-gray-400"
        >
            <CardBody className="p-2 bg-white rounded-t-2xl w-full h-[18rem] flex flex-col">
                <div
                    style={{ backgroundColor: getRandomColor() }}
                    className="w-full h-full rounded-xl flex flex-col justify-between"
                >
                    <div className="flex flex-col items-start text-left pt-8 pl-4 pr-4 max-w-full">
                        <h2 className="text-md font-semibold">{companyName}</h2>
                        <h1 className="text-2xl font-bold w-full break-words whitespace-normal mb-2">
                            {jobTitle}
                        </h1>
                        <div className="flex flex-row items-start gap-3 flex-wrap">
                            {/* <Badge
                                size={"sm"}
                                className="border-gray-400 text-xs rounded-full"
                                variant="outline"
                            >
                                {username}
                            </Badge> */}
                            {/* {tags.map((tag, index) => (
                                <Badge
                                    key={index}
                                    size={"sm"}
                                    className="border-gray-400 text-[9px] rounded-full"
                                    variant="outline"
                                >
                                    {tag}
                                </Badge>
                            ))} */}
                            <Badge
                                size={"sm"}
                                className="border-gray-400 text-sm rounded-full"
                                variant="outline"
                            >
                                {tags[0]}
                            </Badge>
                            <Badge
                                size={"sm"}
                                className="border-gray-400 text-sm rounded-full"
                                variant="outline"
                            >
                                {tags[1]}
                            </Badge>
                        </div>
                    </div>
                    <div className="flex flex-row items-end justify-between p-3">
                        <div className="flex gap-1">
                            <Toggle variant="outline" className="bg-white">
                                <FaStar className="text-gray-500 data-[state=on]:text-[hsl(271.5,81.3%,55.9%)]" />
                                <span>{starsCount}</span>
                            </Toggle>
                            <Toggle variant="outline" className="bg-white">
                                <ArrowBigUp className="text-gray-500 data-[state=on]:text-[hsl(271.5,81.3%,55.9%)]" />
                                <span>{upvoteCount}</span>
                            </Toggle>
                        </div>
                        <div>
                            <PreModal />
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}


