// "use client";
// import React from "react";
// import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";
// import { Toggle } from "./Toggle";
// import { FaStar } from "react-icons/fa";
// import { Badge } from "./Badge";

// export default function Cards() {
//     const colors = ["#d8b4fe", "#e9d5ff", "#c4b5fd", "#ddd6fe", "#f5d0fe"];
//     const list = [{ title: "Orange" }];

//     const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

//     return (
//         <div className="overflow-x-auto whitespace-nowrap">
//             <div className="inline-flex space-x-4">
//                 {list.map((item, index) => (
//                     <Card
//                         shadow="sm"
//                         key={index}
//                         isPressable
//                         className="w-80 rounded-2xl border border-gray-400"
//                     >
//                         <CardBody className="overflow-y-auto p-2 bg-white rounded-t-2xl w-full max-h-[18rem]">
//                             <div style={{ backgroundColor: getRandomColor() }} className="relative w-full h-[15rem] rounded-xl">
//                                 <div className="flex flex-row items-center justify-between p-3">
//                                     <div>
//                                         <Badge className="bg-white rounded-full" variant="outline">20 May, 2023</Badge>
//                                     </div>
//                                     <div>
//                                         <Toggle  variant="outline" className="bg-white">
//                                             <FaStar className="text-gray-500 data-[state=on]:text-[hsl(271.5,81.3%,55.9%)]" />
//                                         </Toggle>
//                                     </div>
//                                 </div>
//                                 <div className="flex flex-col items-start text-left pt-3 pl-4 max-w-full">
//                                     <h2 className="text-md font-semibold">Company</h2>
//                                     <h1 className="text-2xl font-bold break-words overflow-hidden text-wrap">Senior UI/UX Designer</h1>
//                                 </div>
//                                 <div className="flex flex-row items-start gap-3 flex-wrap pt-3 pl-4">
//                                     <Badge size={'sm'} className="border-gray-400 text-sm rounded-full" variant="outline">20 May, 2023</Badge>
//                                 </div>
//                             </div>
//                         </CardBody>
//                         <CardFooter className="text-small justify-between bg-white rounded-b-2xl">
//                             <b>{item.title}</b>
//                             <Button radius="full" className="bg-[#141414] text-white w-1/4 p-3" size="sm">
//                                 Details
//                             </Button>
//                         </CardFooter>
//                     </Card>
//                 ))}
//             </div>
//         </div>
//     );
// }

"use client";
import React, { useState } from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { FaStar } from "react-icons/fa";
import { Badge } from "./Badge";
import dynamic from 'next/dynamic';
import PreModal from "../PreModal";
import { TiStarOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";
import { motion, AnimatePresence } from 'framer-motion';


const Toggle = dynamic(() => import('./Toggle').then((mod) => mod.Toggle), { ssr: false });
const Button = dynamic(() => import('./button').then((mod) => mod.Button), { ssr: false });

export default function Cards() {
    const colors = ["#d8b4fe", "#e9d5ff", "#c4b5fd", "#ddd6fe", "#f5d0fe"];
    const list = [{ title: "Orange" }];

    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

    const [isStarred, setIsStarred] = useState(false);
    const [starCount, setStarCount] = useState();


    const handleStarToggle = () => {
        setIsStarred(!isStarred);
    };

    const starVariants = {
        active: {
            scale: [1, 1.2, 0.9, 1.1, 1],
            rotate: [0, -15, 15, -15, 0],
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
        },
        inactive: {
            scale: 1,
            rotate: 0,
            transition: {
                duration: 0.2,
            },
        },
    };



    return (
        <div className="overflow-x-auto whitespace-nowrap">
            <div className="inline-flex space-x-4">
                {list.map((item, index) => (
                    <Card
                        shadow="sm"
                        key={index}
                        isPressable
                        className="w-80 rounded-2xl border border-gray-400"
                    >
                        <CardBody className="overflow-y-auto p-2 bg-white rounded-t-2xl w-full max-h-[18rem]">
                            <div style={{ backgroundColor: getRandomColor() }} className="relative w-full h-[15rem] rounded-xl">
                                <div className="flex flex-row items-center justify-between p-3">
                                    <div>
                                        <Badge className="bg-white rounded-full" variant="outline">20 May, 2023</Badge>
                                    </div>
                                    <div>
                                        {/* <Toggle variant="outline" className="bg-white">
                                           69 <FaStar className="text-gray-500 data-[state=on]:text-[hsl(271.5,81.3%,55.9%)]" />
                                        </Toggle> */}

                                        <Toggle 
                                            variant="outline" 
                                            aria-label="Toggle star" 
                                            className="bg-white"
                                            pressed={isStarred}

                                            onPressedChange={handleStarToggle}
                                        >
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={isStarred ? 'starred' : 'unstarred'}
                                                    initial={{ scale: 1 }}
                                                    animate={isStarred ? 'active' : 'inactive'}
                                                    variants={starVariants}
                                                    style={{ display: 'inline-block' }}
                                                >
                                                    {isStarred ? (
                                                        <TiStarFullOutline className="text-purple-500 h-5 w-5" />
                                                    ) : (
                                                        <TiStarOutline className="text-black h-5 w-5" />
                                                    )}
                                                </motion.div>
                                            </AnimatePresence>
                                            {/* <span>{starCount}</span> */}
                                        </Toggle>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start text-left pt-3 pl-4 max-w-full">
                                    <h2 className="text-md font-semibold">Company</h2>
                                    <h1 className="text-2xl font-bold break-words overflow-hidden text-wrap">Senior UI/UX Designer</h1>
                                </div>
                                <div className="flex flex-row items-start gap-3 flex-wrap pt-3 pl-4">
                                    <Badge size={'sm'} className="border-gray-400 text-sm rounded-full" variant="outline">20 May, 2023</Badge>
                                </div>
                            </div>
                        </CardBody>
                        <CardFooter className="text-small justify-between bg-white rounded-b-2xl">
                            <b>{item.title}</b>

                            {/* <Button className="bg-[#141414] rounded-full text-white w-1/4 p-3" size="sm">
                                Details
                            </Button> */}
                            <PreModal/>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}