import { Chess } from 'chess.js'

export interface Lesson {
  id: number
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  content: LessonContent[]
}

export interface LessonContent {
  type: 'text' | 'interactive' | 'rule'
  title: string
  description: string
  position?: string
  allowedMoves?: string[]
  highlightSquare?: string
  rule?: {
    title: string
    description: string
    examples?: string[]
    tips?: string[]
    warnings?: string[]
    icon?: 'book' | 'target' | 'lightbulb' | 'alert'
  }
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Chess Basics - The Board and Pieces',
    description: 'Learn the fundamentals: the chessboard, piece names, and starting positions',
    difficulty: 'Beginner',
    duration: '15 min',
    content: [
      {
        type: 'text',
        title: 'Welcome to Chess!',
        description: 'Chess is a two-player strategy game played on an 8x8 grid called a chessboard. Each player starts with 16 pieces: one king, one queen, two rooks, two knights, two bishops, and eight pawns.'
      },
      {
        type: 'text',
        title: 'The Chessboard',
        description: 'The chessboard consists of 64 squares arranged in 8 rows (ranks) and 8 columns (files). The squares alternate between light and dark colors. The board is positioned so that each player has a light square in their bottom-right corner.'
      },
      {
        type: 'interactive',
        title: 'Starting Position',
        description: 'Here\'s how the pieces are arranged at the beginning of a game. The white pieces start on ranks 1 and 2, while black pieces start on ranks 7 and 8.',
        position: new Chess().fen(),
        highlightSquare: null
      },
      {
        type: 'rule',
        title: 'Piece Names and Symbols',
        description: 'Each piece has a name and is represented by a symbol in notation:',
        rule: {
          title: 'Chess Pieces',
          description: 'Understanding piece names and their symbols is essential for reading and writing chess notation.',
          examples: [
            'King (♔/♚) - The most important piece',
            'Queen (♕/♛) - The most powerful piece',
            'Rook (♖/♜) - Also called a castle',
            'Bishop (♗/♝) - Moves diagonally',
            'Knight (♘/♞) - Moves in an L-shape',
            'Pawn (♙/♟) - The smallest but most numerous piece'
          ],
          tips: [
            'White pieces are uppercase letters (K, Q, R, B, N, P)',
            'Black pieces are lowercase letters (k, q, r, b, n, p)',
            'The king is always represented by K/k, never abbreviated'
          ],
          icon: 'book'
        }
      }
    ]
  },
  {
    id: 2,
    title: 'How Pieces Move - The King',
    description: 'Learn how the king moves and why it\'s the most important piece',
    difficulty: 'Beginner',
    duration: '20 min',
    content: [
      {
        type: 'rule',
        title: 'The King',
        description: 'The king is the most important piece in chess. You lose if your king is captured!',
        rule: {
          title: 'King Movement',
          description: 'The king can move one square in any direction: horizontally, vertically, or diagonally. The king can never move into check (a square where it would be attacked).',
          examples: [
            'From e4, the king can move to d3, d4, d5, e3, e5, f3, f4, or f5',
            'The king cannot move to a square that would put it in check',
            'Two kings cannot be on adjacent squares'
          ],
          warnings: [
            'Never leave your king exposed to enemy pieces',
            'Keep your king safe, especially in the opening and middlegame',
            'In the endgame, an active king is often crucial'
          ],
          icon: 'alert'
        }
      },
      {
        type: 'interactive',
        title: 'Practice Moving the King',
        description: 'Try moving the white king. Click on the king to see its possible moves highlighted in green.',
        position: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        highlightSquare: 'e1',
        allowedMoves: ['d1', 'd2', 'e2', 'f1', 'f2']
      }
    ]
  },
  {
    id: 3,
    title: 'How Pieces Move - The Queen',
    description: 'Master the queen, the most powerful piece on the board',
    difficulty: 'Beginner',
    duration: '20 min',
    content: [
      {
        type: 'rule',
        title: 'The Queen',
        description: 'The queen combines the movement of a rook and a bishop, making it the most powerful piece.',
        rule: {
          title: 'Queen Movement',
          description: 'The queen can move any number of squares horizontally, vertically, or diagonally. She cannot jump over other pieces.',
          examples: [
            'The queen can move along ranks (rows)',
            'The queen can move along files (columns)',
            'The queen can move along diagonals',
            'She cannot jump over pieces - if blocked, she must stop or capture'
          ],
          tips: [
            'Don\'t bring out the queen too early - develop other pieces first',
            'The queen is powerful but vulnerable - protect her',
            'Use the queen to control the center and attack'
          ],
          icon: 'lightbulb'
        }
      },
      {
        type: 'interactive',
        title: 'Practice Moving the Queen',
        description: 'Move the white queen and see how she can control many squares.',
        position: 'rnbqkbnr/pppppppp/8/8/4Q3/8/PPPPPPPP/RNB1KBNR w KQkq - 0 1',
        highlightSquare: 'e4'
      }
    ]
  },
  {
    id: 4,
    title: 'Special Moves - Castling',
    description: 'Learn about castling, a special move that protects your king',
    difficulty: 'Beginner',
    duration: '25 min',
    content: [
      {
        type: 'rule',
        title: 'Castling',
        description: 'Castling is a special move that allows you to move both your king and rook in one turn.',
        rule: {
          title: 'Castling Rules',
          description: 'Castling can only occur if: 1) Neither the king nor the rook has moved, 2) There are no pieces between them, 3) The king is not in check, 4) The king does not pass through or land on a square that is attacked.',
          examples: [
            'Kingside castling (O-O): King moves two squares toward the rook, rook jumps over to the adjacent square',
            'Queenside castling (O-O-O): King moves two squares toward the queenside rook',
            'Notation: O-O for kingside, O-O-O for queenside'
          ],
          tips: [
            'Castling is an excellent way to protect your king',
            'Generally, you want to castle early in the game',
            'Kingside castling is usually faster and safer'
          ],
          warnings: [
            'You cannot castle if your king or rook has already moved',
            'You cannot castle through or into check',
            'You cannot castle if there are pieces between the king and rook'
          ],
          icon: 'alert'
        }
      }
    ]
  },
  {
    id: 5,
    title: 'Basic Tactics - Forks',
    description: 'Learn about forks, one of the most common tactical patterns',
    difficulty: 'Intermediate',
    duration: '30 min',
    content: [
      {
        type: 'rule',
        title: 'Forks',
        description: 'A fork is when one piece attacks two or more enemy pieces simultaneously.',
        rule: {
          title: 'Understanding Forks',
          description: 'Forks are powerful tactical weapons. When your opponent has two valuable pieces on squares that can be attacked by one of your pieces, you can often win material.',
          examples: [
            'Knight forks are especially dangerous because knights can attack pieces that cannot attack back',
            'A pawn fork can often win a piece if the opponent cannot defend both pieces',
            'Queen forks are common and can be devastating'
          ],
          tips: [
            'Look for opportunities to create forks',
            'Be aware of your opponent\'s potential forks',
            'Knights are excellent forking pieces due to their unique movement'
          ],
          icon: 'target'
        }
      }
    ]
  },
  {
    id: 6,
    title: 'Opening Principles',
    description: 'Master the fundamental principles that guide good opening play',
    difficulty: 'Intermediate',
    duration: '25 min',
    content: [
      {
        type: 'rule',
        title: 'Opening Principles',
        description: 'Following basic opening principles will help you start games strongly.',
        rule: {
          title: 'Key Opening Principles',
          description: 'There are three main principles to follow in the opening: control the center, develop your pieces, and ensure king safety.',
          examples: [
            'Control the center: Place pawns and pieces to control the center squares (d4, d5, e4, e5)',
            'Develop pieces: Move your knights and bishops to active squares, usually toward the center',
            'Castle early: Get your king to safety by castling, usually after developing a few pieces'
          ],
          tips: [
            'Don\'t move the same piece twice in the opening unless necessary',
            'Don\'t bring out the queen too early - it can become a target',
            'Connect your rooks by moving pieces off the back rank',
            'Develop knights before bishops when possible'
          ],
          warnings: [
            'Avoid moving pawns unnecessarily - they can\'t move backward',
            'Don\'t ignore your opponent\'s threats',
            'Don\'t develop pieces to squares where they can be easily attacked'
          ],
          icon: 'lightbulb'
        }
      }
    ]
  }
]

export const getLessonById = (id: number): Lesson | undefined => {
  return lessons.find(lesson => lesson.id === id)
}
