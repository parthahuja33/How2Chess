import { useState, useEffect } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess, Square } from 'chess.js'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, Lightbulb, X, AlertCircle } from 'lucide-react'

interface InteractiveChessboardProps {
  position?: string
  onMove?: (move: any) => boolean
  interactive?: boolean
  showHints?: boolean
  currentRule?: string | null
  allowedMoves?: string[]
  highlightSquare?: string | null
  boardWidth?: number
  orientation?: 'white' | 'black'
}

const InteractiveChessboard: React.FC<InteractiveChessboardProps> = ({
  position,
  onMove,
  interactive = true,
  showHints = false,
  currentRule = null,
  allowedMoves = [],
  highlightSquare = null,
  boardWidth,
  orientation = 'white'
}) => {
  const [game, setGame] = useState(new Chess(position || 'start'))
  const [gamePosition, setGamePosition] = useState(game.fen())
  const [optionSquares, setOptionSquares] = useState<{ [square: string]: { backgroundColor: string } }>({})
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipMessage, setTooltipMessage] = useState('')
  const [invalidMove, setInvalidMove] = useState(false)

  useEffect(() => {
    if (position) {
      const newGame = new Chess(position)
      setGame(newGame)
      setGamePosition(newGame.fen())
    }
  }, [position])

  useEffect(() => {
    if (highlightSquare) {
      setOptionSquares({
        [highlightSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
      })
    } else if (showHints && allowedMoves.length > 0) {
      const hints: { [square: string]: { backgroundColor: string } } = {}
      allowedMoves.forEach(move => {
        hints[move] = { backgroundColor: 'rgba(34, 211, 238, 0.3)' }
      })
      setOptionSquares(hints)
    } else {
      setOptionSquares({})
    }
  }, [highlightSquare, showHints, allowedMoves])

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
          ? 'rgba(255, 0, 0, 0.4)' // Capturing moves in red
          : 'rgba(0, 255, 0, 0.4)' // Normal moves in green
      }
    })
    newSquares[square] = {
      backgroundColor: 'rgba(255, 255, 0, 0.4)' // Selected piece in yellow
    }
    
    setOptionSquares(newSquares)
    return true
  }

  const onSquareClick = (square: Square) => {
    if (!interactive) return

    const clickedPiece = game.get(square)
    const isPlayerPiece = clickedPiece && clickedPiece.color === game.turn()

    if (isPlayerPiece) {
      getMoveOptions(square)
    } else {
      // Try to make a move if a square is already selected
      const sourceSquare = Object.keys(optionSquares).find(
        sq => optionSquares[sq].backgroundColor === 'rgba(255, 255, 0, 0.4)'
      )
      if (sourceSquare) {
        makeMove({ from: sourceSquare, to: square })
      }
    }
  }

  const makeMove = (move: { from: string; to: string; promotion?: string }) => {
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
        setOptionSquares({})
        setInvalidMove(false)
        
        if (onMove) {
          onMove(result)
        }
        return true
      }
    } catch (error) {
      setInvalidMove(true)
      setTooltipMessage('Invalid move! Please try again.')
      setShowTooltip(true)
      setTimeout(() => {
        setShowTooltip(false)
        setInvalidMove(false)
      }, 2000)
    }
    
    setOptionSquares({})
    return false
  }

  const onPieceDrop = (sourceSquare: string, targetSquare: string) => {
    if (!interactive) return false
    
    return makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q'
    })
  }

  const calculateBoardWidth = () => {
    if (boardWidth) return boardWidth
    if (typeof window === 'undefined') return 600
    const windowWidth = window.innerWidth
    if (windowWidth < 640) return Math.min(350, windowWidth - 32)
    if (windowWidth < 1024) return Math.min(500, windowWidth - 64)
    return 600
  }

  return (
    <div className="relative w-full">
      <div className="relative inline-block">
        <Chessboard
          position={gamePosition}
          onPieceDrop={onPieceDrop}
          onSquareClick={onSquareClick}
          boardWidth={calculateBoardWidth()}
          boardOrientation={orientation}
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
        
        {/* Hint Badge */}
        {showHints && currentRule && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 right-4 bg-primary-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-10"
          >
            <Lightbulb size={18} />
            <span className="text-sm font-medium">{currentRule}</span>
          </motion.div>
        )}

        {/* Invalid Move Tooltip */}
        <AnimatePresence>
          {showTooltip && invalidMove && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2 z-20"
            >
              <AlertCircle size={20} />
              <span className="font-medium">{tooltipMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default InteractiveChessboard
