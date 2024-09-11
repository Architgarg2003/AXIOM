


// import React, { useEffect, useState } from 'react';
// import { card, Card, CardBody } from "@nextui-org/react";
// import { Toggle } from "./Toggle";
// import { FaStar } from "react-icons/fa";
// import { Badge } from "./Badge";
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
// import PreModal from "../PreModal";
// import { motion, AnimatePresence } from 'framer-motion';
// import { TiStarOutline } from "react-icons/ti";
// import { TiStarFullOutline } from "react-icons/ti";
// import { api } from '@/convex/_generated/api';
// import { mutation } from '@/convex/_generated/server';
// import { useMutation, useQuery } from 'convex/react';
// import { useAuth } from '@clerk/clerk-react';
// import { is } from '@react-three/fiber/dist/declarations/src/core/utils';

// interface GeneratedCardProps {
//     companyName: string;
//     jobTitle: string;
//     createdAt: string;
//     starsCount: number;
//     upvoteCount: number;
//     tags: string[];
//     user:string;
//     testId:string;
//     cardId:string;

// }

// export default function GeneratedCard({
//     companyName,
//     jobTitle,
//     createdAt,
//     starsCount,
//     upvoteCount,
//     tags,
//     user,
//     testId,
//     cardId
// }: GeneratedCardProps) {
//     const colors = ["#d8b4fe", "#e9d5ff", "#c4b5fd", "#ddd6fe", "#f5d0fe"];
//     const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
    
//     const [isLiked, setIsLiked] = useState(false);
//     const [likeCount, setLikeCount] = useState(upvoteCount);

//     const [isStarred, setIsStarred] = useState(false);
//     const [starCount, setStarCount] = useState(starsCount);

//     const addToBucket = useMutation(api.wishlist.AddToWishlist);
//     const removeFromBucket = useMutation(api.wishlist.RemoveFromWishlist);

//     const addLike = useMutation(api.UserLike.AddLike);
//     const removeLike = useMutation(api.UserLike.RemoveLike);
    
//     const increaseLike = useMutation(api.LikeCount.increaseLikeCount);
//     const decreaseLike = useMutation(api.LikeCount.decreaseLikeCount);

//     const {userId} = useAuth() as {userId:string};


//     const checkInBucket = useQuery(api.wishlist.inBucket,{userId,cardId})
//     const checkLike = useQuery(api.UserLike.AlreadyLiked, {userId,cardId })
//     const getLike = useQuery(api.LikeCount.getLikeCount,{cardId})


//     // const handleStarToggle = async() => {
//     //     const AddToBucket = await addToBucket({userId,cardId})
//     //     console.log("AddToBucket", AddToBucket);
//     //     setIsStarred(!isStarred);
//     //     setStarCount(isStarred ? starCount - 1 : starCount + 1);
//     // };

//     useEffect(() => {
//         if (checkInBucket !== undefined) {
//             setIsStarred(checkInBucket);
//         }
//     }, [checkInBucket]);

//     useEffect(() => {
//         if (checkLike !== undefined) {
//             setIsLiked(checkLike);
//         }
//     }, [checkLike]);

//     const handleStarToggle = async () => {
//         if (isStarred) {
//             // Remove from bucket
//             await removeFromBucket({ userId, cardId });
//             setStarCount(starCount - 1);
//         } else {
//             // Add to bucket
//             await addToBucket({ userId, cardId });
//             setStarCount(starCount + 1);
//         }
//         setIsStarred(!isStarred);
//     };



//     const handleLikeToggle = async() => {
//         if(isLiked){
//             await removeLike({ userId, cardId });
//             await decreaseLike({cardId});
//         }else{
//             await addLike({ userId, cardId });
//             await increaseLike({cardId});
//         }
//         setIsLiked(!isLiked);
//         setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
//     };

//     const heartVariants = {
//             liked: {
//                 scale: [1, 1.2, 0.9, 1.1, 1],
//                 rotate: [0, -15, 15, -15, 0],
//                 transition: {
//                     duration: 0.5,
//                     ease: "easeInOut",
//                 },
//             },
//             unliked: {
//                 scale: 1,
//                 rotate: 0,
//                 transition: {
//                     duration: 0.2,
//                 },
//             },
//         };


