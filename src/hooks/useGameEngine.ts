import { useState, useEffect, useCallback, useRef } from 'react';
import type { GameStatus } from '../types';
import { LEVEL_RULES as RULES } from '../logic/rules';

export const useGameEngine = () => {
    const [level, setLevel] = useState(1);
    const [gameStatus, setGameStatus] = useState<GameStatus>('IDLE');
    const [score, setScore] = useState(0);
    const [isFlashVisible, setIsFlashVisible] = useState(false);
    const [userSelection, setUserSelection] = useState<Set<number>>(new Set());
    const [feedback, setFeedback] = useState<'success' | 'failure' | null>(null);

    const flashIntervalRef = useRef<number | null>(null);
    const phaseTimeoutRef = useRef<number | null>(null);

    const currentRule = RULES.find((r) => r.id === level) || RULES[0];

    const clearTimers = () => {
        if (flashIntervalRef.current) clearInterval(flashIntervalRef.current);
        if (phaseTimeoutRef.current) clearTimeout(phaseTimeoutRef.current);
    };

    const startGame = useCallback(() => {
        setGameStatus('FLASHING');
        setUserSelection(new Set());
        setFeedback(null);
        setIsFlashVisible(true);

        // Flash timer: toggle every 1s (500ms on, 500ms off)
        // Req: "1s on/off". Let's assume 1s cycle (500ms visible).
        flashIntervalRef.current = window.setInterval(() => {
            setIsFlashVisible((prev) => !prev);
        }, 1000); // Toggles every 1 second

        // Phase timer: 10s then stop
        phaseTimeoutRef.current = window.setTimeout(() => {
            clearTimers();
            setIsFlashVisible(false); // Ensure off when guessing starts
            setGameStatus('GUESSING');
        }, 10000);
    }, []);

    const handleCellClick = useCallback(
        (index: number) => {
            if (gameStatus !== 'GUESSING') return;

            setUserSelection((prev) => {
                const newSet = new Set(prev);
                if (newSet.has(index)) {
                    newSet.delete(index);
                } else {
                    newSet.add(index);
                }
                return newSet;
            });
        },
        [gameStatus]
    );

    const submitGuess = useCallback(() => {
        const correctIndices: number[] = [];
        for (let i = 0; i < 25; i++) {
            if (currentRule.predicate(i)) {
                correctIndices.push(i);
            }
        }

        // Check if selection matches correct indices
        const selection = Array.from(userSelection);
        const isCorrect =
            selection.length === correctIndices.length &&
            selection.every((val) => correctIndices.includes(val));

        if (isCorrect) {
            setScore((prev) => prev + 100);
        }

        setFeedback(isCorrect ? 'success' : 'failure');
        setGameStatus('RESULT');
    }, [currentRule, userSelection]);

    const nextLevel = useCallback(() => {
        if (level < 5) {
            setLevel((prev) => prev + 1);
            setGameStatus('IDLE');
            setFeedback(null);
            setUserSelection(new Set());
        } else {
            // Game complete logic or loop? 
            // Req: "Level 5... Add more levels if creative". 
            // For now loop or just stay? Let's stay at 5 or reset.
            // Let's just reset feedback and stay idle at 5.
            // Or wrap to 1? Let's just go to IDLE at next level if exists.
            // Actually for now let's just loop to 1 for infinite play or show 'Game Over'.
            // Let's cap at 5.
            alert("You've completed all levels!");
            setLevel(1);
            setGameStatus('IDLE');
            setFeedback(null);
        }
    }, [level]);

    const retryLevel = useCallback(() => {
        setGameStatus('IDLE');
        setFeedback(null);
        setUserSelection(new Set());
    }, []);

    useEffect(() => {
        return () => clearTimers();
    }, []);

    return {
        level,
        gameStatus,
        score,
        isFlashVisible,
        userSelection,
        feedback,
        currentRule,
        startGame,
        handleCellClick,
        submitGuess,
        nextLevel,
        retryLevel
    };
};
