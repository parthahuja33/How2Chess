import { useState } from 'react'
import { motion } from 'framer-motion'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import { Bot, User, RotateCcw, Flag } from 'lucide-react'

const Play = () => {
  const [game, setGame] = useState(new Chess())
  const [gamePosition, setGamePosition] = useState(game.fen())
  const [moveHistory, setMoveHistory] = useState<string[]>([])
  const [gameStatus, setGameStatus] = useState<'playing' | 'checkmate' | 'draw' | 'stalemate'>('playing')

  const makeMove = (move: any) => {
    const gameCopy = new Chess(game.fen())
    const result = gameCopy.move(move)
    
    if (result) {
      setGame(gameCopy)
      setGamePosition(gameCopy.fen())
      setMoveHistory(prev => [...prev, result.san])
      
      // Check game status
      if (gameCopy.isCheckmate()) {
        setGameStatus('checkmate')
      } else if (gameCopy.isDraw() || gameCopy.isStalemate()) {
        setGameStatus(gameCopy.isStalemate() ? 'stalemate' : 'draw')
      }
      
      return true
    }
    return false
  }

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    const move = {
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // Always promote to queen for simplicity
    }
    return makeMove(move)
  }

  const resetGame = () => {
    const newGame = new Chess()
    setGame(newGame)
    setGamePosition(newGame.fen())
    setMoveHistory([])
    setGameStatus('playing')
  }

  const getStatusMessage = () => {
    switch (gameStatus) {
      case 'checkmate':
        return `Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins!`
      case 'stalemate':
        return 'Stalemate! The game is a draw.'
      case 'draw':
        return 'Draw! The game ended in a draw.'
      default:
        return game.inCheck() ? 'Check!' : `${game.turn() === 'w' ? 'White' : 'Black'} to move`
    }
  }

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
            Test your skills against the computer
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Board */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="chess-board"
            >
              <Chessboard
                position={gamePosition}
                onPieceDrop={onDrop}
                boardWidth={Math.min(600, typeof window !== 'undefined' ? window.innerWidth - 64 : 600)}
                customBoardStyle={{
                  borderRadius: '8px',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
                customLightSquareStyle={{ backgroundColor: '#f0d9b5' }}
                customDarkSquareStyle={{ backgroundColor: '#b58863' }}
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
              <h3 className="text-lg font-semibold mb-3">Game Status</h3>
              <div className={`p-3 rounded-lg text-center font-medium ${
                gameStatus === 'playing' 
                  ? game.inCheck() 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {getStatusMessage()}
              </div>
              
              <div className="mt-4 flex gap-2">
                <button
                  onClick={resetGame}
                  className="btn-secondary flex items-center justify-center flex-1"
                >
                  <RotateCcw size={16} className="mr-2" />
                  New Game
                </button>
                <button className="btn-secondary p-2">
                  <Flag size={16} />
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
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <User className="text-gray-600 mr-2" size={20} />
                    <span className="font-medium">You</span>
                  </div>
                  <span className="text-sm text-gray-500">White</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Bot className="text-gray-600 mr-2" size={20} />
                    <span className="font-medium">Computer</span>
                  </div>
                  <span className="text-sm text-gray-500">Black</span>
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
              <h3 className="text-lg font-semibold mb-3">Move History</h3>
              <div className="max-h-64 overflow-y-auto">
                {moveHistory.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {moveHistory.map((move, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded ${
                          index % 2 === 0 ? 'bg-gray-50' : 'bg-blue-50'
                        }`}
                      >
                        {Math.floor(index / 2) + 1}. {move}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No moves yet</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Play
