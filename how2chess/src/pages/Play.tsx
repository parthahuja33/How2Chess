import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Chessboard } from 'react-chessboard'
import { Chess, Square, Move } from 'chess.js'
import { Bot, User, RotateCcw, Flag, Undo2, Redo2, Copy, CheckCircle2, AlertCircle, Trophy, Clock } from 'lucide-react'

const Play = () => {
  const [game, setGame] = useState(new Chess())
  const [gamePosition, setGamePosition] = useState(game.fen())
  const [moveHistory, setMoveHistory] = useState<Move[]>([])
  const [gameStatus, setGameStatus] = useState<'playing' | 'checkmate' | 'draw' | 'stalemate' | 'resignation'>('playing')
  const [optionSquares, setOptionSquares] = useState<{ [square: string]: { backgroundColor: string } }>({})
  const [moveFrom, setMoveFrom] = useState<Square | null>(null)
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [timeSpent, setTimeSpent] = useState(0)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [showGameOverModal, setShowGameOverModal] = useState(false)

  // Timer
  useEffect(() => {
    if (isGameStarted && gameStatus === 'playing') {
      const interval = setInterval(() => {
        setTimeSpent(prev => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isGameStarted, gameStatus])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getMoveOptions = (square: Square) => {
    const moves = game.moves({
      square,
      verbose: true
    })
    
    if (moves.length === 0) {
      setOptionSquares({})
      return false
    }

    const newSquares: { [square: string]: { backgroundColor: string } } = {}
    moves.forEach((move) => {
      newSquares[move.to] = {
        backgroundColor: game.get(move.to as Square) 
          ? 'rgba(255, 0, 0, 0.4)'
          : 'rgba(0, 255, 0, 0.4)'
      }
    })
    newSquares[square] = {
      backgroundColor: 'rgba(255, 255, 0, 0.4)'
    }
    
    setOptionSquares(newSquares)
    return true
  }

  const onSquareClick = (square: Square) => {
    if (gameStatus !== 'playing' || game.turn() !== 'w') return

    const clickedPiece = game.get(square)
    const isPlayerPiece = clickedPiece && clickedPiece.color === 'w'

    if (moveFrom && moveFrom !== square) {
      // Try to make a move
      makeMove({ from: moveFrom, to: square })
      setMoveFrom(null)
      setOptionSquares({})
    } else if (isPlayerPiece) {
      setMoveFrom(square)
      getMoveOptions(square)
    } else {
      setMoveFrom(null)
      setOptionSquares({})
    }
  }

  const makeMove = useCallback((move: { from: string; to: string; promotion?: string }) => {
    const gameCopy = new Chess(game.fen())
    
    try {
      const result = gameCopy.move({
        from: move.from as Square,
        to: move.to as Square,
        promotion: move.promotion || 'q'
      })

      if (result) {
        setGame(gameCopy)
        setGamePosition(gameCopy.fen())
        setMoveHistory(prev => [...prev, result])
        setHistoryIndex(prev => prev + 1)
        setIsGameStarted(true)
        
        // Check game status
        if (gameCopy.isCheckmate()) {
          setGameStatus('checkmate')
          setShowGameOverModal(true)
        } else if (gameCopy.isDraw()) {
          if (gameCopy.isStalemate()) {
            setGameStatus('stalemate')
          } else {
            setGameStatus('draw')
          }
          setShowGameOverModal(true)
        }
        
        return true
      }
    } catch (error) {
      console.error('Invalid move:', error)
    }
    
    return false
  }, [game])

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    if (gameStatus !== 'playing' || game.turn() !== 'w') return false
    
    return makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q'
    })
  }

  const resetGame = () => {
    const newGame = new Chess()
    setGame(newGame)
    setGamePosition(newGame.fen())
    setMoveHistory([])
    setGameStatus('playing')
    setHistoryIndex(-1)
    setMoveFrom(null)
    setOptionSquares({})
    setTimeSpent(0)
    setIsGameStarted(false)
    setShowGameOverModal(false)
  }

  const resign = () => {
    setGameStatus('resignation')
    setShowGameOverModal(true)
  }

  const undoMove = () => {
    if (historyIndex >= 0 && moveHistory.length > 0) {
      const newHistory = moveHistory.slice(0, historyIndex)
      const newGame = new Chess()
      
      // Replay moves up to historyIndex
      newHistory.forEach(move => {
        newGame.move(move)
      })
      
      setGame(newGame)
      setGamePosition(newGame.fen())
      setMoveHistory(newHistory)
      setHistoryIndex(historyIndex - 1)
      
      if (newHistory.length === 0) {
        setIsGameStarted(false)
        setTimeSpent(0)
      }
    }
  }

  const redoMove = () => {
    // This would require storing the full move history including undone moves
    // For simplicity, we'll disable redo for now
  }

  const copyGameNotation = () => {
    const notation = moveHistory.map((move, index) => {
      if (index % 2 === 0) {
        return `${Math.floor(index / 2) + 1}. ${move.san}`
      } else {
        return move.san
      }
    }).join(' ')
    
    navigator.clipboard.writeText(notation)
  }

  const getStatusMessage = () => {
    switch (gameStatus) {
      case 'checkmate':
        return { message: `Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins!`, color: 'bg-red-100 text-red-800' }
      case 'stalemate':
        return { message: 'Stalemate! The game is a draw.', color: 'bg-yellow-100 text-yellow-800' }
      case 'draw':
        return { message: 'Draw! The game ended in a draw.', color: 'bg-gray-100 text-gray-800' }
      case 'resignation':
        return { message: 'You resigned. Black wins!', color: 'bg-gray-100 text-gray-800' }
      default:
        if (game.inCheck()) {
          return { message: `Check! ${game.turn() === 'w' ? 'White' : 'Black'} is in check.`, color: 'bg-orange-100 text-orange-800' }
        }
        return { message: `${game.turn() === 'w' ? 'White' : 'Black'} to move`, color: 'bg-blue-100 text-blue-800' }
    }
  }

  const statusInfo = getStatusMessage()

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">Play Chess</h1>
          <p className="text-xl text-gray-600">
            Test your skills in a game of chess
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Board */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <Chessboard
                position={gamePosition}
                onPieceDrop={onDrop}
                onSquareClick={onSquareClick}
                boardWidth={Math.min(600, window.innerWidth - 64)}
                customSquareStyles={optionSquares}
                customBoardStyle={{
                  borderRadius: '12px',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
                customLightSquareStyle={{ backgroundColor: '#f0d9b5' }}
                customDarkSquareStyle={{ backgroundColor: '#b58863' }}
                customDropSquareStyle={{
                  boxShadow: 'inset 0 0 1px 6px rgba(255, 255, 0, 0.6)'
                }}
              />
            </motion.div>
          </div>

          {/* Game Info Panel */}
          <div className="space-y-6">
            {/* Game Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="card"
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <AlertCircle size={20} className="text-primary-600" />
                Game Status
              </h3>
              <div className={`p-4 rounded-lg text-center font-medium ${statusInfo.color} mb-4`}>
                {statusInfo.message}
              </div>
              
              {/* Timer */}
              {isGameStarted && (
                <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                  <Clock size={18} />
                  <span className="font-mono text-lg">{formatTime(timeSpent)}</span>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={resetGame}
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <RotateCcw size={16} />
                  New Game
                </button>
                <button
                  onClick={resign}
                  disabled={gameStatus !== 'playing'}
                  className={`flex items-center justify-center gap-2 rounded-lg font-medium py-2 px-4 transition-colors ${
                    gameStatus !== 'playing'
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-red-100 hover:bg-red-200 text-red-700'
                  }`}
                >
                  <Flag size={16} />
                  Resign
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                  onClick={undoMove}
                  disabled={historyIndex < 0}
                  className={`flex items-center justify-center gap-2 rounded-lg font-medium py-2 px-4 transition-colors ${
                    historyIndex < 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  <Undo2 size={16} />
                  Undo
                </button>
                <button
                  onClick={copyGameNotation}
                  className="flex items-center justify-center gap-2 rounded-lg font-medium py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
                >
                  <Copy size={16} />
                  Copy PGN
                </button>
              </div>
            </motion.div>

            {/* Players */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card"
            >
              <h3 className="text-lg font-semibold mb-3">Players</h3>
              <div className="space-y-3">
                <div className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                  game.turn() === 'w' && gameStatus === 'playing'
                    ? 'bg-primary-50 border-2 border-primary-300'
                    : 'bg-gray-50'
                }`}>
                  <div className="flex items-center">
                    <User className="text-gray-600 mr-2" size={20} />
                    <span className="font-medium">You</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">White</span>
                    {game.turn() === 'w' && gameStatus === 'playing' && (
                      <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" />
                    )}
                  </div>
                </div>
                <div className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                  game.turn() === 'b' && gameStatus === 'playing'
                    ? 'bg-primary-50 border-2 border-primary-300'
                    : 'bg-gray-50'
                }`}>
                  <div className="flex items-center">
                    <Bot className="text-gray-600 mr-2" size={20} />
                    <span className="font-medium">Computer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Black</span>
                    {game.turn() === 'b' && gameStatus === 'playing' && (
                      <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Move History */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="card"
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Trophy size={20} className="text-primary-600" />
                Move History
              </h3>
              <div className="max-h-64 overflow-y-auto">
                {moveHistory.length > 0 ? (
                  <div className="space-y-2">
                    {Array.from({ length: Math.ceil(moveHistory.length / 2) }, (_, i) => {
                      const whiteMove = moveHistory[i * 2]
                      const blackMove = moveHistory[i * 2 + 1]
                      return (
                        <div
                          key={i}
                          className={`p-2 rounded-lg text-sm flex items-center gap-2 ${
                            historyIndex === i * 2 || historyIndex === i * 2 + 1
                              ? 'bg-primary-100 border border-primary-300'
                              : 'bg-gray-50'
                          }`}
                        >
                          <span className="font-semibold text-gray-500 w-6">{i + 1}.</span>
                          <span className={`flex-1 ${whiteMove ? 'font-mono' : 'text-gray-400'}`}>
                            {whiteMove?.san || '...'}
                          </span>
                          <span className={`font-mono ${blackMove ? '' : 'text-gray-400'}`}>
                            {blackMove?.san || ''}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No moves yet. Make your first move!</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Game Over Modal */}
      <AnimatePresence>
        {showGameOverModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowGameOverModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
            >
              <Trophy size={64} className="mx-auto mb-4 text-yellow-500" />
              <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
              <p className="text-xl text-gray-600 mb-6">{statusInfo.message}</p>
              <div className="flex gap-4 justify-center">
                <button onClick={resetGame} className="btn-primary">
                  New Game
                </button>
                <button
                  onClick={() => setShowGameOverModal(false)}
                  className="btn-secondary"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Play