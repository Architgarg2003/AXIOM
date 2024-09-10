"use client";
import { useEffect, useState } from 'react';
import Modals from './components/Modals';

export default function Proctor({
    children,
    onAutoSubmit,
}: {
    children: React.ReactNode;
    onAutoSubmit: () => void;
}) {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [tabChangeCount, setTabChangeCount] = useState(0);

    const enterFullScreen = () => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen()
                .then(() => setIsFullScreen(true))
                .catch((err) => console.error("Failed to enable full-screen mode:", err));
        }
    };

    const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
            setTabChangeCount(prevCount => {
                const newCount = prevCount + 1;
                if (newCount >= 3) {
                    onAutoSubmit();
                }
                return newCount;
            });
            setShowModal(true);
        }
    };

    const handleFullScreenChange = () => {
        if (!document.fullscreenElement) {
            setIsFullScreen(false);
            setShowModal(true);  // Show the modal if full-screen is exited
        }
    };

    useEffect(() => {
        if (typeof document !== "undefined") {
            document.addEventListener('visibilitychange', handleVisibilityChange);
            document.addEventListener('fullscreenchange', handleFullScreenChange);
        }

        return () => {
            if (typeof document !== "undefined") {
                document.removeEventListener('visibilitychange', handleVisibilityChange);
                document.removeEventListener('fullscreenchange', handleFullScreenChange);
            }
        };
    }, []);

    return (
        <div className="flex h-screen w-screen overflow-hidden">
            {!isFullScreen ? (
                <div className="flex flex-col gap-5 justify-center items-center w-full h-full bg-gray-200">
                    <h1 className='text-lg font-mono font-semibold' >To Start Test</h1>
                    <button
                        onClick={enterFullScreen}
                        className="px-4 py-2 bg-[#7C3AED] text-white rounded-lg"
                    >
                        Enter Full Screen
                    </button>
                </div>
            ) : (
                <div>
                    {children}
                </div>
            )}

            {/* Modal Popup */}
            {showModal && (
                <Modals 
                    head='Attention Required'
                    alert='Please stay on this tab and remain in full-screen mode for the best experience.'
                    action={() => {setShowModal(false); enterFullScreen();}}
                    button='Re-enter Full Screen'
                />
            )}
        </div>
    );
}