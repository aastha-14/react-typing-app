import React, { useState, useEffect } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "../App.css";
import { currentTime } from '../utils/time';
import { words } from '../utils/words';

const initialWords = words();

function Keyboard11() {
    const [layoutName, setLayoutName] = useState("default");

    const [leftPadding, setLeftPadding] = useState(new Array(20).fill(' ').join(''));
    const [outgoingChars, setOutgoingChars] = useState('');
    const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
    const [incomingChars, setIncomingChars] = useState(initialWords.substr(1));

    const [startTime, setStartTime] = useState();
    const [wordCount, setWordCount] = useState(0);
    const [wpm, setWpm] = useState(0);

    const [accuracy, setAccuracy] = useState(0);
    const [typedChars, setTypedChars] = useState('');

    const onKeyPress = key => {
        if (key === "{shift}" || key === "{lock}") handleShift();
        let updatedOutgoingChars = outgoingChars;
        let updatedIncomingChars = incomingChars;
        if (!startTime) {
            setStartTime(currentTime());
        }
        if (key === currentChar || (currentChar === " " && key === "{space}")) {
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
                const durationInMinutes = (currentTime() - startTime) / 6000.0;
                setWpm(((wordCount + 1) / durationInMinutes).toFixed(2));
            }
        }
        if (key !== "{shift}" && key !== "{lock}") {
            let updatedTypedChars;
            if (key === "{space}") {
                updatedTypedChars = typedChars + 'a';
            } else {
                updatedTypedChars = typedChars + key;
            }
            setTypedChars(updatedTypedChars);
            setAccuracy(((updatedOutgoingChars.length * 100) / updatedTypedChars.length).toFixed(2));
        }
    };
    const handleShift = () => {
        setLayoutName(layoutName === "default" ? "shift" : "default");
    };
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
                    <Keyboard
                        theme={"hg-theme-default myTheme1"}
                        layoutName={layoutName}
                        onKeyPress={button => onKeyPress(button)}
                    />
                    <h2>WPM: {wpm} | Accuracy: {accuracy}%</h2>
                </>
            }

        </div>
    );
}
export default Keyboard11;