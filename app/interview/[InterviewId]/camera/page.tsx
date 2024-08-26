// "use client"
// import React, { useEffect, useRef, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { useParams } from 'next/navigation';


// const CameraPage: React.FC = () => {
//     const [hasPermission, setHasPermission] = useState<boolean>(false);

//     const videoRef = useRef<HTMLVideoElement>(null);

//     const {testId} = useParams(); 

//     useEffect(() => {
//         const getCameraPermission = async () => {
//             try {
//                 const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//                 setHasPermission(true);
//                 if (videoRef.current) {
//                     videoRef.current.srcObject = stream;
//                     videoRef.current.play();
//                 }
//             } catch (error) {
//                 console.error('Error accessing the camera:', error);
//                 setHasPermission(false);
//             }
//         };

//         getCameraPermission();

//         return () => {
//             if (videoRef.current && videoRef.current.srcObject) {
//                 const stream = videoRef.current.srcObject as MediaStream;
//                 stream.getTracks().forEach(track => track.stop());
//             }
//         };
//     }, []);

//     return (
//         <div className="flex items-center justify-center h-screen bg-gray-200 w-full">
//             {hasPermission ? (
//                 <div className='flex flex-col gap-5'>
//                     <video ref={videoRef} className="md:w-[40rem] md:h-[25rem] w-full h-auto rounded-xl border-4 border-[#DDD6FE] object-cover" />
//                     <div className='flex flex-row items-center justify-between'>
//                         <p className="text-black font-mono">Ensure your face is aligned and clearly visible.</p>
//                         <Button onClick={() => window.location.href = `/test/${testId}/Instructions`} className='rounded-xl'>Next</Button>
//                     </div>
//                 </div>
//             ) : (
//                 <p className="text-black">Permission to access camera is required.</p>
//             )}
//         </div>
//     );
// };

// export default CameraPage;


"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Modals from '../../components/Modals';

const CameraPage: React.FC = () => {
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [showExitModal, setShowExitModal] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);

    const { interviewId } = useParams();
    const router = useRouter();

    useEffect(() => {
        const getCameraPermission = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                setHasPermission(true);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
            } catch (error) {
                console.error('Error accessing the camera:', error);
                setHasPermission(false);
            }
        };

        getCameraPermission();

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


    return (
        <>
        <div className="flex items-center justify-center h-screen bg-gray-200 w-full">
            {hasPermission ? (
                <div className='flex flex-col gap-5'>
                    <video ref={videoRef} className="md:w-[40rem] md:h-[25rem] w-full h-auto rounded-xl border-4 border-[#DDD6FE] object-cover" />
                    <div className='flex flex-row items-center justify-between'>
                        <p className="text-black font-mono">Ensure your face is aligned and clearly visible.</p>
                        <Button onClick={() => window.location.href = `/test/${interviewId}/Instructions`} className='rounded-xl'>Next</Button>
                    </div>
                </div>
            ) : (
                <p className="text-black">Permission to access camera is required.</p>
            )}
        </div>
            {showExitModal && (
                <Modals head='Exit Test' alert='Are you sure you want to exit the test? Your progress will be lost.' action={handleExitConfirm} button='Exit' />
            )}
        </>
    );
};

export default CameraPage;
