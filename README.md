# 산간고 반찬가게 재구매 쿠폰게임 🎯

**Mountain Side Dish Shop Re-purchase Coupon Game**

모바일 최적화된 한국어 쿠폰 게임입니다. React TypeScript로 개발되었으며, 사용자가 반찬을 선택하고 쿠폰을 받을 수 있는 인터랙티브한 게임입니다.

## ✨ 주요 기능

- 🎮 **5단계 게임 진행**: 대기 → 선택 → 회전 → 결과 → 완료
- 📱 **모바일 최적화**: 3:5 비율 (833px 최대 높이) 반응형 디자인
- 🎨 **NEXON Gothic 폰트**: 한국어에 최적화된 폰트 적용
- 🎁 **6가지 상품**: 동일한 확률로 상품 지급
- 🎰 **"한번 더!" 기능**: 6번 상품 선택 시 게임 재시작
- 💾 **실제 쿠폰 저장**: localStorage를 통한 쿠폰 데이터 저장
- 🖼️ **쿠폰 이미지 다운로드**: 500x700 PNG 형태의 전문적인 쿠폰 이미지
- 🎆 **화려한 시각 효과**: 폭죽, 컨페티, 마법 효과 등

## 🎯 게임 상품

1. **상품 1**: 김치 (q1.png)
2. **상품 2**: 나물 (q2.png)  
3. **상품 3**: 젓갈 (q3.png)
4. **상품 4**: 무침 (q4.png)
5. **상품 5**: 조림 (q5.png)
6. **상품 6**: 한번 더! (q6.png) - 게임 재시작

## 🚀 설치 및 실행

### 사전 요구사항
- Node.js (v14 이상)
- npm 또는 yarn

### 설치
```bash
# 저장소 클론
git clone https://github.com/yourusername/ssgo-game.git
cd ssgo-game

# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

게임은 `http://localhost:3000`에서 실행됩니다.

## 🏗️ 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 테스트
npm run test
```

## 🎨 기술 스택

- **Frontend**: React 18, TypeScript
- **Styling**: Styled-components, Framer Motion
- **애니메이션**: CSS3 애니메이션, Framer Motion
- **이미지**: Canvas API를 통한 동적 이미지 생성
- **저장소**: localStorage
- **폰트**: NEXON Gothic (웹폰트)

## 📱 화면 구성

### 1. 대기 화면 (WaitingScene)
- 게임 시작 버튼
- 흰색 배경의 심플한 디자인

### 2. 선택 화면 (PickingScene)
- 6개의 반찬 이미지 격자 배치
- 호버 및 클릭 애니메이션
- "마음에 드는 반찬을 골라주세요!" 안내

### 3. 회전 화면 (SpinningScene)
- 화려한 시각 효과 (폭죽, 컨페티, 마법 효과)
- 3D 회전하는 선물 상자
- 2초간 지속되는 애니메이션

### 4. 결과 화면 (ResultScene)
- 당첨된 상품 표시
- 쿠폰 생성 및 저장 기능
- 쿠폰 이미지 다운로드
- 게임 재시작 버튼

### 5. 완료 화면 (CompleteScene)
- 게임 종료 안내
- 새 게임 시작 버튼

## 🎁 쿠폰 시스템

### 쿠폰 저장
- localStorage에 배열 형태로 저장
- 각 쿠폰마다 고유 ID와 타임스탬프
- 최신 쿠폰 정보 별도 저장

### 쿠폰 이미지
- Canvas API로 실시간 생성
- 500x700 해상도의 고품질 PNG
- 전문적인 쿠폰 디자인 (천공, 스탬프, QR코드 등)
- 자동 다운로드 기능

### 디버깅 도구
```javascript
// 브라우저 콘솔에서 사용 가능
window.checkSavedCoupons(); // 저장된 쿠폰 확인
window.clearAllCoupons();   // 모든 쿠폰 삭제
```

## 🎨 디자인 특징

- **모바일 퍼스트**: 모든 UI가 모바일에 최적화
- **한국적 감성**: NEXON Gothic 폰트와 한국어 UI
- **프리미엄 느낌**: 그라데이션, 3D 효과, 애니메이션
- **접근성**: 명확한 대비와 큰 터치 영역

## 📂 프로젝트 구조

```
ssgo-game/
├── public/
│   ├── images/         # 게임 상품 이미지
│   │   ├── q1.png
│   │   ├── q2.png
│   │   └── ...
│   └── index.html
├── src/
│   ├── scenes/         # 게임 화면 컴포넌트
│   │   ├── WaitingScene.tsx
│   │   ├── PickingScene.tsx
│   │   ├── SpinningScene.tsx
│   │   ├── ResultScene.tsx
│   │   └── CompleteScene.tsx
│   ├── App.tsx         # 메인 앱 컴포넌트
│   ├── types.ts        # TypeScript 타입 정의
│   └── index.tsx       # 앱 엔트리 포인트
├── package.json
├── tsconfig.json
└── README.md
```

## 🐛 문제 해결

### 이미지가 로드되지 않는 경우
- `public/images/` 폴더에 q1.png ~ q6.png 파일이 있는지 확인
- 개발 서버 재시작 시도

### 쿠폰 저장이 안 되는 경우
- 브라우저의 localStorage가 활성화되어 있는지 확인
- 콘솔에서 `window.checkSavedCoupons()` 실행하여 확인

### 폰트가 적용되지 않는 경우
- 네트워크 연결 확인 (NEXON Gothic은 웹폰트)
- 폰트 로딩 시간 대기

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Made with ❤️ for Korean users** 