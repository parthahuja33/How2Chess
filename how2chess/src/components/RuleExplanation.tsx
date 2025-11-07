import { motion } from 'framer-motion'
import { BookOpen, Target, Lightbulb, AlertTriangle } from 'lucide-react'

interface RuleExplanationProps {
  rule: {
    title: string
    description: string
    examples?: string[]
    tips?: string[]
    warnings?: string[]
    icon?: 'book' | 'target' | 'lightbulb' | 'alert'
  }
}

const RuleExplanation: React.FC<RuleExplanationProps> = ({ rule }) => {
  const iconMap = {
    book: BookOpen,
    target: Target,
    lightbulb: Lightbulb,
    alert: AlertTriangle
  }

  const Icon = rule.icon ? iconMap[rule.icon] : BookOpen
  const iconColor = {
    book: 'text-blue-600',
    target: 'text-green-600',
    lightbulb: 'text-yellow-600',
    alert: 'text-orange-600'
  }[rule.icon || 'book']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-lg"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 ${iconColor}`}>
          <Icon size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{rule.title}</h3>
          <p className="text-gray-700 leading-relaxed">{rule.description}</p>
        </div>
      </div>

      {rule.examples && rule.examples.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Target size={18} className="text-green-600" />
            Examples:
          </h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {rule.examples.map((example, index) => (
              <li key={index}>{example}</li>
            ))}
          </ul>
        </div>
      )}

      {rule.tips && rule.tips.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Lightbulb size={18} className="text-yellow-600" />
            Tips:
          </h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {rule.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {rule.warnings && rule.warnings.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <AlertTriangle size={18} className="text-orange-600" />
            Important Notes:
          </h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {rule.warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  )
}

export default RuleExplanation
