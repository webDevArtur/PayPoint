import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ visible, initialMinutes, isRunning, onStart, onReset, onStop, onResume, onSetDelay, timerKey }) => {
    const [time, setTime] = useState({ minutes: initialMinutes, seconds: 0 });
    const [inputValue, setInputValue] = useState('');
    const [isFinished, setIsFinished] = useState(false);
    const [isInputEmpty, setIsInputEmpty] = useState(true);
    const [inputError, setInputError] = useState('');

    useEffect(() => {
        let interval;

        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => {
                    let newSeconds = prevTime.seconds - 1;
                    let newMinutes = prevTime.minutes;

                    if (newSeconds < 0) {
                        newSeconds = 59;
                        newMinutes -= 1;
                    }

                    if (newMinutes === 0 && newSeconds === 0) {
                        clearInterval(interval);
                        setIsFinished(true);
                    }

                    return { minutes: newMinutes, seconds: newSeconds };
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        const storedTime = localStorage.getItem(timerKey);
        if (storedTime) {
            const parsedTime = JSON.parse(storedTime);
            const timeElapsed = Math.floor((Date.now() - parsedTime.startTime) / 1000);
            const remainingTime = parsedTime.initialMinutes * 60 - timeElapsed;
            if (remainingTime > 0) {
                setTime({ minutes: Math.floor(remainingTime / 60), seconds: remainingTime % 60 });
                if (parsedTime.isRunning && !isRunning) {
                    onStart();
                }
            } else {
                onReset();
            }
        }
    }, []);

    useEffect(() => {
        if (isRunning) {
            const initialDelayInSeconds = initialMinutes * 60;
            onSetDelay(initialDelayInSeconds);
            localStorage.setItem(timerKey, JSON.stringify({ initialMinutes, startTime: Date.now(), isRunning: true }));
        }
    }, [isRunning, initialMinutes, onSetDelay]);

    const resetTimer = () => {
        onReset();
        const storedTime = localStorage.getItem(timerKey);
        if (storedTime) {
            const parsedTime = JSON.parse(storedTime);
            const remainingTime = parsedTime.initialMinutes * 60;
            setTime({ minutes: Math.floor(remainingTime / 60), seconds: remainingTime % 60 });
            setIsFinished(false);
            onStart();
        } else {
            setTime({ minutes: initialMinutes, seconds: 0 });
            setIsFinished(false);
        }
    };

    const handleStart = () => {
        const minutes = parseInt(inputValue);
        if (!isNaN(minutes) && minutes > 0) {
            onStart();
            onSetDelay(minutes * 60);
            setTime({ minutes, seconds: 0 });
            setInputValue('');
            setIsFinished(false);
            localStorage.setItem(timerKey, JSON.stringify({ initialMinutes: minutes, startTime: Date.now(), isRunning: true }));
            setInputError('');
        } else {
            setInputError('Введите положительное число');
        }
    };

    const handleStopResume = () => {
        if (isRunning) {
            onStop();
            setIsFinished(false);
        } else if (time.minutes === 0 && time.seconds === 0) {
            resetTimer();
        } else {
            onResume();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleStart();
        }
    };

    useEffect(() => {
        setIsInputEmpty(inputValue.trim() === '');
    }, [inputValue]);

    useEffect(() => {
        onStop();
    }, []);

    return visible ? (
        <div className="timer-container">
            <div className="timer">
                <div className="timer-display">
                    {isFinished ? "Готово" : `Таймер: ${time.minutes < 10 ? `0${time.minutes}` : time.minutes}:${time.seconds < 10 ? `0${time.seconds}` : time.seconds}`}
                </div>
                {!isRunning && (
                    <>
                        <input className="timer-input" type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} />
                        {inputError && <div className="input-error">{inputError}</div>}
                    </>
                )}
                <div className="button-group">
                    {isRunning ? (
                        <>
                            <button className="timer-button stop" onClick={handleStopResume}>Стоп</button>
                            <button className="timer-button reset" onClick={resetTimer}>Сброс</button>
                        </>
                    ) : (
                        <>
                            {!isInputEmpty && (
                                <button className="timer-button start" onClick={handleStart}>Старт</button>
                            )}
                            {isInputEmpty && time.minutes === 0 && time.seconds === 0 && (
                                <button className="timer-button start" onClick={handleStart}>Старт</button>
                            )}
                            {isInputEmpty && time.minutes !== 0 && time.seconds !== 0 && (
                                <button className="timer-button resume" onClick={onResume}>Продолжить</button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    ) : null;
};

export default Timer;
