import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BookOpen, Target, Play, Users, Trophy, Star, Sparkles, ArrowRight } from 'lucide-react'
import Onboarding from '../components/Onboarding'

const Home = () => {
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding')
    if (!hasCompletedOnboarding) {
      // Show onboarding after a short delay
      const timer = setTimeout(() => {
        setShowOnboarding(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    localStorage.setItem('hasCompletedOnboarding', 'true')
  }

  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Lessons',
      description: 'Learn chess fundamentals with step-by-step interactive tutorials. Move pieces, see examples, and understand rules visually.',
      link: '/learn',
      color: 'from-blue-500 to-cyan-500',
      highlight: 'Start Here'
    },
    {
      icon: Target,
      title: 'Practice Puzzles',
      description: 'Sharpen your tactical skills with thousands of chess puzzles. Learn patterns, improve calculation, and track your progress.',
      link: '/practice',
      color: 'from-green-500 to-emerald-500',
      highlight: 'Improve Skills'
    },
    {
      icon: Play,
      title: 'Play Games',
      description: 'Test your skills in full chess games. Practice openings, middlegames, and endgames with move history and analysis.',
      link: '/play',
      color: 'from-purple-500 to-pink-500',
      highlight: 'Play Now'
    }
  ]

  const stats = [
    { icon: Users, label: 'Active Learners', value: '10,000+', color: 'text-blue-600' },
    { icon: Trophy, label: 'Puzzles Solved', value: '500,000+', color: 'text-yellow-600' },
    { icon: Star, label: 'User Rating', value: '4.9/5', color: 'text-green-600' }
  ]

  return (
    <div className="min-h-screen">
      {showOnboarding && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}

      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles size={16} />
              Interactive Chess Learning Platform
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Master <span className="gradient-text">Chess</span>
              <br />
              From Beginner to Pro
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Learn chess fundamentals, practice with interactive puzzles, and play against AI opponents. 
              Start your journey to becoming a chess master today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/learn"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center gap-2 group"
              >
                <BookOpen className="group-hover:rotate-12 transition-transform" size={20} />
                Start Learning
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                to="/practice"
                className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center gap-2"
              >
                <Target size={20} />
                Try Puzzles
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Learn Chess</h2>
            <p className="text-xl text-gray-600">Choose your learning path and start improving today</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Link to={feature.link} className="block h-full">
                    <div className="card group-hover:shadow-xl transition-all duration-300 h-full flex flex-col group-hover:-translate-y-1">
                      <div className="relative">
                        <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <Icon className="text-white" size={28} />
                        </div>
                        <span className="absolute top-0 right-0 bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                          {feature.highlight}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-gray-600 flex-1">{feature.description}</p>
                      <div className="mt-4 flex items-center text-primary-600 font-medium group-hover:gap-2 transition-all">
                        Learn more
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Join Our Growing Community</h2>
            <p className="text-gray-600">Thousands of players are improving their chess skills every day</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Icon className={stat.color} size={32} />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Chess Journey?</h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of players learning and improving their chess skills every day.
            </p>
            <Link
              to="/learn"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold text-lg px-8 py-4 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              Get Started Now
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home