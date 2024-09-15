// import React, { useState, useEffect } from "react";

// interface TextToSpeechI{
//     text:any;
// }

// const TextToSpeech = ({ text }: TextToSpeechI) => {
//     const [isPaused, setIsPaused] = useState(false);
//     const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

//     useEffect(() => {
//         const synth = window.speechSynthesis;
//         const u = new SpeechSynthesisUtterance(text);

//         setUtterance(u);

//         return () => {
//             synth.cancel();
//         };
//     }, [text]);

//     const handlePlay = () => {
//         const synth = window.speechSynthesis;

//         if (isPaused) {
//             synth.resume();
//         }

//         if (utterance){
//             utterance.voice = window.speechSynthesis.getVoices()[0];
//             utterance.pitch = 1;
//             utterance.rate = 1.1;
//             utterance.volume = 100;
//             synth.speak(utterance);
//         }

//         setIsPaused(false);
//     };

//     const handlePause = () => {
//         const synth = window.speechSynthesis;

//         synth.pause();

//         setIsPaused(true);
//     };

//     const handleStop = () => {
//         const synth = window.speechSynthesis;

//         synth.cancel();

//         setIsPaused(false);
//     };

//     return (
//         <div>
//             <button onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</button>
//             <button onClick={handlePause}>Pause</button>
//             <button onClick={handleStop}>Stop</button>
//         </div>
//     );
// };

// export default TextToSpeech;

////////////////////////////////////////


// import React, { useState, useEffect } from "react";

// interface TextToSpeechI {
//     text: string;
// }

// const TextToSpeech: React.FC<TextToSpeechI> = ({ text }) => {
//     const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

//     useEffect(() => {
//         const synth = window.speechSynthesis;
//         const u = new SpeechSynthesisUtterance(text);
//         u.pitch = 1;
//         u.rate = 1.1;
//         u.volume = 1;

//         setUtterance(u);
//     }, [text]);

//     const handleSpeak = () => {
//         if (utterance) {
//             window.speechSynthesis.speak(utterance);
//         }
//     };

//     return (
//         <button onClick={handleSpeak}>Speak</button>
//     );
// };

// export default TextToSpeech;



/////////////////////////////////////


import React, { useState, useEffect } from "react";

interface TextToSpeechProps {
    text: string;
    autoSpeak?: boolean;
    onSpeechEnd?: () => void;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text, autoSpeak = false, onSpeechEnd }) => {
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        const synth = window.speechSynthesis;
        const u = new SpeechSynthesisUtterance(text);
        u.pitch = 1;
        u.rate = 1.1;
        u.volume = 1;

        u.onend = () => {
            if (onSpeechEnd) {
                onSpeechEnd();
            }
        };

        setUtterance(u);

        if (autoSpeak) {
            synth.speak(u);
        }

        return () => {
            synth.cancel();
        };
    }, [text, autoSpeak, onSpeechEnd]);

    const handleSpeak = () => {
        if (utterance) {
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <>
            {!autoSpeak && <button onClick={handleSpeak}>Speak</button>}
        </>
    );
};

export default TextToSpeech;