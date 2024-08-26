// // // /app/test/[id]/instructions/page.tsx
// // 'use client';

// // import { Button } from '@/components/ui/button';
// // import Heading from '@/components/ui/Heading';
// // import { Separator } from '@/components/ui/separator';
// // import React, { useRef, useEffect } from 'react';

// // const InstructionsPage = () => {
// //     const videoRef = useRef<HTMLVideoElement | null>(null);

// //     useEffect(() => {
// //         const getCameraAccess = async () => {
// //             try {
// //                 const stream = await navigator.mediaDevices.getUserMedia({ video: true });
// //                 if (videoRef.current) {
// //                     videoRef.current.srcObject = stream;
// //                 }
// //             } catch (err) {
// //                 console.error('Error accessing camera:', err);
// //             }
// //         };

// //         getCameraAccess();

// //         return () => {
// //             if (videoRef.current && videoRef.current.srcObject) {
// //                 const stream = videoRef.current.srcObject as MediaStream;
// //                 stream.getTracks().forEach(track => track.stop());
// //             }
// //         };
// //     }, []);

// //     return (
// //         <div>
// //             <div className='p-5'>
// //                 <Heading>Test Instructions</Heading>
// //             </div>
// //             <Separator/>
// //             <div className='flex flex-row items-center justify-between p-10'>
// //                 <div className="h-full w-[50%] p-5 bg-gray-200">
// //                     <p>Please read the following instructions carefully before starting the test.</p>
// //                     <ul className=' list-disc p-3'>
// //                         <li>Make sure you are alone in the room.</li>
// //                         <li>Ensure your camera is turned on during the entire test.</li>
// //                         <li>Any suspicious activity might lead to disqualification.</li>
// //                         <li>Keep your microphone unmuted at all times.</li>
// //                         <li>Do not use any electronic devices other than the one being used for the test.</li>
// //                         <li>Ensure your internet connection is stable throughout the test.</li>
// //                         <li>Do not attempt to leave the test screen or open any other applications.</li>
// //                         <li>You are not allowed to communicate with anyone during the test.</li>
// //                         <li>Make sure your workspace is clear of any unauthorized materials.</li>
// //                         <li>Follow the instructions provided for each section of the test carefully.</li>
// //                     </ul>
// //                 </div>
// //                 <div className="video-monitoring">
// //                     {/* <video ref={videoRef} autoPlay playsInline />*/}
// //                     <video ref={videoRef} autoPlay playsInline className="md:w-[30rem] md:h-[20rem] w-full h-auto rounded-xl border-4 border-[#DDD6FE] object-cover" />

// //                 </div>
// //             </div>
// //             <div className='flex items-center justify-center'>
// //                 <Button className='rounded-xl' onClick={() => window.location.href = `/test/[id]/start`}>Start Test</Button>
// //             </div>
           
// //         </div>
// //     );
// // };

// // export default InstructionsPage;



// 'use client';

// import { Button } from '@/components/ui/button';
// import Heading from '@/components/ui/Heading';
// import { Separator } from '@/components/ui/separator';
// import React, { useRef, useEffect, useState } from 'react';

// const InstructionsPage = () => {
//     const videoRef = useRef<HTMLVideoElement | null>(null);
//     const [isAloneChecked, setIsAloneChecked] = useState(false);
//     const [isCameraChecked, setIsCameraChecked] = useState(false);

//     useEffect(() => {
//         const getCameraAccess = async () => {
//             try {
//                 const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//                 if (videoRef.current) {
//                     videoRef.current.srcObject = stream;
//                 }
//             } catch (err) {
//                 console.error('Error accessing camera:', err);
//             }
//         };

//         getCameraAccess();

//         return () => {
//             if (videoRef.current && videoRef.current.srcObject) {
//                 const stream = videoRef.current.srcObject as MediaStream;
//                 stream.getTracks().forEach(track => track.stop());
//             }
//         };
//     }, []);

//     const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, checked } = e.target;
//         if (name === 'isAlone') {
//             setIsAloneChecked(checked);
//         } else if (name === 'isCamera') {
//             setIsCameraChecked(checked);
//         }
//     };

//     const isStartButtonEnabled = isAloneChecked && isCameraChecked;

