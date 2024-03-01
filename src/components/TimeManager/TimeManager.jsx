import React, { useState } from 'react';
import Timer from '../Timer/Timer';
import './TimeManager.css';

const TimeManager = () => {
    const [showFirstTimer, setShowFirstTimer] = useState(true);
    const [firstTimerDelay, setFirstTimerDelay] = useState(() => {
        const storedDelay = localStorage.getItem("firstTimerDelay");
        return storedDelay ? parseInt(storedDelay) : 1;
    });
    const [secondTimerDelay, setSecondTimerDelay] = useState(() => {
        const storedDelay = localStorage.getItem("secondTimerDelay");
        return storedDelay ? parseInt(storedDelay) : 1;
    });
    const [firstTimerRunning, setFirstTimerRunning] = useState(false);
    const [secondTimerRunning, setSecondTimerRunning] = useState(false);

    const handleToggleTimer = () => {
        setShowFirstTimer(prevShowFirstTimer => !prevShowFirstTimer);
    };

    const handleStartStop = (timer) => {
        if (timer === 'first') {
            setFirstTimerRunning(prevState => !prevState);
        } else if (timer === 'second') {
            setSecondTimerRunning(prevState => !prevState);
        }
    };

    const handleReset = (timer) => {
        if (timer === 'first') {
            setFirstTimerRunning(false);
        } else if (timer === 'second') {
            setSecondTimerRunning(false);
        }
    };

    const handleSetDelay = (timer, delay) => {
        if (timer === 'first') {
            setFirstTimerDelay(delay);
            localStorage.setItem("firstTimerDelay", delay.toString());
        } else {
            setSecondTimerDelay(delay);
            localStorage.setItem("secondTimerDelay", delay.toString());
        }
    };

    const handleResume = (timer) => {
        handleStartStop(timer);
    };

    return (
        <div className="page-container">
            <h1 className="timer-title">Таймер {showFirstTimer ? '1' : '2'}</h1>
            <div className="timer-container">
                <Timer
                    visible={showFirstTimer}
                    initialMinutes={firstTimerDelay / 60}
                    isRunning={firstTimerRunning}
                    onStart={() => handleStartStop('first')}
                    onReset={() => { handleReset('first'); setFirstTimerRunning(false); }}
                    onStop={() => handleStartStop('first')}
                    onResume={() => handleResume('first')}
                    onSetDelay={(delay) => handleSetDelay('first', delay)}
                    timerKey="firstTimer"
                />
                <Timer
                    visible={!showFirstTimer}
                    initialMinutes={secondTimerDelay / 60}
                    isRunning={secondTimerRunning}
                    onStart={() => handleStartStop('second')}
                    onReset={() => { handleReset('second'); setSecondTimerRunning(false); }}
                    onStop={() => handleStartStop('second')}
                    onResume={() => handleResume('second')}
                    onSetDelay={(delay) => handleSetDelay('second', delay)}
                    timerKey="secondTimer"
                />
            </div>
            <button className="toggle-button" onClick={handleToggleTimer}>Переключить таймер</button>
        </div>
    );
};

export default TimeManager;
