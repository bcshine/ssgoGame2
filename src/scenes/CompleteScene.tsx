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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-sizing: border-box;
`;

const Message = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 25px;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: bold;
`;

const SubMessage = styled(motion.p)`
  font-size: 1.4rem;
  color: #e0e0e0;
  margin-bottom: 30px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const RestartButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  padding: 16px 35px;
  border-radius: 25px;
  font-size: 1.3rem;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 8px 16px rgba(255, 107, 107, 0.3);
`;

interface CompleteSceneProps {
  onRestart: () => void;
}

const CompleteScene: React.FC<CompleteSceneProps> = ({ onRestart }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onRestart();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onRestart]);

  return (
    <SceneContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Message
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        산간고 쿠폰!
      </Message>
      <SubMessage
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        다음에 또 참여해주세요 😊
      </SubMessage>
      <RestartButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRestart}
      >
        처음으로 돌아가기
      </RestartButton>
    </SceneContainer>
  );
};

export default CompleteScene; 