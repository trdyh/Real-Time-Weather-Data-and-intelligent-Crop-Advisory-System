import React from 'react';
import { motion } from 'framer-motion';
import { FaSeedling, FaLeaf, FaTree, FaSun, FaTint, FaAppleAlt, FaCarrot, FaPepperHot } from 'react-icons/fa';

const CropAnimation = ({ type }) => {
  const animations = {
    wheat: {
      icon: <FaSeedling />,
      color: '#FFD700',
      bgColor: '#FFF8DC',
      animation: {
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    rice: {
      icon: <FaTint />,
      color: '#90EE90',
      bgColor: '#F0FFF0',
      animation: {
        scale: [1, 1.2, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    maize: {
      icon: <FaTree />,
      color: '#FFA500',
      bgColor: '#FFFAF0',
      animation: {
        height: ['100%', '110%', '100%'],
        transition: {
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    cotton: {
      icon: <FaSun />,
      color: '#FFFFFF',
      bgColor: '#F8F8FF',
      animation: {
        rotate: [0, 360],
        scale: [1, 1.1, 1],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }
      }
    },
    sugarcane: {
      icon: <FaTree />,
      color: '#228B22',
      bgColor: '#F0FFF0',
      animation: {
        y: [0, -15, 0],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    vegetables: {
      icon: <FaCarrot />,
      color: '#FF6347',
      bgColor: '#FFF0F5',
      animation: {
        rotate: [0, 10, -10, 0],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    fruits: {
      icon: <FaAppleAlt />,
      color: '#FF0000',
      bgColor: '#FFF5EE',
      animation: {
        scale: [1, 1.15, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    spices: {
      icon: <FaPepperHot />,
      color: '#8B0000',
      bgColor: '#FFE4E1',
      animation: {
        y: [0, -5, 0],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    default: {
      icon: <FaSeedling />,
      color: '#4CAF50',
      bgColor: '#F5FFF5',
      animation: {
        scale: [1, 1.1, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    }
  };

  const config = animations[type] || animations.default;

  return (
    <div className="crop-animation-container" style={{ backgroundColor: config.bgColor }}>
      <motion.div
        animate={config.animation}
        style={{
          color: config.color,
          fontSize: '4rem',
          textAlign: 'center',
          padding: '2rem',
          position: 'relative'
        }}
      >
        {config.icon}
        {/* Add additional decorative elements based on crop type */}
        {type === 'wheat' && (
          <>
            <motion.div
              style={{
                position: 'absolute',
                top: '30%',
                left: '30%',
                fontSize: '2rem',
                color: '#DAA520'
              }}
              animate={{
                rotate: [0, 360],
                transition: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              •
            </motion.div>
            <motion.div
              style={{
                position: 'absolute',
                bottom: '30%',
                right: '30%',
                fontSize: '1.5rem',
                color: '#DAA520'
              }}
              animate={{
                y: [0, -10, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              •
            </motion.div>
          </>
        )}
        {type === 'rice' && (
          <motion.div
            style={{
              position: 'absolute',
              bottom: '20%',
              width: '100%',
              height: '20px',
              background: 'linear-gradient(90deg, transparent, #90EE90, transparent)',
              opacity: 0.5
            }}
            animate={{
              scaleX: [0.5, 1, 0.5],
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        )}
      </motion.div>
      <style jsx>{`
        .crop-animation-container {
          border-radius: 20px;
          overflow: hidden;
          margin: 1rem 0;
          position: relative;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .crop-animation-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
          z-index: 1;
          animation: shine 3s ease-in-out infinite;
        }
        
        @keyframes shine {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default CropAnimation;