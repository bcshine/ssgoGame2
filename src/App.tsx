import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { GameScene, BoxState, PRIZES } from './types';
import WaitingScene from './scenes/WaitingScene';
import PickingScene from './scenes/PickingScene';
import SpinningScene from './scenes/SpinningScene';
import ResultScene from './scenes/ResultScene';
import CompleteScene from './scenes/CompleteScene';

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2vh 0;
  box-sizing: border-box;
`;

const GameContainer = styled(motion.div)`
  width: 100%;
  max-width: 500px;
  height: 90vh;
  max-height: 750px;
  aspect-ratio: 3/5;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  
  @media (max-width: 768px) {
    height: 85vh;
    max-height: 700px;
    margin: 0 10px;
  }
`;

function App() {
  const [currentScene, setCurrentScene] = useState<GameScene>('waiting');
  const [prize, setPrize] = useState<typeof PRIZES[0] | null>(null);

  const handleSceneChange = (newScene: GameScene) => {
    setCurrentScene(newScene);
  };

  const handleBoxSelect = (box: BoxState) => {
    // Randomly select a prize based on probabilities
    const randomPrize = PRIZES[Math.floor(Math.random() * PRIZES.length)];
    setPrize(randomPrize);
    handleSceneChange('spinning');
  };

  const handleSpinComplete = () => {
    handleSceneChange('result');
  };

  const handleSaveCoupon = () => {
    // Here you would implement the actual coupon saving logic
    if (prize?.name === '한번 더!') {
      handleSceneChange('picking');
    } else {
      handleSceneChange('complete');
    }
  };

  return (
    <AppContainer>
      <GameContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <AnimatePresence mode="wait">
          {currentScene === 'waiting' && (
            <WaitingScene onStart={() => handleSceneChange('picking')} />
          )}
          {currentScene === 'picking' && (
            <PickingScene onBoxSelect={handleBoxSelect} />
          )}
          {currentScene === 'spinning' && (
            <SpinningScene onComplete={handleSpinComplete} />
          )}
          {currentScene === 'result' && prize && (
            <ResultScene prize={prize} onSaveCoupon={handleSaveCoupon} />
          )}
          {currentScene === 'complete' && (
            <CompleteScene onRestart={() => handleSceneChange('waiting')} />
          )}
        </AnimatePresence>
      </GameContainer>
    </AppContainer>
  );
}

export default App; 