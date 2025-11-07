import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Trophy } from 'lucide-react'

interface ProgressTrackerProps {
  current: number
  total: number
  completed: number[]
  onStepClick?: (step: number) => void
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  current,
  total,
  completed,
  onStepClick
}) => {
  const progress = (current / total) * 100

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-primary-600">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-gradient-to-r from-primary-600 to-primary-800 h-3 rounded-full"
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between">
        {Array.from({ length: total }, (_, index) => {
          const step = index + 1
          const isCompleted = completed.includes(step)
          const isCurrent = step === current

          return (
            <button
              key={step}
              onClick={() => onStepClick && onStepClick(step)}
              className={`flex flex-col items-center gap-2 transition-all ${
                onStepClick ? 'cursor-pointer hover:scale-110' : 'cursor-default'
              }`}
              aria-label={`Step ${step}${isCompleted ? ' completed' : ''}${isCurrent ? ' current' : ''}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  isCompleted
                    ? 'bg-green-500 border-green-600'
                    : isCurrent
                    ? 'bg-primary-600 border-primary-700 scale-110'
                    : 'bg-gray-200 border-gray-300'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="text-white" size={20} />
                ) : (
                  <span
                    className={`font-semibold ${
                      isCurrent ? 'text-white' : 'text-gray-500'
                    }`}
                  >
                    {step}
                  </span>
                )}
              </div>
              {isCurrent && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 bg-primary-600 rounded-full"
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Completion Badge */}
      {completed.length === total && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg"
        >
          <Trophy size={20} />
          <span className="font-semibold">All Steps Completed!</span>
        </motion.div>
      )}
    </div>
  )
}

export default ProgressTracker
