import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SceneContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 30px;
  text-align: center;
  background: radial-gradient(circle at center, #667eea 0%, #764ba2 50%, #2c1810 100%);
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const SpinningContainer = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
`;

const SpinningBox = styled(motion.div)`
  font-size: 6rem;
  z-index: 2;
  filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
`;

const SpinningRing = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 200px;
  border: 4px solid transparent;
  border-top: 4px solid #ffd700;
  border-right: 4px solid #ff6b6b;
  border-bottom: 4px solid #4ecdc4;
  border-left: 4px solid #45b7d1;
  border-radius: 50%;
`;

const SpinningRing2 = styled(motion.div)`
  position: absolute;
  width: 150px;
  height: 150px;
  border: 3px solid transparent;
  border-top: 3px solid #ff6b6b;
  border-right: 3px solid #4ecdc4;
  border-bottom: 3px solid #45b7d1;
  border-left: 3px solid #ffd700;
  border-radius: 50%;
`;

const Particles = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  
  &::before, &::after {
    content: '✨';
    position: absolute;
    font-size: 2rem;
    animation: sparkle 3s infinite ease-in-out;
  }
  
  &::before {
    top: 20%;
    left: 20%;
    animation-delay: 0s;
  }
  
  &::after {
    top: 70%;
    right: 20%;
    animation-delay: 1.5s;
  }
  
  @keyframes sparkle {
    0%, 100% { opacity: 0; transform: scale(0); }
    50% { opacity: 1; transform: scale(1); }
  }
`;

const Title = styled(motion.h2)`
  font-size: 2.8rem;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 40px;
  font-weight: bold;
`;

const LoadingText = styled(motion.p)`
  font-size: 1.4rem;
  color: #e0e0e0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  margin-top: 40px;
`;

const Fireworks = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
`;

const Firework = styled(motion.div)<{ delay: number }>`
  position: absolute;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, #ffd700, #ff6b6b);
  border-radius: 50%;
  animation: firework-${props => props.delay} 2s infinite;
  
  @keyframes firework-${props => props.delay} {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    50% {
      transform: scale(3);
      opacity: 0.8;
    }
    100% {
      transform: scale(6);
      opacity: 0;
    }
  }
`;

const Confetti = styled(motion.div)`
  position: absolute;
  width: 8px;
  height: 8px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #ffd700, #45b7d1);
  animation: confetti-fall 3s linear infinite;
  
  @keyframes confetti-fall {
    0% {
      transform: translateY(-100vh) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
`;

const MagicSparkles = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  
  &::before, &::after {
    content: '✨';
    position: absolute;
    font-size: 3rem;
    animation: magic-sparkle 2s infinite ease-in-out;
    z-index: 5;
  }
  
  &::before {
    top: 10%;
    left: 15%;
    animation-delay: 0s;
    color: #ffd700;
  }
  
  &::after {
    bottom: 15%;
    right: 15%;
    animation-delay: 1s;
    color: #ff6b6b;
  }
  
  @keyframes magic-sparkle {
    0%, 100% { 
      opacity: 0; 
      transform: scale(0) rotate(0deg); 
    }
    50% { 
      opacity: 1; 
      transform: scale(1.5) rotate(180deg); 
    }
  }
`;

const FloatingHearts = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  
  &::before, &::after {
    content: '💖';
    position: absolute;
    font-size: 2.5rem;
    animation: float-hearts 4s infinite ease-in-out;
  }
  
  &::before {
    top: 25%;
    right: 10%;
    animation-delay: 0.5s;
  }
  
  &::after {
    bottom: 30%;
    left: 10%;
    animation-delay: 2s;
  }
  
  @keyframes float-hearts {
    0%, 100% { 
      opacity: 0; 
      transform: translateY(0) scale(0);
    }
    25% {
      opacity: 1;
      transform: translateY(-20px) scale(1);
    }
    75% {
      opacity: 1;
      transform: translateY(-40px) scale(1.2);
    }
    100% {
      opacity: 0;
      transform: translateY(-60px) scale(0);
    }
  }
`;

interface SpinningSceneProps {
  onComplete: () => void;
}

const SpinningScene: React.FC<SpinningSceneProps> = ({ onComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <SceneContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 기존 파티클 효과 */}
      <Particles />
      
      {/* 새로운 화려한 효과들 */}
      <MagicSparkles />
      <FloatingHearts />
      
      {/* 폭죽 효과 */}
      <Fireworks>
        {[...Array(12)].map((_, i) => (
          <Firework
            key={i}
            delay={i}
            style={{
              top: `${Math.random() * 60 + 10}%`,
              left: `${Math.random() * 60 + 20}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </Fireworks>
      
      {/* 색종이 효과 */}
      {[...Array(20)].map((_, i) => (
        <Confetti
          key={i}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
      
      <Title
        animate={{
          scale: [1, 1.1, 1],
          textShadow: [
            '2px 2px 4px rgba(0, 0, 0, 0.5)',
            '2px 2px 20px rgba(255, 215, 0, 0.8)',
            '2px 2px 4px rgba(0, 0, 0, 0.5)'
          ],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        🎉 추첨중 🎉
      </Title>
      
      <SpinningContainer>
        <SpinningRing
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <SpinningRing2
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <SpinningBox
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            filter: [
              'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))',
              'drop-shadow(0 0 40px rgba(255, 107, 107, 0.8))',
              'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))'
            ],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🎁
        </SpinningBox>
      </SpinningContainer>
      
      <LoadingText
        animate={{
          opacity: [0.7, 1, 0.7],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
        }}
      >
        잠시만 기다려주세요...
      </LoadingText>
    </SceneContainer>
  );
};

export default SpinningScene; 