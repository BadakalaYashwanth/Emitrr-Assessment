import React, { memo } from 'react';
import styles from './Cell.module.css';

interface CellProps {
    index: number;
    isActive: boolean; // For flashing
    isSelected: boolean; // For user selection
    status?: 'correct' | 'incorrect' | 'missed' | null; // For result feedback
    onClick: () => void;
    disabled: boolean;
}

const Cell: React.FC<CellProps> = ({
    isActive,
    isSelected,
    status,
    onClick,
    disabled
}) => {
    let className = styles.cell;

    if (isActive) {
        className += ` ${styles.active}`;
    }

    if (isSelected) {
        className += ` ${styles.selected}`;
    }

    if (status) {
        if (status === 'correct') className += ` ${styles.correct}`;
        if (status === 'incorrect') className += ` ${styles.incorrect}`;
        if (status === 'missed') className += ` ${styles.missed}`;
    }

    return (
        <div
            className={className}
            onClick={!disabled ? onClick : undefined}
            data-testid="cell"
        />
    );
};

export default memo(Cell);
