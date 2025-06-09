import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BoxState } from '../types';

const SceneContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 30px;
  background: white;
  box-sizing: border-box;
`;

const Title = styled(motion.h2)`
  font-size: 2rem;
  margin-bottom: 35px;
  color: #333;
  text-align: center;
  font-weight: bold;
`;

const BoxesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 15px;
  max-width: 400px;
  width: 100%;
`;

const Box = styled(motion.div)<{ isSelected: boolean }>`
  aspect-ratio: 1;
  background: ${props => props.isSelected 
    ? 'linear-gradient(45deg, #ffd89b 0%, #19547b 100%)' 
    : 'linear-gradient(45deg, #fff 0%, #f8f9fa 100%)'};
  border: 4px solid ${props => props.isSelected ? '#19547b' : '#e9ecef'};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: ${props => props.isSelected 
    ? '0 12px 24px rgba(25, 84, 123, 0.4)' 
    : '0 8px 16px rgba(0, 0, 0, 0.1)'};
  position: relative;
  overflow: hidden;
  padding: 15px;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
    border-radius: 22px;
    z-index: -1;
    opacity: ${props => props.isSelected ? 1 : 0};
    transition: opacity 0.3s ease;
  }
`;

const BoxImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`;

const BoxNumber = styled.div<{ isSelected: boolean }>`
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.isSelected ? '#fff' : '#495057'};
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 8px;
  border-radius: 12px;
  min-width: 24px;
  text-align: center;
`;

interface PickingSceneProps {
  onBoxSelect: (box: BoxState) => void;
}

const PickingScene: React.FC<PickingSceneProps> = ({ onBoxSelect }) => {
  const [boxes, setBoxes] = useState<BoxState[]>(
    Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      isSelected: false,
    }))
  );

  const handleBoxClick = (box: BoxState) => {
    if (boxes.some(b => b.isSelected)) return;
    
    setBoxes(boxes.map(b => ({
      ...b,
      isSelected: b.id === box.id,
    })));
    
    onBoxSelect(box);
  };

  return (
    <SceneContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Title
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        마음에 드는 반찬을<br/>골라주세요!
      </Title>
      <BoxesContainer>
        {boxes.map((box) => (
          <Box
            key={box.id}
            isSelected={box.isSelected}
            onClick={() => handleBoxClick(box)}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            animate={box.isSelected ? {
              rotate: [0, 360],
              scale: [1, 1.15, 1],
            } : {}}
            transition={{
              duration: 1,
              repeat: box.isSelected ? Infinity : 0,
            }}
          >
            <BoxImage 
              src={`/images/q${box.id}.png`} 
              alt={`반찬 상자 ${box.id}`}
              onError={(e) => {
                // 이미지 로드 실패 시 기본 이미지로 대체
                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZjhmOWZhIi8+CjxwYXRoIGQ9Im0zMCA0MCA0MCAyMCAwLTQwLTQwLTIweiIgZmlsbD0iI2RlZTJlNiIvPgo8cGF0aCBkPSJNNTAgMzBWNzBNMzAgNTBINzAiIHN0cm9rZT0iI2FkYjViZCIgc3Ryb2tlLXdpZHRoPSIyIi8+CjwvdXJnPg==';
              }}
            />
            <BoxNumber isSelected={box.isSelected}>{box.id}</BoxNumber>
          </Box>
        ))}
      </BoxesContainer>
    </SceneContainer>
  );
};

export default PickingScene; 