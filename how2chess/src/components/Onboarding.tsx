import { useState, useEffect } from 'react'
import Tutorial from './Tutorial'
import { useNavigate } from 'react-router-dom'

interface OnboardingProps {
  onComplete: () => void
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const navigate = useNavigate()

  const tutorialSteps = [
    {
      title: 'Welcome to How2Chess!',
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            Learn, practice, and play chess with our interactive platform designed for players of all skill levels.
          </p>
          <div className="bg-primary-50 p-4 rounded-lg">
            <p className="text-primary-800 font-medium">
              🎯 Our mission: Make chess learning fun, interactive, and accessible to everyone!
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Learn Section',
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            The <strong>Learn</strong> section offers interactive lessons that teach you chess fundamentals step by step.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Interactive chessboards show moves in real-time</li>
            <li>Rule explanations with examples and tips</li>
            <li>Progress tracking to see how much you've learned</li>
            <li>Lessons from beginner to advanced levels</li>
          </ul>
          <div className="bg-blue-50 p-4 rounded-lg mt-4">
            <p className="text-blue-800 text-sm">
              💡 Tip: Start with "Chess Basics" if you're new to the game!
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Practice Section',
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            The <strong>Practice</strong> section contains chess puzzles to sharpen your tactical skills.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Tactical puzzles (forks, pins, skewers, etc.)</li>
            <li>Different difficulty levels</li>
            <li>Time limits to challenge yourself</li>
            <li>Track your puzzle-solving progress</li>
          </ul>
        </div>
      )
    },
    {
      title: 'Play Section',
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            The <strong>Play</strong> section lets you play full chess games.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Interactive chessboard with drag-and-drop pieces</li>
            <li>Move history to review your game</li>
            <li>Undo moves to learn from mistakes</li>
            <li>Game status indicators (check, checkmate, etc.)</li>
          </ul>
          <div className="bg-green-50 p-4 rounded-lg mt-4">
            <p className="text-green-800 text-sm">
              💡 Tip: Click on a piece to see its possible moves highlighted!
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Ready to Start?',
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            You're all set! Choose your path:
          </p>
          <div className="grid grid-cols-1 gap-3 mt-4">
            <button
              onClick={() => {
                onComplete()
                navigate('/learn')
              }}
              className="btn-primary w-full py-3 text-left px-4"
            >
              📚 Start Learning
            </button>
            <button
              onClick={() => {
                onComplete()
                navigate('/practice')
              }}
              className="btn-secondary w-full py-3 text-left px-4"
            >
              🎯 Try Puzzles
            </button>
            <button
              onClick={() => {
                onComplete()
                navigate('/play')
              }}
              className="btn-secondary w-full py-3 text-left px-4"
            >
              ♟️ Play a Game
            </button>
          </div>
        </div>
      )
    }
  ]

  const handleComplete = () => {
    onComplete()
  }

  const handleSkip = () => {
    onComplete()
  }

  return (
    <Tutorial
      steps={tutorialSteps}
      onComplete={handleComplete}
      onSkip={handleSkip}
    />
  )
}

export default Onboarding
