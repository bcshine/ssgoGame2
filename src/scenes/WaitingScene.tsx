import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SceneContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 25px;
  text-align: center;
  background: white;
  color: #333;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 20px 20px;
  }
`;

const Title = styled(motion.h1)`
  font-size: 2.2rem;
  margin-bottom: 20px;
  color: #667eea;
  font-weight: bold;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: #667eea;
  font-weight: 500;
`;

const TouchText = styled(motion.div)`
  font-size: 1.4rem;
  color: white;
  cursor: pointer;
  padding: 16px 45px;
  border-radius: 25px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  box-shadow: 0 6px 12px rgba(102, 126, 234, 0.3);
  font-weight: bold;
  margin-top: 15px;
  min-width: 130px;
  text-align: center;
`;

const Logo = styled(motion.img)`
  width: 180px;
  height: auto;
  margin-bottom: 25px;
  max-width: 90%;
`;

const GameTitle = styled(motion.h1)`
  font-size: 2.2rem;
  margin-bottom: 25px;
  color: #333;
  text-align: center;
  font-weight: bold;
`;

interface WaitingSceneProps {
  onStart: () => void;
}

const WaitingScene: React.FC<WaitingSceneProps> = ({ onStart }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      // Animation logic for characters
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SceneContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <GameTitle
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        산간고 반찬가게 쿠폰 게임
      </GameTitle>
      <Logo
        src={`${process.env.PUBLIC_URL}/ssgologo.jpg`}
        alt="산간고 로고"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        onError={(e) => {
          console.log('로고 이미지 로드 실패');
          // 로고 로드 실패 시 숨김
          e.currentTarget.style.display = 'none';
        }}
      />
      <Title
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        🥗 반찬 꾸러미 뽑기 🥗
      </Title>
      <Subtitle
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        지금 뽑기하면 쿠폰이 팡팡!
      </Subtitle>
      <TouchText
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        게임시작
      </TouchText>
    </SceneContainer>
  );
};

export default WaitingScene; 