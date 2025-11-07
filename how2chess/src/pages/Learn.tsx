import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Clock, Users, Star, X, ChevronLeft, ChevronRight, Info, Lightbulb, ArrowRight, CheckCircle2 } from 'lucide-react'
import { lessons, Lesson, LessonContent, getLessonById } from '../data/lessons'
import InteractiveChessboard from '../components/InteractiveChessboard'
import RuleExplanation from '../components/RuleExplanation'
import Modal from '../components/Modal'
import { Chess } from 'chess.js'

const Learn = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [currentContentIndex, setCurrentContentIndex] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set([1]))
  const [showRuleModal, setShowRuleModal] = useState(false)
  const [currentRule, setCurrentRule] = useState<any>(null)

  const startLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson)
    setCurrentContentIndex(0)
  }

  const closeLesson = () => {
    setSelectedLesson(null)
    setCurrentContentIndex(0)
  }

  const nextContent = () => {
    if (selectedLesson && currentContentIndex < selectedLesson.content.length - 1) {
      setCurrentContentIndex(currentContentIndex + 1)
    } else if (selectedLesson) {
      // Lesson completed
      setCompletedLessons(prev => new Set([...prev, selectedLesson.id]))
      closeLesson()
    }
  }

  const prevContent = () => {
    if (currentContentIndex > 0) {
      setCurrentContentIndex(currentContentIndex - 1)
    }
  }

  const handleMove = (move: any) => {
    // For interactive lessons, move to next step after a valid move
    setTimeout(() => {
      nextContent()
    }, 1000)
    return true
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const currentContent: LessonContent | null = selectedLesson 
    ? selectedLesson.content[currentContentIndex] 
    : null

  const progress = selectedLesson 
    ? ((currentContentIndex + 1) / selectedLesson.content.length) * 100 
    : 0

  if (selectedLesson && currentContent) {
    return (
      <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Lesson Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <button
              onClick={closeLesson}
              className="flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-4 transition-colors"
            >
              <ChevronLeft size={20} />
              Back to Lessons
            </button>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{selectedLesson.title}</h1>
                <p className="text-gray-600">{selectedLesson.description}</p>
              </div>
              <button
                onClick={closeLesson}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close lesson"
              >
                <X size={24} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="bg-primary-600 h-3 rounded-full transition-all duration-300"
              />
            </div>
            <div className="text-sm text-gray-500 mb-6">
              Step {currentContentIndex + 1} of {selectedLesson.content.length}
            </div>
          </motion.div>

          {/* Lesson Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Content */}
            <motion.div
              key={currentContentIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="card">
                <div className="flex items-start gap-3 mb-4">
                  {currentContent.type === 'interactive' && (
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 text-2xl">♟</span>
                    </div>
                  )}
                  {currentContent.type === 'rule' && (
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Info className="text-blue-600" size={24} />
                    </div>
                  )}
                  {currentContent.type === 'text' && (
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="text-purple-600" size={24} />
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{currentContent.title}</h2>
                    <p className="text-gray-700 leading-relaxed">{currentContent.description}</p>
                  </div>
                </div>

                {currentContent.type === 'rule' && currentContent.rule && (
                  <div className="mt-6">
                    <button
                      onClick={() => {
                        setCurrentRule(currentContent.rule)
                        setShowRuleModal(true)
                      }}
                      className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                      <Info size={18} />
                      View Detailed Rule Explanation
                    </button>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={prevContent}
                  disabled={currentContentIndex === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentContentIndex === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  <ChevronLeft size={20} />
                  Previous
                </button>

                <button
                  onClick={nextContent}
                  className="btn-primary flex items-center gap-2"
                >
                  {currentContentIndex === selectedLesson.content.length - 1 ? (
                    <>
                      Complete Lesson
                      <CheckCircle2 size={20} />
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight size={20} />
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Right Column - Chessboard */}
            <div className="flex items-center justify-center">
              {(currentContent.type === 'interactive' || currentContent.type === 'rule') && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full"
                >
                  <InteractiveChessboard
                    position={currentContent.position || new Chess().fen()}
                    onMove={handleMove}
                    interactive={currentContent.type === 'interactive'}
                    showHints={true}
                    currentRule={currentContent.type === 'rule' ? currentContent.rule?.title : null}
                    allowedMoves={currentContent.allowedMoves}
                    highlightSquare={currentContent.highlightSquare}
                    orientation="white"
                  />
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Rule Modal */}
        <Modal
          isOpen={showRuleModal}
          onClose={() => setShowRuleModal(false)}
          title={currentRule?.title || 'Rule Explanation'}
          size="lg"
        >
          {currentRule && <RuleExplanation rule={currentRule} />}
        </Modal>
      </div>
    )
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
              className="card group hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => startLesson(lesson)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="text-primary-600" size={24} />
                </div>
                {completedLessons.has(lesson.id) && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-white" size={16} />
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{lesson.title}</h3>
              <p className="text-gray-600 mb-4">{lesson.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                  {lesson.difficulty}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock size={16} className="mr-1" />
                  {lesson.duration}
                </div>
              </div>

              <button className="w-full btn-primary flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                Start Lesson
                <ArrowRight size={18} />
              </button>
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