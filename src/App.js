import React, { useState, useCallback, useRef } from 'react';
import './App.css';

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
      <div key={index} className={`board-card ${isActive ? 'active' : ''}`}>
        <div className="board-header">
          <h3 className="board-title">
            {isActive ? 'Solving...' : `Solution ${index + 1}`}
          </h3>
          {!isActive && <div className="board-badge">Valid</div>}
        </div>
        <div className="board-container">
          <table className="chess-table">
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
                        className={`chess-cell ${isLight ? 'light' : 'dark'} ${hasQueen ? 'has-queen' : ''} ${isConflict ? 'conflict' : ''}`}
                      >
                        {hasQueen && (
                          <div className="queen-piece">
                            <i className="fas fa-chess-queen"></i>
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
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-text">N-Queens</span>
            <span className="logo-crown">♛</span>
          </div>
          <div className="tagline">Visualize the classic chess puzzle</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        <div className="container">
          
          {/* Input Section */}
          <div className="input-section">
            <div className={`search-box ${isInputFocused ? 'focused' : ''}`}>
              <div className="input-wrapper">
                <input
                  type="number"
                  className="main-input"
                  value={n}
                  onChange={(e) => setN(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder="Enter number of queens (1-8)"
                  min="1"
                  max="8"
                  disabled={isRunning}
                />
                <div className="search-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Speed Control */}
            <div className="speed-control">
              <label className="speed-label">Animation Speed</label>
              <div className="speed-container">
                <span className="speed-text">Slow</span>
                <div className="slider-wrapper">
                  <input
                    type="range"
                    className="speed-slider"
                    min="0"
                    max="100"
                    value={speed}
                    onChange={(e) => setSpeed(parseInt(e.target.value))}
                    disabled={isRunning}
                  />
                  <div className="slider-track">
                    <div 
                      className="slider-progress" 
                      style={{ width: speed + '%' }}
                    />
                  </div>
                </div>
                <span className="speed-text">Fast</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="buttons">
              {!isRunning ? (
                <button 
                  className="btn btn-primary" 
                  onClick={handlePlay} 
                  disabled={!n}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Solve N-Queens
                </button>
              ) : (
                <button className="btn btn-secondary" onClick={handleStop}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="6" width="12" height="12"/>
                  </svg>
                  Stop Solving
                </button>
              )}
            </div>
          </div>

          {/* Results Info */}
          {(solutions.length > 0 || isRunning) && (
            <div className="results-info">
              <div className="results-stats">
                {isRunning ? (
                  <>Solving... Found <strong>{solutions.length}</strong> solution{solutions.length !== 1 ? 's' : ''} so far</>
                ) : (
                  <>Found <strong>{solutions.length}</strong> solution{solutions.length !== 1 ? 's' : ''} for <strong>{n}×{n}</strong> board</>
                )}
              </div>
            </div>
          )}

          {/* Chess Boards Grid */}
          <div className="boards-grid">
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
            <div className="loading">
              <div className="loading-spinner"></div>
              <div className="loading-text">Starting to solve N-Queens puzzle...</div>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <span>N-Queens Visualizer</span>
          <span>•</span>
          <span>Built with React</span>
          <span>•</span>
          <span>Backtracking Algorithm</span>
        </div>
      </footer>
    </div>
  );
}

export default App;