import React, { useState, useCallback, useRef } from 'react';

function App() {
  const [n, setN] = useState('');
  const [speed, setSpeed] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [solutions, setSolutions] = useState([]);
  const [currentBoard, setCurrentBoard] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [solvingBoardIndex, setSolvingBoardIndex] = useState(0);
  const stopRef = useRef(false);

  const delay = async () => {
    const delayTime = (100 - speed) * 10;
    await new Promise(resolve => setTimeout(resolve, delayTime));
  };

  const isValid = (board, row, col, n) => {
    // Check column
    for (let i = 0; i < row; i++) {
      if (board[i] === col) return false;
    }
    // Check diagonals
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i] === j) return false;
    }
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i] === j) return false;
    }
    return true;
  };

  const solveQueen = async (board, row, n, allSolutions) => {
    if (stopRef.current) return;

    // Update current board state for visualization
    setCurrentBoard([...board]);
    await delay();

    if (row === n) {
      // Found a solution
      allSolutions.push([...board]);
      setSolutions([...allSolutions]);
      setSolvingBoardIndex(allSolutions.length);
      await delay();
      return;
    }

    for (let col = 0; col < n; col++) {
      if (stopRef.current) return;

      // Show queen placement attempt
      board[row] = col;
      setCurrentBoard([...board]);
      await delay();

      if (isValid(board, row, col, n)) {
        await solveQueen(board, row + 1, n, allSolutions);
      }
      
      // Backtrack - remove queen
      board[row] = -1;
      setCurrentBoard([...board]);
      await delay();
    }
  };

  const handlePlay = useCallback(async () => {
    const numQueens = parseInt(n);
    
    if (numQueens > 8) {
      alert("Maximum 8 queens allowed");
      return;
    } else if (numQueens < 1) {
      alert("Minimum 1 queen required");
      return;
    }

    setIsRunning(true);
    stopRef.current = false;
    setSolutions([]);
    setCurrentBoard(new Array(numQueens).fill(-1));
    setSolvingBoardIndex(0);

    const board = new Array(numQueens).fill(-1);
    const allSolutions = [];

    try {
      await solveQueen(board, 0, numQueens, allSolutions);
    } finally {
      setIsRunning(false);
      setCurrentBoard([]);
    }
  }, [n, speed]);

  const handleStop = useCallback(() => {
    stopRef.current = true;
    setIsRunning(false);
    setCurrentBoard([]);
  }, []);

  const renderBoard = (boardState, index, isActive = false) => {
    const numQueens = parseInt(n);
    
    return (
      <div key={index} className={`bg-white rounded-xl shadow-lg border-2 p-6 transition-all duration-300 ${isActive ? 'border-yellow-400 shadow-2xl transform scale-105' : 'border-gray-200 hover:shadow-xl hover:border-blue-300'}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {isActive ? (
              <span className="text-orange-600">🔄 Solving...</span>
            ) : (
              <span className="text-blue-600">✨ Solution {index + 1}</span>
            )}
          </h3>
          {!isActive && <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">✅ Valid</div>}
        </div>
        <div className="flex justify-center">
          <table className="border-collapse border-2 border-gray-400 rounded-lg overflow-hidden shadow-md">
            <tbody>
              {Array.from({ length: numQueens }, (_, row) => (
                <tr key={row}>
                  {Array.from({ length: numQueens }, (_, col) => {
                    const isLight = (row + col) % 2 === 0;
                    const hasQueen = boardState[row] === col;
                    const isConflict = isActive && hasQueen && !isValid(boardState, row, col, numQueens);
                    
                    return (
                      <td
                        key={col}
                        className={`w-16 h-16 relative border border-gray-300 ${isLight ? 'bg-blue-50' : 'bg-yellow-50'} ${hasQueen ? 'bg-green-100' : ''} ${isConflict ? 'bg-red-100' : ''} transition-colors duration-200`}
                      >
                        {hasQueen && (
                          <div className="absolute inset-0 flex items-center justify-center text-3xl">
                            <span className={isConflict ? 'text-red-600' : 'text-purple-600'}>♛</span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-normal">
                <span className="text-blue-500">N</span>
                <span className="text-red-500">-</span>
                <span className="text-yellow-500">Q</span>
                <span className="text-blue-500">u</span>
                <span className="text-green-500">e</span>
                <span className="text-red-500">e</span>
                <span className="text-yellow-500">n</span>
                <span className="text-blue-500">s</span>
              </span>
              <span className="text-2xl">♛</span>
            </div>
            <div className="text-sm text-gray-600">Visualizer</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-16">
          
          {/* Search Section - Google Style */}
          <div className="text-center mb-16">
            <div className="mb-12">
              <h1 className="text-5xl font-light text-gray-900 mb-4">
                <span className="text-blue-500">N-Queens</span> <span className="text-gray-900">Solver</span>
              </h1>
              <p className="text-xl text-gray-600">Enter the number of queens to visualize the solution</p>
            </div>
            
            <div className="max-w-xl mx-auto mb-12">
              <div className={`relative ${isInputFocused ? 'shadow-2xl' : 'shadow-lg'} transition-all duration-300 transform ${isInputFocused ? 'scale-105' : ''}`}>
                <input
                  type="number"
                  className="w-full px-8 py-6 text-xl border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-50 disabled:text-gray-500 bg-white"
                  value={n}
                  onChange={(e) => setN(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder="Enter number of queens (1-8)"
                  min="1"
                  max="8"
                  disabled={isRunning}
                />
              </div>
            </div>

            {/* Google-style Buttons */}
            <div className="flex justify-center space-x-6 mb-10">
              {!isRunning ? (
                <button 
                  className="px-12 py-4 bg-blue-500 text-white text-lg rounded-full hover:bg-blue-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg" 
                  onClick={handlePlay} 
                  disabled={!n}
                >
                  🔍 Solve N-Queens
                </button>
              ) : (
                <button className="px-12 py-4 bg-red-500 text-white text-lg rounded-full hover:bg-red-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-medium shadow-lg" onClick={handleStop}>
                  ⏹️ Stop Solving
                </button>
              )}
            </div>

            {/* Speed Control - Enhanced */}
            {n && (
              <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <label className="block text-gray-700 text-lg font-medium mb-4 text-center">⚡ Animation Speed</label>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-500 text-sm font-medium">🐌 Slow</span>
                  <div className="flex-1 relative">
                    <input
                      type="range"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                      min="0"
                      max="100"
                      value={speed}
                      onChange={(e) => setSpeed(parseInt(e.target.value))}
                      disabled={isRunning}
                    />
                  </div>
                  <span className="text-gray-500 text-sm font-medium">🚀 Fast</span>
                </div>
                <div className="text-center mt-2 text-sm text-blue-600 font-medium">
                  Speed: {speed}%
                </div>
              </div>
            )}
          </div>

          {/* Results Info */}
          {(solutions.length > 0 || isRunning) && (
            <div className="text-center mb-12 py-6 bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 rounded-2xl border-2 border-blue-200 shadow-lg">
              <div className="text-xl text-gray-700 font-medium">
                {isRunning ? (
                  <>🔄 Solving... Found <strong className="text-green-600 text-2xl">{solutions.length}</strong> solution{solutions.length !== 1 ? 's' : ''} so far</>
                ) : (
                  <>🎉 Found <strong className="text-green-600 text-2xl">{solutions.length}</strong> solution{solutions.length !== 1 ? 's' : ''} for <strong className="text-blue-600 text-2xl">{n}×{n}</strong> board</>
                )}
              </div>
            </div>
          )}

          {/* Chess Boards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Show solving board if running */}
            {isRunning && currentBoard.length > 0 && (
              renderBoard(currentBoard, -1, true)
            )}
            
            {/* Show all found solutions */}
            {solutions.map((solution, index) => 
              renderBoard(solution, index, false)
            )}
          </div>

          {/* Loading State */}
          {isRunning && solutions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200"></div>
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent absolute top-0 left-0"></div>
              </div>
              <div className="text-blue-600 mt-4 font-medium">🚀 Starting to solve N-Queens puzzle...</div>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16 bg-gradient-to-r from-blue-50 via-green-50 to-yellow-50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center space-x-3 text-sm">
            <span className="text-blue-600 font-medium">🔵 N-Queens Visualizer</span>
            <span className="text-gray-400">•</span>
            <span className="text-green-600">⚛️ Built with React</span>
            <span className="text-gray-400">•</span>
            <span className="text-red-500">🧠 Backtracking Algorithm</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;