'use client';

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';
import React, { useState, useEffect } from 'react';
import Proctor from '../../Proctor';
import { useRouter } from 'next/navigation';
import Modals from '../../components/Modals';

const questions = [
    { id: 1, question: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris', 'Rome'], answer: 2 },
    { id: 2, question: 'Which planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Jupiter', 'Venus'], answer: 1 },
    { id: 3, question: 'What is the largest ocean on Earth?', options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'], answer: 2 },
    { id: 4, question: 'Who wrote "Hamlet"?', options: ['Charles Dickens', 'J.K. Rowling', 'William Shakespeare', 'Mark Twain'], answer: 2 },
    { id: 5, question: 'Who wrote "Hamlet"?', options: ['Charles Dickens', 'J.K. Rowling', 'William Shakespeare', 'Mark Twain'], answer: 2 },
    { id: 6, question: 'Who wrote "Hamlet"?', options: ['Charles Dickens', 'J.K. Rowling', 'William Shakespeare', 'Mark Twain'], answer: 2 },
    { id: 7, question: 'Who wrote "Hamlet"?', options: ['Charles Dickens', 'J.K. Rowling', 'William Shakespeare', 'Mark Twain'], answer: 2 },
    // Add more questions as needed
];

const TestPage = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const [showExitModal, setShowExitModal] = useState(false);


    const router = useRouter();
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        // Add popstate event listener
        window.history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', handlePopState);

        return () => {
            clearInterval(timer);
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

    const handleOptionChange = (index: number) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[currentQuestion] = index;
        setSelectedAnswers(updatedAnswers);
    };

    const handleQuestionClick = (index: number) => {
        setCurrentQuestion(index);
    };

    const handleSubmit = () => {
        window.location.href = `/test/[id]/result`;
        // Logic to submit the test and calculate results
    };

    const handleAutoSubmit = () => {
        alert("Test is being auto-submitted due to tab changes.");
        handleSubmit();
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <Proctor onAutoSubmit={handleAutoSubmit}>
            <div className='p-5 h-screen w-screen overflow-hidden scroll-m-0'>
                <div className='flex flex-row items-center justify-around p-2'>
                    <Heading>Test</Heading>
                    <div className="timer">
                        <h2>Time Left: {formatTime(timeLeft)}</h2>
                    </div>
                    <Button size={'sm'} variant={'destructive'} onClick={handleSubmit}>Submit Test</Button>
                </div>
                <Separator />
                <div className='h-full'>
                    <div className='flex flex-row items-start justify-between pt-5 gap-5 h-[70%] '>
                        <div className="bg-slate-200 h-full  w-[60%] p-20 rounded-xl">
                            <div className="question-side">
                                <h2>{`Question ${currentQuestion + 1}: ${questions[currentQuestion].question}`}</h2>
                                {questions[currentQuestion].options.map((option, index) => (
                                    <div key={index}>
                                        <input
                                            type="radio"
                                            name="option"
                                            checked={selectedAnswers[currentQuestion] === index}
                                            onChange={() => handleOptionChange(index)}
                                        />
                                        <label>{option}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='bg-slate-200 h-full w-[40%] rounded-xl'>
                            <div className=" p-20  grid gap-8 grid-cols-4">
                                {questions.map((_, index) => {
                                    const isSelected = selectedAnswers[index] !== -1;
                                    const isActive = currentQuestion === index;
                                    const buttonColor = isActive
                                        ? 'bg-[#7C3AED]'
                                        : isSelected
                                            ? 'bg-[#E9D5FF]'
                                            : 'bg-gray-400';

                                    return (
                                        <button
                                            key={index}
                                            className={`h-10 w-10 rounded-lg ${buttonColor}`}
                                            onClick={() => handleQuestionClick(index)}
                                        >
                                            {index + 1}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='pt-10'>
                        <Separator />
                        <div className="flex flex-row items-center justify-between px-20 py-4 bp-20 bottom-0">
                            <Button
                                onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
                                disabled={currentQuestion === 0}
                            >
                                Previous
                            </Button>
                            <Button
                                onClick={() => setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1))}
                                disabled={currentQuestion === questions.length - 1}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {showExitModal && (
                <Modals head='Exit Test' alert='Are you sure you want to exit the test? Your progress will be lost.' action={handleExitConfirm} button='Exit'  />
            )}
        </Proctor>
    );
};

export default TestPage;
