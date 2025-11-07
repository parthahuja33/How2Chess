import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react'

interface TutorialStep {
  title: string
  content: string | React.ReactNode
  highlight?: string
}

interface TutorialProps {
  steps: TutorialStep[]
  onComplete: () => void
  onSkip: () => void
}

const Tutorial: React.FC<TutorialProps> = ({ steps, onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 p-6">
          <button
            onClick={onSkip}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            aria-label="Skip tutorial"
          >
            <X size={24} />
          </button>
          
          <div className="mt-2">
            <h2 className="text-2xl font-bold text-white mb-2">
              {steps[currentStep].title}
            </h2>
            
            {/* Progress Bar */}
            <div className="w-full bg-white/20 rounded-full h-2 mt-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="bg-white h-2 rounded-full"
              />
            </div>
            
            <div className="text-white/80 text-sm mt-2">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-gray-700 leading-relaxed"
            >
              {typeof steps[currentStep].content === 'string' ? (
                <p className="text-lg">{steps[currentStep].content}</p>
              ) : (
                steps[currentStep].content
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep
                    ? 'bg-primary-600'
                    : index < currentStep
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextStep}
            className="btn-primary flex items-center gap-2"
          >
            {currentStep === steps.length - 1 ? (
              <>
                Complete
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
    </motion.div>
  )
}

export default Tutorial
