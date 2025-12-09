import React from 'react';
import Cell from './Cell';
import styles from './Grid.module.css';

interface GridProps {
    onCellClick: (index: number) => void;
    isFlashVisible: boolean;
    userSelection: Set<number>;
    currentRule: (index: number) => boolean;
    gameStatus: 'IDLE' | 'FLASHING' | 'GUESSING' | 'RESULT';
}

const Grid: React.FC<GridProps> = ({
    onCellClick,
    isFlashVisible,
    userSelection,
    currentRule,
    gameStatus,
}) => {
    return (
        <div className={styles.grid}>
            {Array.from({ length: 25 }).map((_, i) => {
                const isPattern = currentRule(i);
                const isActive = isFlashVisible && isPattern; // Flash only if correct part of pattern
                const isSelected = userSelection.has(i);

                let status: 'correct' | 'incorrect' | 'missed' | null = null;
                if (gameStatus === 'RESULT') {
                    if (isSelected && isPattern) status = 'correct';
                    else if (isSelected && !isPattern) status = 'incorrect';
                    else if (!isSelected && isPattern) status = 'missed';
                }

                return (
                    <Cell
                        key={i}
                        index={i}
                        isActive={isActive}
                        isSelected={isSelected}
                        status={status}
                        onClick={() => onCellClick(i)}
                        disabled={gameStatus !== 'GUESSING'}
                    />
                );
            })}
        </div>
    );
};

export default Grid;
