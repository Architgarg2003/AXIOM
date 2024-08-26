'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Modals from '../../components/Modals';

const ResultPage = () => {
    const [score, setScore] = useState<number>(0);
    const [feedback, setFeedback] = useState<string>('');
    const [showExitModal, setShowExitModal] = useState(false);

    const router = useRouter();

    useEffect(() => {
        // Calculate the score based on the user's answers
        // This is just a placeholder, implement your logic here
        const calculatedScore = Math.floor(Math.random() * 100);
        setScore(calculatedScore);

        // Determine feedback based on the score
        if (calculatedScore > 80) {
            setFeedback('Excellent work! Keep it up!');
        } else if (calculatedScore > 50) {
            setFeedback('Good job! You can improve further.');
        } else {
            setFeedback('Needs improvement. Better luck next time.');
        }

        // Add beforeunload event listener
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const handleExit = () => {
        setShowExitModal(true);
    };

    const handleExitConfirm = () => {
        setShowExitModal(false);
        router.push('/exploreTest');
    };

    const handleExitCancel = () => {
        setShowExitModal(false);
    };

    return (
        <div>
            <h1>Test Results</h1>
            <h2>Your Score: {score}</h2>
            <p>{feedback}</p>
            <button onClick={handleExit}>Exit Test</button>
            {showExitModal && (
                <Modals
                    head='Exit Test'
                    alert='Are you sure you want to exit the test? Your progress will be lost.'
                    action={handleExitConfirm}
                    button='Exit'
                    // onCancel={handleExitCancel}
                />
            )}
        </div>
    );
};

export default ResultPage;