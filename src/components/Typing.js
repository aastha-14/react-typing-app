import React, { useState, useEffect } from 'react';
import { currentTime } from '../utils/time';
import useKeyPress from '../hooks/useKeyPress';
import { words } from '../utils/words';
const initialWords = words();

function Typing() {
    const [leftPadding, setLeftPadding] = useState(new Array(20).fill(' ').join(''));
    const [outgoingChars, setOutgoingChars] = useState('');
    const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
    const [incomingChars, setIncomingChars] = useState(initialWords.substr(1));

    const [startTime, setStartTime] = useState();
    const [wordCount, setWordCount] = useState(0);
    const [wpm, setWpm] = useState(0);

    const [accuracy, setAccuracy] = useState(0);
    const [typedChars, setTypedChars] = useState('');

    useKeyPress(key => {
        let updatedOutgoingChars = outgoingChars;
        let updatedIncomingChars = incomingChars;
        if (!startTime) {
            setStartTime(currentTime());
        }
        if (key === currentChar) {
            if (leftPadding.length > 0) {
                setLeftPadding(leftPadding.substring(1));
            }
            updatedOutgoingChars += currentChar;
            setOutgoingChars(updatedOutgoingChars);
            setCurrentChar(incomingChars.charAt(0));
            updatedIncomingChars = incomingChars.substring(1);
            if (updatedIncomingChars.split(' ').length < 10) {
                updatedIncomingChars += ' ' + words();
            }
            setIncomingChars(updatedIncomingChars);
            if (incomingChars.charAt(0) === ' ') {
                setWordCount(wordCount + 1);
            }
            // const durationInMinutes = (currentTime() - startTime) / 6000.0;
            setWpm(((wordCount / 5) / 1).toFixed(2));
        }
        const updatedTypedChars = typedChars + key;
        setTypedChars(updatedTypedChars);
        setAccuracy(((updatedOutgoingChars.length * 100) / updatedTypedChars.length).toFixed(2));
    });

    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds => seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval();
                } else {
                    setMinutes(minutes => minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [seconds, minutes]);
    return (
        <div>
            {minutes === 0 && seconds === 0 ?
                <>
                    <h2>
                        Time's Up!
                    </h2>
                    <div className="alert alert-dismissible alert-info">
                        <h3>WPM: {wpm} | Accuracy: {accuracy}%</h3>
                    </div>
                </>
                : <>
                    <h3>Time Remaining  {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h3>
                    <p className="Character">
                        <span className="Character-out">
                            {(leftPadding + outgoingChars).slice(-20)}
                        </span>
                        <span className="btn-danger disabled">{currentChar}</span>
                        <span>{incomingChars.substr(0, 20)}</span>
                    </p>
                    <h2>WPM: {wpm} | Accuracy: {accuracy}%</h2>
                </>
            }

        </div>
    );
}

export default Typing;
