// "use client";
// import { useEffect, useState } from 'react';
// import Modals from './components/Modals';

// export default function Proctor({
//     children,
//     onAutoSubmit,
// }: {
//     children: React.ReactNode;
//     onAutoSubmit: () => void;
// }) {
//     const [isFullScreen, setIsFullScreen] = useState(false);
//     const [showModal, setShowModal] = useState(false);
//     const [tabChangeCount, setTabChangeCount] = useState(0);

//     const enterFullScreen = () => {
//         if (document.documentElement.requestFullscreen) {
//             document.documentElement.requestFullscreen()
//                 .then(() => setIsFullScreen(true))
//                 .catch((err) => console.error("Failed to enable full-screen mode:", err));
//         }
//     };

//     const handleVisibilityChange = () => {
//         if (document.visibilityState === 'hidden') {
//             setTabChangeCount(prevCount => {
//                 const newCount = prevCount + 1;
//                 if (newCount >= 3) {
//                     onAutoSubmit();
//                 }
//                 return newCount;
//             });
//             setShowModal(true);
//         }
//     };

//     const handleFullScreenChange = () => {
//         if (!document.fullscreenElement) {
//             setIsFullScreen(false);
//             setShowModal(true);  // Show the modal if full-screen is exited
//         }
//     };

//     useEffect(() => {
//         if (typeof document !== "undefined") {
//             document.addEventListener('visibilitychange', handleVisibilityChange);
//             document.addEventListener('fullscreenchange', handleFullScreenChange);
//         }

//         return () => {
//             if (typeof document !== "undefined") {
//                 document.removeEventListener('visibilitychange', handleVisibilityChange);
//                 document.removeEventListener('fullscreenchange', handleFullScreenChange);
//             }
//         };
//     }, []);

//     return (
//         <div className="flex h-screen w-screen overflow-hidden">
//             {!isFullScreen ? (
//                 <div className="flex flex-col gap-5 justify-center items-center w-full h-full bg-gray-200">
//                     <h1 className='text-lg font-mono font-semibold' >To Start Test</h1>
//                     <button
//                         onClick={enterFullScreen}
//                         className="px-4 py-2 bg-[#7C3AED] text-white rounded-lg"
//                     >
//                         Enter Full Screen
//                     </button>
//                 </div>
//             ) : (
//                 <div>
//                     {children}
//                 </div>
//             )}

//             {/* Modal Popup */}
//             {showModal && (
//                 <Modals
//                     head='Attention Required'
//                     alert='Please stay on this tab and remain in full-screen mode for the best experience.'
//                     action={() => { setShowModal(false); enterFullScreen(); }}
//                     button='Re-enter Full Screen'
//                 />
//             )}
//         </div>
//     );
// }



// // "use client";
// // import { useEffect, useState } from "react";
// // import Modals from "./components/Modals";

// // export default function Proctor({
// //     children,
// //     onAutoSubmit,
// //     onEnterFullScreen,
// //     onExitFullScreen,
// // }: {
// //     children: (props: { isFullScreen: boolean }) => React.ReactNode;
// //     onAutoSubmit: () => void;
// //     onEnterFullScreen: () => void;
// //     onExitFullScreen: () => void;
// // }) {
// //     const [isFullScreen, setIsFullScreen] = useState(false);
// //     const [showModal, setShowModal] = useState(false);
// //     const [tabChangeCount, setTabChangeCount] = useState(0);

// //     // Function to enable full-screen mode
// //     const enterFullScreen = () => {
// //         if (document.documentElement.requestFullscreen) {
// //             document.documentElement
// //                 .requestFullscreen()
// //                 .then(() => {
// //                     setIsFullScreen(true);
// //                     onEnterFullScreen(); // Callback when entering fullscreen
// //                 })
// //                 .catch((err) =>
// //                     console.error("Failed to enable full-screen mode:", err)
// //                 );
// //         }
// //     };

// //     // Handle tab visibility change event
// //     const handleVisibilityChange = () => {
// //         if (document.visibilityState === "hidden") {
// //             setTabChangeCount((prevCount) => {
// //                 const newCount = prevCount + 1;
// //                 if (newCount >= 3) {
// //                     onAutoSubmit(); // Auto-submit on 3 tab changes
// //                 }
// //                 return newCount;
// //             });
// //             setShowModal(true); // Show modal when visibility is hidden
// //         }
// //     };

// //     // Handle full-screen mode exit event
// //     const handleFullScreenChange = () => {
// //         if (!document.fullscreenElement) {
// //             setIsFullScreen(false); // Set fullscreen state to false
// //             setShowModal(true); // Show modal when exiting fullscreen
// //             onExitFullScreen(); // Callback when exiting fullscreen
// //         }
// //     };