//     return (
//         <div className='w-full h-screen'>
//             <div className='p-5'>
//                 <Heading>Test Instructions</Heading>
//             </div>
//             <Separator />
//             <div className='flex flex-col md:flex-row items-center justify-between p-10 gap-10'>
//                 <div className="h-full w-full p-5 bg-gray-200">
//                     <p>Please read the following instructions carefully before starting the test.</p>
//                     <ul className='list-disc p-3'>
//                         <li>Make sure you are alone in the room.</li>
//                         <li>Ensure your camera is turned on during the entire test.</li>
//                         <li>Any suspicious activity might lead to disqualification.</li>
//                         <li>Keep your microphone unmuted at all times.</li>
//                         <li>Do not use any electronic devices other than the one being used for the test.</li>
//                         <li>Ensure your internet connection is stable throughout the test.</li>
//                         <li>Do not attempt to leave the test screen or open any other applications.</li>
//                         <li>You are not allowed to communicate with anyone during the test.</li>
//                         <li>Make sure your workspace is clear of any unauthorized materials.</li>
//                         <li>Follow the instructions provided for each section of the test carefully.</li>
//                     </ul>
//                     <div className="mt-4">
//                         <div className="flex items-center">
//                             <input
//                                 type="checkbox"
//                                 name="isAlone"
//                                 id="isAlone"
//                                 checked={isAloneChecked}
//                                 onChange={handleCheckboxChange}
//                                 className="mr-2"
//                             />
//                             <label htmlFor="isAlone">I confirm I am alone in the room.</label>
//                         </div>
//                         <div className="flex items-center mt-2">
//                             <input
//                                 type="checkbox"
//                                 name="isCamera"
//                                 id="isCamera"
//                                 checked={isCameraChecked}
//                                 onChange={handleCheckboxChange}
//                                 className="mr-2"
//                             />
//                             <label htmlFor="isCamera">I confirm my camera is turned on.</label>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="video-monitoring">
//                     <video ref={videoRef} autoPlay playsInline className="md:w-[30rem] md:h-[20rem] w-full h-auto rounded-xl border-4 border-[#DDD6FE] object-cover" />
//                 </div>
//             </div>
//             <div className='flex items-center justify-center flex-col gap-10'>
//                 <Button
//                     className='rounded-xl'
//                     onClick={() => window.location.href = `/test/[id]/start`}
//                     disabled={!isStartButtonEnabled}
//                 >
//                     Start Test
//                 </Button>
//                 {(!isAloneChecked || !isCameraChecked) ? <p>Please read the following instructions carefully before starting the test.</p> : null}
//             </div>
//         </div>
//     );
// };

// export default InstructionsPage;


'use client';

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';
import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Modals from '../../components/Modals';

const InstructionsPage = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isAloneChecked, setIsAloneChecked] = useState(false);
    const [isCameraChecked, setIsCameraChecked] = useState(false);
    const [showExitModal, setShowExitModal] = useState(false);

    const router = useRouter(); // Initialize useRouter

    useEffect(() => {
        const getCameraAccess = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error('Error accessing camera:', err);
            }
        };

        getCameraAccess();

        // Add popstate event listener
        window.history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', handlePopState);


        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
            window.removeEventListener('popstate', handlePopState);

        };
    }, []);

    const handlePopState = (event: PopStateEvent) => {
        event.preventDefault();
        setShowExitModal(true);
        window.history.pushState(null, '', window.location.href);
    };

    const handleExitConfirm = () => {
        setShowExitModal(false);
        router.push('/exploreTest'); // Navigate to instructions page
    };

    const handleExitCancel = () => {
        setShowExitModal(false);
    };



    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        if (name === 'isAlone') {
            setIsAloneChecked(checked);
        } else if (name === 'isCamera') {
            setIsCameraChecked(checked);
        }
    };

    const isStartButtonEnabled = isAloneChecked && isCameraChecked;

    return (
        <>
        <div className='w-full h-screen'>
            <div className='p-5'>
                <Heading>Test Instructions</Heading>
            </div>
            <Separator />
            <div className='flex flex-col md:flex-row items-center justify-between p-10 gap-10'>
                <div className="h-full w-full p-5 bg-gray-200">
                    <p>Please read the following instructions carefully before starting the test.</p>
                    <ul className='list-disc p-3'>
                        <li>Make sure you are alone in the room.</li>
                        <li>Ensure your camera is turned on during the entire test.</li>
                        <li>Any suspicious activity might lead to disqualification.</li>
                        <li>Keep your microphone unmuted at all times.</li>
                        <li>Do not use any electronic devices other than the one being used for the test.</li>
                        <li>Ensure your internet connection is stable throughout the test.</li>
                        <li>Do not attempt to leave the test screen or open any other applications.</li>
                        <li>You are not allowed to communicate with anyone during the test.</li>
                        <li>Make sure your workspace is clear of any unauthorized materials.</li>
                        <li>Follow the instructions provided for each section of the test carefully.</li>
                    </ul>
                    <div className="mt-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isAlone"
                                id="isAlone"
                                checked={isAloneChecked}
                                onChange={handleCheckboxChange}
                                className="mr-2"
                            />
                            <label htmlFor="isAlone">I confirm I am alone in the room.</label>
                        </div>
                        <div className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                name="isCamera"
                                id="isCamera"
                                checked={isCameraChecked}
                                onChange={handleCheckboxChange}
                                className="mr-2"
                            />
                            <label htmlFor="isCamera">I confirm my camera is turned on.</label>
                        </div>
                    </div>
                </div>
                <div className="video-monitoring">
                    <video ref={videoRef} autoPlay playsInline className="md:w-[30rem] md:h-[20rem] w-full h-auto rounded-xl border-4 border-[#DDD6FE] object-cover" />
                </div>
            </div>
            <div className='flex items-center justify-center flex-col gap-10'>
                <Button
                    className='rounded-xl'
                    onClick={() => window.location.href = `/test/[id]/start`}
                    disabled={!isStartButtonEnabled}
                >
                    Start Test
                </Button>
                {(!isAloneChecked || !isCameraChecked) ? <p>Please read the following instructions carefully before starting the test.</p> : null}
                <Button
                    className='rounded-xl mt-4'
                    onClick={() => router.back()}
                >
                    Go Back
                </Button>
            </div>
        </div>
            {showExitModal && (
                <Modals head='Exit Test' alert='Are you sure you want to exit the test? Your progress will be lost.' action={handleExitConfirm} button='Exit' />
            )}
        </>

        
    );
};

export default InstructionsPage;
