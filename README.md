# N-Queens Visualizer (React)

A beautiful and interactive N-Queens puzzle visualizer built with React. This application demonstrates all possible solutions for placing N queens on an N×N chessboard such that no two queens attack each other.

## Features

- **Interactive Visualization**: Watch the algorithm solve the N-Queens problem step by step
- **Speed Control**: Adjust the visualization speed with a slider
- **Multiple Solutions**: View all possible arrangements for a given board size
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, gradient-based design with smooth animations

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd n-queens-visualizer-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to Use

1. Enter the number of queens (1-8) in the input field
2. Adjust the speed using the slider (left = slower, right = faster)
3. Click the "Play" button to start the visualization
4. Watch as the algorithm finds all possible solutions
5. Use the "Stop" button to halt the process at any time

## Technical Details

### Project Structure

```
src/
├── components/
│   ├── Header.js          # Application header
│   ├── Controls.js        # Input controls and buttons
│   ├── ChessBoard.js      # Container for all chess boards
│   └── Board.js           # Individual chess board component
├── hooks/
│   └── useNQueensVisualizer.js  # Custom hook for N-Queens algorithm
├── App.js                 # Main application component
├── App.css               # Application styles
├── index.js              # React entry point
└── index.css             # Global styles
```

### Algorithm

The application uses a backtracking algorithm to solve the N-Queens problem:

1. **Placement**: Try placing a queen in each column of the current row
2. **Validation**: Check if the placement conflicts with existing queens
3. **Recursion**: If valid, move to the next row and repeat
4. **Backtracking**: If no valid placement exists, backtrack and try the next position
5. **Solution**: When all queens are placed, record the solution

### Performance

- Supports board sizes from 1×1 to 8×8
- Optimized React rendering with proper state management
- Smooth animations with configurable speed control

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Browser Support

This application works in all modern browsers that support ES6+ features and React 18.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request