// //     // Add event listeners for visibility and fullscreen changes
// //     useEffect(() => {
// //         if (typeof document !== "undefined") {
// //             document.addEventListener("visibilitychange", handleVisibilityChange);
// //             document.addEventListener("fullscreenchange", handleFullScreenChange);
// //         }
// //         return () => {
// //             if (typeof document !== "undefined") {
// //                 document.removeEventListener(
// //                     "visibilitychange",
// //                     handleVisibilityChange
// //                 );
// //                 document.removeEventListener("fullscreenchange", handleFullScreenChange);
// //             }
// //         };
// //     }, []);

// //     return (
// //         <>
// //             {/* Render children with the isFullScreen prop */}
// //             {children({ isFullScreen })}

// //             {/* Display button if not in full-screen */}
// //             {!isFullScreen && (
// //                 <div className="fixed inset-0 flex flex-col gap-5 justify-center items-center w-full h-screen bg-gray-200">
// //                     <h1 className="text-lg font-mono font-semibold">To Start Test</h1>
// //                     <button
// //                         onClick={enterFullScreen}
// //                         className="px-4 py-2 bg-[#7C3AED] text-white rounded-lg"
// //                     >
// //                         Enter Full Screen
// //                     </button>
// //                 </div>
// //             )}

// //             {/* Modal to notify users when they exit full-screen or change tabs */}
// //             {showModal && (
// //                 <Modals
// //                     head="Attention Required"
// //                     alert="Please stay on this tab and remain in full-screen mode for the best experience."
// //                     action={() => {
// //                         setShowModal(false);
// //                         enterFullScreen();
// //                     }}
// //                     action2={() => {
// //                         setShowModal(false);
// //                         enterFullScreen();
// //                     }}
// //                     button="Re-enter Full Screen"
// //                 />
// //             )}
// //         </>
// //     );
// // }

"use client";
import { useEffect, useState } from "react";
import Modals from "./components/Modals";

export default function Proctor({
    children,
    onAutoSubmit,
    // onEnterFullScreen,
    // onExitFullScreen,
}: {
    children: React.ReactNode;
    onAutoSubmit?: () => void;
    // onEnterFullScreen: () => void;
    // onExitFullScreen: () => void;
}) {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [tabChangeCount, setTabChangeCount] = useState(0);

    const enterFullScreen = () => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement
                .requestFullscreen()
                .then(() => {
                    setIsFullScreen(true);
                    // onEnterFullScreen();
                })
                .catch((err) =>
                    console.error("Failed to enable full-screen mode:", err)
                );
        }
    };

    const handleVisibilityChange = () => {
        if (document.visibilityState === "hidden") {
            setTabChangeCount((prevCount) => {
                const newCount = prevCount + 1;
                // if (newCount >= 3) {
                //     // onAutoSubmit();
                // }
                return newCount;
            });
            setShowModal(true);
        }
    };

    const handleFullScreenChange = () => {
        if (!document.fullscreenElement) {
            setIsFullScreen(false);
            setShowModal(true);
            // onExitFullScreen();
        }
    };

    useEffect(() => {
        if (typeof document !== "undefined") {
            document.addEventListener("visibilitychange", handleVisibilityChange);
            document.addEventListener("fullscreenchange", handleFullScreenChange);
        }
        return () => {
            if (typeof document !== "undefined") {
                document.removeEventListener(
                    "visibilitychange",
                    handleVisibilityChange
                );
                document.removeEventListener("fullscreenchange", handleFullScreenChange);
            }
        };
    }, []);

    return (
        <>
            {isFullScreen ? (
                children
            ) : (
                <div className="fixed inset-0 flex flex-col gap-5 justify-center items-center w-full h-screen bg-gray-200">
                    <h1 className="text-lg font-mono font-semibold">To Start Test</h1>
                    <button
                        onClick={enterFullScreen}
                        className="px-4 py-2 bg-[#7C3AED] text-white rounded-lg"
                    >
                        Enter Full Screen
                    </button>
                </div>
            )}
            {showModal && (
                <Modals
                    head="Attention Required"
                    alert="Please stay on this tab and remain in full-screen mode for the best experience."
                    action={() => {
                        setShowModal(false);
                        enterFullScreen();
                    }}
                    action2={() => {
                        setShowModal(false);
                        enterFullScreen();
                    }}
                    button="Re-enter Full Screen"
                />
            )}
        </>
    );
}
