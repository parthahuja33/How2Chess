import { motion } from 'framer-motion'
import { BookOpen, Clock, Users, Star } from 'lucide-react'

const Learn = () => {
  const lessons = [
    {
      id: 1,
      title: 'Chess Basics',
      description: 'Learn how chess pieces move and basic rules',
      difficulty: 'Beginner',
      duration: '15 min',
      completed: true
    },
    {
      id: 2,
      title: 'Special Moves',
      description: 'Castling, en passant, and promotion',
      difficulty: 'Beginner',
      duration: '20 min',
      completed: false
    },
    {
      id: 3,
      title: 'Opening Principles',
      description: 'Control the center, develop pieces, king safety',
      difficulty: 'Intermediate',
      duration: '25 min',
      completed: false
    },
    {
      id: 4,
      title: 'Basic Tactics',
      description: 'Pins, forks, skewers, and discovered attacks',
      difficulty: 'Intermediate',
      duration: '30 min',
      completed: false
    },
    {
      id: 5,
      title: 'Endgame Fundamentals',
      description: 'Essential endgame patterns and techniques',
      difficulty: 'Advanced',
      duration: '35 min',
      completed: false
    },
    {
      id: 6,
      title: 'Strategic Planning',
      description: 'Positional understanding and long-term planning',
      difficulty: 'Advanced',
      duration: '40 min',
      completed: false
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Learn Chess</h1>
          <p className="text-xl text-gray-600">
            Master chess step by step with our interactive lessons
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card group hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="text-primary-600" size={24} />
                </div>
                {lesson.completed && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Star className="text-white" size={16} />
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{lesson.title}</h3>
              <p className="text-gray-600 mb-4">{lesson.description}</p>
              
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                  {lesson.difficulty}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock size={16} className="mr-1" />
                  {lesson.duration}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="card max-w-md mx-auto">
            <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              Join our community of chess learners and get help from experienced players.
            </p>
            <button className="btn-primary w-full">
              Join Community
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Learn