//         const starVariants = {
//             active: {
//                 scale: [1, 1.2, 0.9, 1.1, 1],
//                 rotate: [0, -15, 15, -15, 0],
//                 transition: {
//                     duration: 0.5,
//                     ease: "easeInOut",
//                 },
//             },
//             inactive: {
//                 scale: 1,
//                 rotate: 0,
//                 transition: {
//                     duration: 0.2,
//                 },
//             },
//         };

//     return (
//         <Card
//             shadow="sm"
//             className="w-[95%] rounded-2xl border border-gray-400"
//         >
//             <CardBody className="p-2 bg-white rounded-t-2xl w-full h-[18rem] flex flex-col">
//                 <div
//                     style={{ backgroundColor: getRandomColor() }}
//                     className="w-full h-full rounded-xl flex flex-col justify-between"
//                 >
//                     <div className="flex flex-col items-start text-left pt-8 pl-4 pr-4 max-w-full">
//                         <h2 className="text-md font-semibold">{companyName}</h2>
//                         <h1 className="text-2xl font-bold w-full break-words whitespace-normal mb-2">
//                             {jobTitle}
//                         </h1>
//                         <div className="flex flex-row items-start gap-3 flex-wrap">
//                             <Badge
//                                 size={"sm"}
//                                 className="border-gray-400 text-sm rounded-full"
//                                 variant="outline"
//                             >
//                                 {tags[0]}
//                             </Badge>
//                             <Badge
//                                 size={"sm"}
//                                 className="border-gray-400 text-sm rounded-full"
//                                 variant="outline"
//                             >
//                                 {tags[1]}
//                             </Badge>
//                         </div>
//                     </div>
//                     <div className="flex flex-row items-end justify-between p-3">
//                         <div className="flex gap-1">
//                             {/* <Toggle variant="outline" aria-label="Toggle bold" className="bg-white">
//                                 <FaStar className="text-gray-500 data-[state=on]:text-[hsl(271.5,81.3%,55.9%)]" />
//                             </Toggle> */}

//                             <Toggle 
//                                 variant="outline" 
//                                 aria-label="Toggle star" 
//                                 className="bg-white"
//                                 pressed={isStarred}

//                                 onPressedChange={handleStarToggle}
//                             >
//                                 <AnimatePresence mode="wait">
//                                     <motion.div
//                                         key={isStarred ? 'starred' : 'unstarred'}
//                                         initial={{ scale: 1 }}
//                                         animate={isStarred ? 'active' : 'inactive'}
//                                         variants={starVariants}
//                                         style={{ display: 'inline-block' }}
//                                     >
//                                         {isStarred ? (
//                                             <TiStarFullOutline className="text-purple-500 h-5 w-5" />
//                                         ) : (
//                                             <TiStarOutline className="text-black h-5 w-5" />
//                                         )}
//                                     </motion.div>
//                                 </AnimatePresence>
//                                 {/* <span>{starCount}</span> */}
//                             </Toggle>
//                             <Toggle 
//                                 variant="outline" 
//                                 className="bg-white"
//                                 pressed={isLiked}
//                                 onPressedChange={handleLikeToggle}
//                             >
//                                <AnimatePresence mode="wait">
//                                     <motion.div
//                                         key={isLiked ? 'liked' : 'unliked'}
//                                         initial={{ scale: 1 }}
//                                         animate={isLiked ? 'liked' : 'unliked'}
//                                         variants={heartVariants}
//                                         style={{ display: 'inline-block' }}
//                                     >
//                                         {isLiked ? (
//                                             <AiFillHeart className="text-purple-500 h-5 w-5" />
//                                         ) : (
//                                             <AiOutlineHeart className="text-black h-5 w-5" />
//                                         )}
//                                     </motion.div>
//                                 </AnimatePresence>
//                                 <span className='pl-1 text-md'>{getLike || 0}</span>
//                             </Toggle>
//                         </div>
//                         <div>
//                             <PreModal jobTitle={jobTitle} companyName={companyName} tags={tags} testId={testId} />
//                         </div>
//                     </div>
//                 </div>
//             </CardBody>
//         </Card>
//     );
// }






