
//@ts-nocheck
"use client";
import { FC, useEffect, useState } from "react";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeech } from "react-text-to-speech";

interface TextProps { }

const Text: FC<TextProps> = ({ }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    useEffect(() => {
        const populateVoices = () => {
            setVoices(window.speechSynthesis.getVoices());
        };

        populateVoices();
        window.speechSynthesis.onvoiceschanged = populateVoices;
    }, []);

    const {
        Text,
        speechStatus,
        isInQueue,
        start,
        pause,
        stop,
    } = useSpeech({
        text: "Make sure to restart your Next.js server after making these changes. This setup should work with the App Router and resolve the 404 error you were encountering.",
        voice: selectedVoice
    });

    const handleVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedVoice = voices.find(voice => voice.name === event.target.value);
        setSelectedVoice(selectedVoice || null);
    };

    return (
        <div>
            <p className="mt-6 pb-32 mb-4 rounded-md bg-base-100 lg:w-96 lg:h-48 w-64 h-64">
                <span className="ml-2 font-bold text-xl bg-base-100">generated text:</span>
                {transcript}
            </p>
            <p className="mb-2 text-xl font-bold">Microphone: {listening ? 'Listening to your voice..' : 'off'}</p>
            <div className="flex gap-3">
                <button className="btn btn-primary btn-sm" onClick={SpeechRecognition.startListening}>Start</button>
                <button className="btn btn-secondary btn-sm" onClick={SpeechRecognition.stopListening}>Stop</button>
                <button className="btn btn-accent btn-sm" onClick={resetTranscript}>Reset</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
                <Text />
                <div style={{ display: "flex", columnGap: "0.5rem" }}>
                    {speechStatus !== "started" ? <button onClick={start}>Start</button> : <button onClick={pause}>Pause</button>}
                    <button onClick={stop}>Stop</button>
                </div>
            </div>
        </div>
    );
};

export default Text;