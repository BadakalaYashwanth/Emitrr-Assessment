import type { LevelRule } from '../types';

export const isPrime = (num: number): boolean => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

export const LEVEL_RULES: LevelRule[] = [
    {
        id: 1,
        name: 'Even Indices',
        description: 'Even indices', // Flash squares where index % 2 === 0
        predicate: (index) => index % 2 === 0,
    },
    {
        id: 2,
        name: 'Diagonals',
        description: 'Diagonals', // Flash squares where (row === col) or (row + col === 4)
        predicate: (index) => {
            const row = Math.floor(index / 5);
            const col = index % 5;
            return row === col || row + col === 4;
        },
    },
    {
        id: 3,
        name: 'Prime Numbers',
        description: 'Prime numbers', // Flash squares whose index is a prime number
        predicate: (index) => isPrime(index),
    },
    {
        id: 4,
        name: 'Center Cluster',
        description: 'Center cluster', // Flash center (12) and its 4 direct neighbors
        predicate: (index) => {
            // Center is 12 (row 2, col 2)
            // Neighbors: 7 (top), 17 (bottom), 11 (left), 13 (right)
            return [12, 7, 17, 11, 13].includes(index);
        },
    },
    {
        id: 5,
        name: 'Modulo Sum',
        description: '(row + col) % 3 === 0',
        predicate: (index) => {
            const row = Math.floor(index / 5);
            const col = index % 5;
            return (row + col) % 3 === 0;
        },
    },
];
