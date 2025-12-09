export type GameStatus = 'IDLE' | 'FLASHING' | 'GUESSING' | 'RESULT';

export interface LevelRule {
    id: number;
    name: string;
    description: string;
    predicate: (index: number) => boolean;
}

export interface GameState {
    level: number;
    status: GameStatus;
    score: number;
    history: { level: number; success: boolean }[];
}
