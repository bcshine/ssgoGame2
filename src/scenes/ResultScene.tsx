import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Prize } from '../types';

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
  position: relative;
  overflow: hidden;
`;

const CelebrationFireworks = styled(motion.div)`
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
  width: 8px;
  height: 8px;
  background: radial-gradient(circle, #ffd700, #ff6b6b);
  border-radius: 50%;
  animation: celebrationFirework-${props => props.delay} 2s ease-out;
  
  @keyframes celebrationFirework-${props => props.delay} {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    40% {
      transform: scale(4);
      opacity: 1;
    }
    80% {
      transform: scale(8);
      opacity: 0.7;
    }
    100% {
      transform: scale(12);
      opacity: 0;
    }
  }
`;

const FallingConfetti = styled(motion.div)`
  position: absolute;
  width: 10px;
  height: 10px;
  background: linear-gradient(45deg, #ffd700, #ff6b6b, #4ecdc4, #45b7d1);
  animation: confetti-celebration 2s linear;
  
  @keyframes confetti-celebration {
    0% {
      transform: translateY(-100vh) rotate(0deg) scale(1);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(1080deg) scale(0.5);
      opacity: 0;
    }
  }
`;

const FloatingStars = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  
  &::before, &::after {
    content: '⭐';
    position: absolute;
    font-size: 2.5rem;
    animation: floating-stars 2s ease-in-out;
    z-index: 5;
  }
  
  &::before {
    top: 15%;
    left: 10%;
    animation-delay: 0s;
  }
  
  &::after {
    bottom: 20%;
    right: 10%;
    animation-delay: 0.5s;
  }
  
  @keyframes floating-stars {
    0%, 100% { 
      opacity: 0; 
      transform: translateY(0) scale(0) rotate(0deg);
    }
    50% { 
      opacity: 1; 
      transform: translateY(-30px) scale(1.3) rotate(180deg);
    }
  }
`;

const Congratulations = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: bold;
`;

const CouponCard = styled(motion.div)`
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
  padding: 0;
  border-radius: 25px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  margin: 20px 0;
  max-width: 90%;
  border: 3px solid #ffd700;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    background: linear-gradient(45deg, #ffd700, #ff6b6b, #4ecdc4, #45b7d1, #ffd700);
    border-radius: 28px;
    z-index: -1;
    animation: borderRotate 4s linear infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 10px,
      #ffd700 10px,
      #ffd700 20px
    );
  }
  
  @keyframes borderRotate {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const CouponHeader = styled.div`
  background: linear-gradient(135deg, #ffd700 0%, #ffed4a 50%, #f39c12 100%);
  color: #2c3e50;
  padding: 20px;
  border-radius: 25px 25px 0 0;
  margin: 0;
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 10px solid #f39c12;
  }
`;

const CouponBody = styled.div`
  padding: 25px;
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 20px;
    right: 20px;
    height: 2px;
    background: repeating-linear-gradient(
      90deg,
      #dee2e6 0px,
      #dee2e6 8px,
      transparent 8px,
      transparent 16px
    );
  }
`;

const PrizeName = styled(motion.h3)`
  font-size: 2.2rem;
  color: #e91e63;
  margin: 15px 0;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(233, 30, 99, 0.2);
  text-align: center;
  position: relative;
  
  &::before {
    content: '🎁';
    position: absolute;
    left: -40px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5rem;
  }
  
  &::after {
    content: '🎁';
    position: absolute;
    right: -40px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5rem;
  }
`;

const PrizeDescription = styled(motion.p)`
  font-size: 1.1rem;
  color: #495057;
  margin-bottom: 20px;
  line-height: 1.6;
  text-align: center;
  font-style: italic;
`;

const CouponDetails = styled.div`
  background: linear-gradient(145deg, #d4edda 0%, #c3e6cb 100%);
  padding: 20px;
  border-radius: 15px;
  margin-top: 15px;
  border: 2px solid #28a745;
  position: relative;
  
  &::before {
    content: '✨';
    position: absolute;
    top: -10px;
    left: 20px;
    background: #28a745;
    color: white;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.8rem;
  }
`;

const BenefitHighlight = styled.div`
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  color: white;
  padding: 12px;
  border-radius: 10px;
  margin: 10px 0;
  font-weight: bold;
  text-align: center;
  font-size: 1.1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ValidityInfo = styled.div`
  font-size: 0.9rem;
  color: #6c757d;
  margin-top: 15px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  border-left: 4px solid #17a2b8;
`;

const CouponStamp = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 60px;
  height: 60px;
  border: 3px solid #dc3545;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  transform: rotate(-15deg);
  font-size: 0.7rem;
  font-weight: bold;
  color: #dc3545;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const SaveButton = styled(motion.button)`
  background: linear-gradient(45deg, #28a745, #20c997);
  color: white;
  border: none;
  padding: 16px 35px;
  border-radius: 25px;
  font-size: 1.3rem;
  cursor: pointer;
  margin-top: 20px;
  font-weight: bold;
  box-shadow: 0 8px 16px rgba(40, 167, 69, 0.3);
  
  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;

interface ResultSceneProps {
  prize: Prize;
  onSaveCoupon: () => void;
}

const ResultScene: React.FC<ResultSceneProps> = ({ prize, onSaveCoupon }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showFireworks, setShowFireworks] = useState(true);

  // 2초 후 폭죽 효과 숨기기
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFireworks(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // 개발자 도구에서 쿠폰 확인용 함수 추가
  useEffect(() => {
    (window as any).checkSavedCoupons = () => {
      const coupons = JSON.parse(localStorage.getItem('ssgo-coupons') || '[]');
      console.log('저장된 쿠폰 목록:', coupons);
      console.log('최신 쿠폰:', JSON.parse(localStorage.getItem('ssgo-latest-coupon') || 'null'));
      return coupons;
    };

    (window as any).clearAllCoupons = () => {
      localStorage.removeItem('ssgo-coupons');
      localStorage.removeItem('ssgo-latest-coupon');
      console.log('모든 쿠폰이 삭제되었습니다.');
    };
  }, []);

  const handleSaveCoupon = async () => {
    if (isSaved) return;

    console.log('쿠폰 저장 시작...', { prize: prize.name });

    try {
      // 쿠폰 데이터 생성
      const couponData = {
        id: Date.now().toString(),
        title: "🎁 산으로 간 고등어 반찬쿠폰 🎁",
        prize: prize.name,
        description: prize.description,
        validity: "유효기간: 7일",
        store: "사용처: 모든 매장",
        contact: "문의: 010-XXXX-XXXX",
        issueDate: new Date().toLocaleDateString('ko-KR'),
        expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('ko-KR'),
        isUsed: false,
        createdAt: new Date().toISOString()
      };
      
      console.log('생성된 쿠폰 데이터:', couponData);
      
      // 로컬 스토리지에 저장
      const existingCoupons = JSON.parse(localStorage.getItem('ssgo-coupons') || '[]');
      console.log('기존 쿠폰 수:', existingCoupons.length);
      
      existingCoupons.push(couponData);
      
      localStorage.setItem('ssgo-coupons', JSON.stringify(existingCoupons));
      localStorage.setItem('ssgo-latest-coupon', JSON.stringify(couponData));
      
      // 저장 확인
      const savedCoupons = JSON.parse(localStorage.getItem('ssgo-coupons') || '[]');
      const latestCoupon = JSON.parse(localStorage.getItem('ssgo-latest-coupon') || '{}');
      
      console.log('쿠폰 저장 완료!');
      console.log('저장된 총 쿠폰 수:', savedCoupons.length);
      console.log('최신 쿠폰:', latestCoupon);
      console.log('저장된 모든 쿠폰:', savedCoupons);
      
      // 성공 상태 업데이트
      setIsSaved(true);
      
      // 쿠폰 이미지 생성 및 다운로드
      console.log('쿠폰 이미지 생성 시작...');
      await generateCouponImage(couponData);
      
      // 사용자에게 저장 완료 알림
      setTimeout(() => {
        alert(`🎉 쿠폰이 성공적으로 저장되었습니다! 🎉\n\n상품: ${prize.name}\n쿠폰 ID: ${couponData.id}\n\n개발자 도구에서 window.checkSavedCoupons() 를 실행하면 저장된 쿠폰을 확인할 수 있습니다.`);
      }, 500);
      
      // 3초 후 다음 화면으로 이동
      setTimeout(() => {
        onSaveCoupon();
      }, 3000);
      
    } catch (error) {
      console.error('쿠폰 저장 실패:', error);
      alert('쿠폰 저장에 실패했습니다. 다시 시도해주세요.\n\n오류 내용: ' + error);
      setIsSaved(false);
    }
  };

  const generateCouponImage = async (couponData: any) => {
    try {
      // Canvas를 사용해 전문적인 쿠폰 이미지 생성
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');

      canvas.width = 500;
      canvas.height = 700;

      // 메인 배경 그라데이션 (고급스러운 블루-퍼플)
      const bgGradient = ctx.createLinearGradient(0, 0, 0, 700);
      bgGradient.addColorStop(0, '#667eea');
      bgGradient.addColorStop(0.5, '#764ba2');
      bgGradient.addColorStop(1, '#667eea');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, 500, 700);

      // 장식용 패턴 배경
      ctx.save();
      ctx.globalAlpha = 0.1;
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 15; j++) {
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(50 + i * 50, 50 + j * 50, 15, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // 메인 쿠폰 카드 배경 (화이트 카드)
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetY = 10;
      ctx.fillRect(40, 100, 420, 520);
      ctx.shadowColor = 'transparent';

      // 쿠폰 헤더 배경 (골드 그라데이션)
      const headerGradient = ctx.createLinearGradient(0, 100, 0, 170);
      headerGradient.addColorStop(0, '#ffd700');
      headerGradient.addColorStop(0.5, '#ffed4a');
      headerGradient.addColorStop(1, '#f39c12');
      ctx.fillStyle = headerGradient;
      ctx.fillRect(40, 100, 420, 70);

      // 헤더 장식 라인
      ctx.strokeStyle = '#e67e22';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(40, 170);
      ctx.lineTo(460, 170);
      ctx.stroke();

      // 쿠폰 잘림선 효과 (상단) - 더 작은 크기
      ctx.fillStyle = '#667eea';
      for (let i = 50; i < 450; i += 16) {
        ctx.beginPath();
        ctx.arc(i, 100, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 쿠폰 잘림선 효과 (하단) - 더 작은 크기
      for (let i = 50; i < 450; i += 16) {
        ctx.beginPath();
        ctx.arc(i, 620, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 좌측 잘림선 - 더 작은 크기
      for (let i = 110; i < 610; i += 16) {
        ctx.beginPath();
        ctx.arc(40, i, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 우측 잘림선 - 더 작은 크기
      for (let i = 110; i < 610; i += 16) {
        ctx.beginPath();
        ctx.arc(460, i, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 헤더 텍스트
      ctx.fillStyle = '#2c3e50';
      ctx.font = 'bold 22px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🎁 산으로 간 고등어 🎁', 250, 125);
      ctx.font = 'bold 18px Arial, sans-serif';
      ctx.fillText('반찬쿠폰', 250, 150);

      // 메인 상품 섹션 배경
      const prizeGradient = ctx.createLinearGradient(0, 190, 0, 300);
      prizeGradient.addColorStop(0, '#f8f9fa');
      prizeGradient.addColorStop(1, '#e9ecef');
      ctx.fillStyle = prizeGradient;
      ctx.fillRect(60, 190, 380, 110);

      // 상품명 (대형, 강조)
      ctx.fillStyle = '#e91e63';
      ctx.font = 'bold 32px Arial, sans-serif';
      ctx.fillText(couponData.prize, 250, 230);

      // 상품 설명
      ctx.fillStyle = '#6c757d';
      ctx.font = '18px Arial, sans-serif';
      const description = couponData.description;
      if (description.length > 20) {
        const words = description.split(' ');
        let line1 = '', line2 = '';
        let totalChars = 0;
        
        for (let word of words) {
          if (totalChars + word.length < 20) {
            line1 += word + ' ';
            totalChars += word.length + 1;
          } else {
            line2 += word + ' ';
          }
        }
        
        ctx.fillText(line1.trim(), 250, 260);
        if (line2.trim()) {
          ctx.fillText(line2.trim(), 250, 285);
        }
      } else {
        ctx.fillText(description, 250, 270);
      }

      // 구분선 (장식적)
      ctx.strokeStyle = '#dee2e6';
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 5]);
      ctx.beginPath();
      ctx.moveTo(60, 320);
      ctx.lineTo(440, 320);
      ctx.stroke();
      ctx.setLineDash([]);

      // 쿠폰 정보 섹션
      ctx.fillStyle = '#495057';
      ctx.font = 'bold 16px Arial, sans-serif';
      ctx.textAlign = 'left';
      
      // 정보 라벨들
      const labels = [
        '📅 발급일:',
        '⏰ 만료일:',
        '🏪 사용처:',
        '📞 문의:'
      ];
      
      const values = [
        couponData.issueDate,
        couponData.expiryDate,
        '모든 매장',
        '010-XXXX-XXXX'
      ];

      let yPos = 360;
      for (let i = 0; i < labels.length; i++) {
        // 라벨
        ctx.fillStyle = '#495057';
        ctx.font = 'bold 14px Arial, sans-serif';
        ctx.fillText(labels[i], 80, yPos);
        
        // 값
        ctx.fillStyle = '#6c757d';
        ctx.font = '14px Arial, sans-serif';
        ctx.fillText(values[i], 180, yPos);
        
        yPos += 30;
      }

      // 특별 혜택 박스
      ctx.fillStyle = '#d4edda';
      ctx.fillRect(80, 490, 340, 60);
      ctx.strokeStyle = '#c3e6cb';
      ctx.lineWidth = 2;
      ctx.strokeRect(80, 490, 340, 60);

      ctx.fillStyle = '#155724';
      ctx.font = 'bold 16px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🎉 특별 혜택 🎉', 250, 510);
      ctx.font = '14px Arial, sans-serif';
      ctx.fillText(`"${couponData.prize}" 무료 제공!`, 250, 535);

      // QR 코드 영역 (모의)
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(350, 570, 80, 80);
      ctx.strokeStyle = '#dee2e6';
      ctx.lineWidth = 2;
      ctx.strokeRect(350, 570, 80, 80);

      // QR 코드 패턴 (모의)
      ctx.fillStyle = '#000000';
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if ((i + j) % 2 === 0) {
            ctx.fillRect(355 + i * 8, 575 + j * 8, 6, 6);
          }
        }
      }

      // QR 라벨
      ctx.fillStyle = '#6c757d';
      ctx.font = '12px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('QR 코드', 390, 665);

      // 쿠폰 ID
      ctx.fillStyle = '#495057';
      ctx.font = '12px Arial, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('쿠폰 ID:', 80, 590);
      ctx.fillStyle = '#6c757d';
      ctx.font = '11px monospace';
      ctx.fillText(couponData.id.slice(-12), 80, 610);

      // 유효성 확인 도장 효과
      ctx.save();
      ctx.translate(150, 600);
      ctx.rotate(-0.3);
      ctx.strokeStyle = '#dc3545';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 35, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.fillStyle = '#dc3545';
      ctx.font = 'bold 12px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('VALID', 0, -5);
      ctx.font = '10px Arial, sans-serif';
      ctx.fillText('인증됨', 0, 8);
      ctx.restore();

      // 워터마크
      ctx.save();
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = '#6c757d';
      ctx.font = 'bold 24px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.translate(250, 420);
      ctx.rotate(-0.5);
      ctx.fillText('산으로 간 고등어', 0, 0);
      ctx.restore();

      // 하단 주의사항
      ctx.fillStyle = '#6c757d';
      ctx.font = '10px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('※ 본 쿠폰은 발급일로부터 7일간 유효합니다', 250, 675);
      ctx.fillText('※ 타 할인과 중복 사용 불가', 250, 690);

      // 이미지 다운로드 (고품질)
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `산으로간고등어_반찬쿠폰_${couponData.prize.replace(/\s+/g, '_')}_${couponData.id}.png`;
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          console.log('전문적인 쿠폰 이미지 다운로드 완료');
        }
      }, 'image/png', 1.0); // 최고 품질

    } catch (error) {
      console.error('쿠폰 이미지 생성 실패:', error);
    }
  };

  return (
    <SceneContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 2초간만 보이는 축하 폭죽 효과 */}
      {showFireworks && (
        <>
          <FloatingStars />
          
          <CelebrationFireworks>
            {[...Array(15)].map((_, i) => (
              <Firework
                key={i}
                delay={i}
                style={{
                  top: `${Math.random() * 70 + 10}%`,
                  left: `${Math.random() * 80 + 10}%`,
                  animationDelay: `${Math.random() * 1}s`,
                }}
              />
            ))}
          </CelebrationFireworks>
          
          {[...Array(25)].map((_, i) => (
            <FallingConfetti
              key={i}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1}s`,
              }}
            />
          ))}
        </>
      )}

      <Congratulations
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        🎊 축하합니다! 🎊
      </Congratulations>
      
      <CouponCard
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <CouponHeader>
          🎁 산으로 간 고등어 반찬쿠폰 🎁
        </CouponHeader>
        <CouponBody>
          <CouponStamp>
            VALID<br/>인증됨
          </CouponStamp>
          <PrizeName
            animate={isSaved ? {
              scale: [1, 1.1, 1],
              color: ['#e91e63', '#28a745', '#e91e63']
            } : {}}
            transition={{ duration: 2, repeat: isSaved ? Infinity : 0 }}
          >
            {prize.name}
          </PrizeName>
          <PrizeDescription>{prize.description}</PrizeDescription>
          
          <BenefitHighlight>
            🎉 "{prize.name}" 무료 제공! 🎉
          </BenefitHighlight>
          
          <CouponDetails>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#155724', marginBottom: '10px' }}>
              💎 특별 혜택 안내
            </div>
            <div style={{ marginBottom: '8px' }}>
              📍 다음 방문 시 사용 가능
            </div>
            <div style={{ fontWeight: 'bold', color: '#28a745', fontSize: '1.1rem', margin: '8px 0' }}>
              "{prize.name}" 1회 무료 제공
            </div>
            <ValidityInfo>
              📅 유효기간: 7일<br/>
              🏪 사용처: 모든 매장<br/>
              📞 문의: 010-XXXX-XXXX<br/>
              ⚠️ 타 할인과 중복 사용 불가
            </ValidityInfo>
          </CouponDetails>
        </CouponBody>
      </CouponCard>
      
      <SaveButton
        whileHover={{ scale: isSaved ? 1 : 1.05 }}
        whileTap={{ scale: isSaved ? 1 : 0.95 }}
        onClick={handleSaveCoupon}
        disabled={isSaved}
      >
        {isSaved ? '✅ 저장완료!' : '쿠폰 저장'}
      </SaveButton>
      
      {isSaved && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: '15px',
            color: '#ffd700',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}
        >
          🎉 쿠폰이 저장되었습니다! 🎉<br/>
          <span style={{ fontSize: '0.9rem' }}>3초 후 자동으로 이동합니다...</span>
        </motion.div>
      )}
    </SceneContainer>
  );
};

export default ResultScene; 