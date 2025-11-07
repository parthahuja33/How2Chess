import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BookOpen, Target, Play, Users, Trophy, Star } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Lessons',
      description: 'Learn chess fundamentals with step-by-step interactive tutorials.',
      link: '/learn',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: 'Practice Puzzles',
      description: 'Sharpen your tactical skills with thousands of chess puzzles.',
      link: '/practice',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Play,
      title: 'Play Games',
      description: 'Test your skills against AI opponents of varying difficulty.',
      link: '/play',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const stats = [
    { icon: Users, label: 'Active Learners', value: '10,000+' },
    { icon: Trophy, label: 'Puzzles Solved', value: '500,000+' },
    { icon: Star, label: 'User Rating', value: '4.9/5' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Master <span className="gradient-text">Chess</span>
              <br />
              From Beginner to Pro
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Learn chess fundamentals, practice with interactive puzzles, and play against AI opponents. 
              Start your journey to becoming a chess master today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/learn"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center"
              >
                <BookOpen className="mr-2" size={20} />
                Start Learning
              </Link>
              <Link
                to="/practice"
                className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center"
              >
                <Target className="mr-2" size={20} />
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
                  <Link to={feature.link} className="block">
                    <div className="card group-hover:shadow-xl transition-shadow duration-300">
                      <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Join Our Growing Community</h2>
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
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-primary-600" size={28} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