import React, { useEffect, useState } from 'react';
import { Card, CardBody } from "@nextui-org/react";
import { Toggle } from "./Toggle";
import { Badge } from "./Badge";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import PreModal from "../PreModal";
import { motion, AnimatePresence } from 'framer-motion';
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";
import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { useAuth } from '@clerk/clerk-react';

interface GeneratedCardProps {
    companyName: string;
    jobTitle: string;
    createdAt: string;
    starsCount: number;
    upvoteCount: number;
    tags: string[];
    user: string;
    testId: string;
    cardId: string;
}

export default function GeneratedCard({
    companyName,
    jobTitle,
    createdAt,
    starsCount,
    upvoteCount,
    tags,
    user,
    testId,
    cardId
}: GeneratedCardProps) {
    const colors = ["#d8b4fe", "#e9d5ff", "#c4b5fd", "#ddd6fe", "#f5d0fe"];
    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(upvoteCount);
    const [isStarred, setIsStarred] = useState(false);
    const [starCount, setStarCount] = useState(starsCount);

    const addToBucket = useMutation(api.wishlist.AddToWishlist);
    const removeFromBucket = useMutation(api.wishlist.RemoveFromWishlist);
    const addLike = useMutation(api.UserLike.AddLike);
    const removeLike = useMutation(api.UserLike.RemoveLike);
    const increaseLike = useMutation(api.LikeCount.increaseLikeCount);
    const decreaseLike = useMutation(api.LikeCount.decreaseLikeCount);

    const { userId } = useAuth() as { userId: string };
    const checkInBucket = useQuery(api.wishlist.inBucket, { userId, cardId });
    const checkLike = useQuery(api.UserLike.AlreadyLiked, { userId, cardId });
    const getLike = useQuery(api.LikeCount.getLikeCount, { cardId });
    console.log("getLike", checkLike);

    useEffect(() => {
        if (checkInBucket !== undefined) {
            setIsStarred(checkInBucket);
        }
    }, [checkInBucket]);

    useEffect(() => {
        if (checkLike == true) {
            setIsLiked(checkLike);
        }
        else{
            setIsLiked(false)
        }
    }, [checkLike]);

    useEffect(() => {
        if (getLike !== undefined) {
            setLikeCount(getLike);
        }
    }, [getLike]);

    const handleStarToggle = async () => {
        if (isStarred) {
            await removeFromBucket({ userId, cardId });
            setStarCount(starCount - 1);
        } else {
            await addToBucket({ userId, cardId });
            setStarCount(starCount + 1);
        }
        setIsStarred(!isStarred);
    };

    const handleLikeToggle = async () => {
        if (isLiked) {
            await removeLike({ userId, cardId });
            await decreaseLike({ cardId });
        } else {
            await addLike({ userId, cardId });
            await increaseLike({ cardId });
        }
        setIsLiked(!isLiked);
        // Update the like count directly after the mutation
        setLikeCount((prevCount) => isLiked ? prevCount - 1 : prevCount + 1);
    };

    const heartVariants = {
        liked: {
            scale: [1, 1.2, 0.9, 1.1, 1],
            rotate: [0, -15, 15, -15, 0],
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
        },
        unliked: {
            scale: 1,
            rotate: 0,
            transition: {
                duration: 0.2,
            },
        },
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
                            {tags.slice(0, 2).map((tag, index) => (
                                <Badge
                                    key={index}
                                    size={"sm"}
                                    className="border-gray-400 text-sm rounded-full"
                                    variant="outline"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-row items-end justify-between p-3">
                        <div className="flex gap-1">
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
                            </Toggle>
                            <Toggle
                                variant="outline"
                                className="bg-white"
                                pressed={isLiked}
                                onPressedChange={handleLikeToggle}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={isLiked ? 'liked' : 'unliked'}
                                        initial={{ scale: 1 }}
                                        animate={isLiked ? 'liked' : 'unliked'}
                                        variants={heartVariants}
                                        style={{ display: 'inline-block' }}
                                    >
                                        {isLiked ? (
                                            <AiFillHeart className="text-purple-500 h-5 w-5" />
                                        ) : (
                                            <AiOutlineHeart className="text-black h-5 w-5" />
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                                <span className='pl-1 text-md'>{likeCount}</span>
                            </Toggle>
                        </div>
                        <div>
                            <PreModal jobTitle={jobTitle} companyName={companyName} tags={tags} testId={testId} />
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
