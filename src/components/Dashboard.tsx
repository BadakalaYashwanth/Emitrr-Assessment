import React from 'react';
import Grid from './Grid';
import { useGameEngine } from '../hooks/useGameEngine';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
    const {
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
    } = useGameEngine();

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <div className={styles.headerTop}>
                    <div className={styles.levelBadge}>Level {level}</div>
                    <div className={styles.levelBadge}>Score: {score}</div>
                </div>
                <h2 className={styles.ruleTitle}>
                    {gameStatus !== 'IDLE' ? currentRule.name : 'Ready?'}
                </h2>
                <p className={styles.ruleDesc}>
                    {gameStatus === 'IDLE'
                        ? "Memorize the pattern, then recreate it."
                        : gameStatus === 'FLASHING'
                            ? "Watch the pattern..."
                            : currentRule.description}
                </p>
            </header>

            <div className={styles.gridContainer}>
                <Grid
                    onCellClick={handleCellClick}
                    isFlashVisible={isFlashVisible}
                    userSelection={userSelection}
                    currentRule={currentRule.predicate}
                    gameStatus={gameStatus}
                />
            </div>

            <div className={styles.controls}>
                {gameStatus === 'IDLE' && (
                    <button className={styles.primaryButton} onClick={startGame}>
                        Start Game
                    </button>
                )}

                {(gameStatus === 'FLASHING') && (
                    <div className={styles.timerIndicator}>
                        Memorize!
                    </div>
                )}

                {gameStatus === 'GUESSING' && (
                    <button className={styles.primaryButton} onClick={submitGuess}>
                        Submit Guess
                    </button>
                )}

                {gameStatus === 'RESULT' && (
                    <div className={styles.resultActions}>
                        {feedback === 'success' ? (
                            <>
                                <div className={styles.successMsg}>Correct!</div>
                                <button className={styles.primaryButton} onClick={nextLevel}>
                                    Next Level
                                </button>
                            </>
                        ) : (
                            <>
                                <div className={styles.errorMsg}>Incorrect!</div>
                                <button className={styles.secondaryButton} onClick={retryLevel}>
                                    Try Again
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
