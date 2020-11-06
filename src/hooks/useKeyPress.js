import { useState, useEffect } from 'react';

function useKeyPress(callback) {
    const [keyPressed, setKeyPressed] = useState();
    function downHandler({ key }) {
        if (keyPressed !== key && key.length === 1) {
            setKeyPressed(key);
            callback && callback(key);
        }
    }
    function upHandler() {
        setKeyPressed(null);
    }
    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
        //eslint-disable-next-line
    });
    return keyPressed;
}

export default useKeyPress;
