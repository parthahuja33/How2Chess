import { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, Clock, Star, Trophy, ChevronRight } from 'lucide-react'

const Practice = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  
  const puzzles = [
    {
      id: 1,
      title: 'Mate in 2',
      difficulty: 'Beginner',
      rating: 1200,
      theme: 'Checkmate',
      timeLimit: '5 min',
      solved: true
    },
    {
      id: 2,
      title: 'Fork Tactics',
      difficulty: 'Beginner',
      rating: 1300,
      theme: 'Fork',
      timeLimit: '3 min',
      solved: false
    },
    {
      id: 3,
      title: 'Pin the Piece',
      difficulty: 'Intermediate',
      rating: 1500,
      theme: 'Pin',
      timeLimit: '4 min',
      solved: false
    },
    {
      id: 4,
      title: 'Skewer Attack',
      difficulty: 'Intermediate',
      rating: 1600,
      theme: 'Skewer',
      timeLimit: '6 min',
      solved: false
    },
    {
      id: 5,
      title: 'Discovered Check',
      difficulty: 'Advanced',
      rating: 1800,
      theme: 'Discovery',
      timeLimit: '8 min',
      solved: false
    },
    {
      id: 6,
      title: 'Deflection',
      difficulty: 'Advanced',
      rating: 1900,
      theme: 'Deflection',
      timeLimit: '10 min',
      solved: false
    }
  ]

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredPuzzles = selectedDifficulty === 'All' 
    ? puzzles 
    : puzzles.filter(puzzle => puzzle.difficulty === selectedDifficulty)

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Practice Puzzles</h1>
          <p className="text-xl text-gray-600">
            Improve your tactical skills with chess puzzles
          </p>
        </motion.div>

        {/* Difficulty Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="flex bg-gray-100 rounded-lg p-1">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                  selectedDifficulty === difficulty
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Puzzles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPuzzles.map((puzzle, index) => (
            <motion.div
              key={puzzle.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card group hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Target className="text-primary-600" size={24} />
                </div>
                {puzzle.solved && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Star className="text-white" size={16} />
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{puzzle.title}</h3>
              <p className="text-gray-600 mb-4">Theme: {puzzle.theme}</p>
              
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(puzzle.difficulty)}`}>
                  {puzzle.difficulty}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock size={16} className="mr-1" />
                  {puzzle.timeLimit}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500 text-sm">
                  <Trophy size={16} className="mr-1" />
                  {puzzle.rating}
                </div>
                <ChevronRight className="text-gray-400 group-hover:text-primary-600 transition-colors duration-200" size={20} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="card text-center">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">1,247</div>
            <div className="text-gray-600">Puzzles Solved</div>
          </div>
          <div className="card text-center">
            <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">89%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div className="card text-center">
            <Star className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">1,456</div>
            <div className="text-gray-600">Current Rating</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Practice
