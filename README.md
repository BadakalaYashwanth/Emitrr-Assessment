# Pattern Puzzle Game 🧩

A React-based memory puzzle game where users must observe, memorize, and recreate visual patterns based on mathematical rules.

> **[Play Live Demo](https://moonlit-manatee-f3edf4.netlify.app/)** 🚀

## 🎮 How to Play

1. **Watch**: A 5x5 grid will flash a pattern of squares.
2. **Memorize**: The pattern follows a specific hidden logic (e.g., Even numbers, Prime numbers).
3. **Recreate**: Select the squares you believe were part of the pattern.
4. **Win**: Submit your guess to check if you are correct!

## 🧠 Levels & Rules

The game gets progressively harder with abstract rules:

| Level | Rule Name | Description |
|-------|-----------|-------------|
| **1** | Even Indices | Squares with even index numbers (0, 2, 4...) |
| **2** | Diagonals | Squares on the main diagonals |
| **3** | Prime Numbers | Squares whose index is a prime number |
| **4** | Center Cluster | The center square and its direct neighbors |
| **5** | Modulo Sum | Squares where `(row + col) % 3 === 0` |

## ✨ Features

- **Progressive Difficulty**: 5 unique levels testing logic and memory.
- **Visual Feedback**: Interactive grid with success/error states.
- **Score System**: Earn points for every level completed.
- **Responsive Design**: Fully playable on desktop and mobile devices.
- **Modern UI**: Clean, dark-themed aesthetics with smooth transitions.

## 🛠️ Tech Stack

- **React 18** (Functional Components + Hooks)
- **TypeScript** (Strict typing)
- **Vite** (Fast build tool)
- **CSS Modules** (Scoped styling)
- **Netlify** (Deployment)

## 🚀 Local Development

To run this project locally:

1. **Clone the repository**
   ```bash
   git clone <https://github.com/BadakalaYashwanth/Emitrr-Assessment>
   cd pattern-puzzle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production**
   ```bash
   npm run build
   ```

## 📂 Project Structure

```
src/
├── components/      # UI Components (Grid, Cell, Dashboard)
├── hooks/           # Custom Hooks (useGameEngine)
├── logic/           # Game Rules & Predicates
├── styles/          # CSS Variables & Global Styles
├── types.ts         # TypeScript Interfaces
├── App.tsx          # Main Application Component
└── main.tsx         # Entry Point
```

---
**Enjoy the game!** 🕹️
