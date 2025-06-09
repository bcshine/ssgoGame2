export type GameScene = 'waiting' | 'picking' | 'spinning' | 'result' | 'complete';

export type Prize = {
  id: number;
  name: string;
  description: string;
  probability: number;
};

export type BoxState = {
  id: number;
  isSelected: boolean;
  prize?: Prize;
};

export const PRIZES: Prize[] = [
  { id: 1, name: '1,000원 할인', description: '5,000원 이상 구매 시 사용 가능', probability: 1/6 },
  { id: 2, name: '10% 할인', description: '모든 상품 구매 시 사용 가능', probability: 1/6 },
  { id: 3, name: '멸치볶음 1팩', description: '신선한 멸치볶음 1팩 증정', probability: 1/6 },
  { id: 4, name: '음료수 한잔', description: '매장 내 음료 1잔 무료', probability: 1/6 },
  { id: 5, name: '나물 1팩', description: '계절 나물 1팩 증정', probability: 1/6 },
  { id: 6, name: '한번 더!', description: '다시 한번 뽑기 기회!', probability: 1/6 },
]; 