import React, { useState } from 'react';
import './App.css';

// 음식 리스트 (대표값, g/kcal)
const carbs = [
  { name: "현미밥", gram: 150, kcal: 220 },
  { name: "고구마", gram: 100, kcal: 130 },
  { name: "오트밀", gram: 40, kcal: 150 },
  { name: "통밀빵", gram: 60, kcal: 150 },
  { name: "퀴노아", gram: 50, kcal: 180 },
  { name: "감자", gram: 100, kcal: 80 },
  { name: "옥수수", gram: 100, kcal: 90 },
  { name: "바나나", gram: 100, kcal: 90 },
  { name: "파스타", gram: 70, kcal: 250 },
  { name: "쌀밥", gram: 150, kcal: 240 },
  { name: "보리밥", gram: 150, kcal: 210 },
  { name: "잡곡밥", gram: 150, kcal: 230 },
  { name: "또띠아", gram: 50, kcal: 130 },
  { name: "베이글", gram: 90, kcal: 250 },
  { name: "뮤즐리", gram: 40, kcal: 150 },
  { name: "시리얼", gram: 30, kcal: 120 },
  { name: "단호박", gram: 100, kcal: 30 },
  { name: "떡", gram: 50, kcal: 110 },
  { name: "고구마말랭이", gram: 30, kcal: 100 },
  { name: "옥수수빵", gram: 60, kcal: 180 },
  { name: "크래커", gram: 20, kcal: 100 }
];
const proteins = [
  { name: "닭가슴살", gram: 100, kcal: 110 },
  { name: "계란", gram: 50, kcal: 70 },
  { name: "연어", gram: 70, kcal: 140 },
  { name: "두부", gram: 100, kcal: 80 },
  { name: "소고기", gram: 100, kcal: 200 },
  { name: "돼지고기", gram: 100, kcal: 250 },
  { name: "오징어", gram: 50, kcal: 40 },
  { name: "새우", gram: 50, kcal: 45 },
  { name: "참치", gram: 50, kcal: 60 },
  { name: "고등어", gram: 70, kcal: 150 },
  { name: "콩", gram: 50, kcal: 70 },
  { name: "렌틸콩", gram: 50, kcal: 60 },
  { name: "병아리콩", gram: 50, kcal: 80 },
  { name: "치즈", gram: 20, kcal: 70 },
  { name: "우유", gram: 200, kcal: 130 },
  { name: "요거트", gram: 100, kcal: 60 },
  { name: "햄", gram: 30, kcal: 80 },
  { name: "닭다리살", gram: 100, kcal: 130 },
  { name: "오리고기", gram: 100, kcal: 200 },
  { name: "메추리알", gram: 12, kcal: 18 },
  { name: "게맛살", gram: 30, kcal: 30 }
];
const fats = [
  { name: "아보카도", gram: 50, kcal: 80 },
  { name: "올리브오일", gram: 10, kcal: 90 },
  { name: "아몬드", gram: 15, kcal: 90 },
  { name: "호두", gram: 15, kcal: 100 },
  { name: "캐슈넛", gram: 15, kcal: 85 },
  { name: "땅콩버터", gram: 15, kcal: 90 },
  { name: "치즈", gram: 20, kcal: 70 },
  { name: "들기름", gram: 10, kcal: 90 },
  { name: "참기름", gram: 10, kcal: 90 },
  { name: "해바라기씨유", gram: 10, kcal: 90 },
  { name: "코코넛오일", gram: 10, kcal: 90 },
  { name: "마요네즈", gram: 15, kcal: 100 },
  { name: "연어(지방)", gram: 30, kcal: 60 },
  { name: "참치캔(기름)", gram: 30, kcal: 80 },
  { name: "햄프씨드", gram: 10, kcal: 55 },
  { name: "해바라기씨", gram: 15, kcal: 90 },
  { name: "피스타치오", gram: 15, kcal: 85 },
  { name: "브라질너트", gram: 10, kcal: 65 },
  { name: "마카다미아", gram: 10, kcal: 70 },
  { name: "크림치즈", gram: 20, kcal: 70 },
  { name: "버터", gram: 10, kcal: 75 },
  { name: "코코넛밀크", gram: 50, kcal: 90 }
];

const activityLevels = [
  { value: 1.2, label: "거의 운동하지 않음 (앉아서 생활)" },
  { value: 1.375, label: "가벼운 활동 (주 1~3회 가벼운 운동)" },
  { value: 1.55, label: "보통 활동 (주 3~5회 보통 운동)" },
  { value: 1.725, label: "적극적 활동 (주 6~7회 격렬한 운동)" },
  { value: 1.9, label: "매우 적극적 활동 (매일 2회 이상 격렬한 운동/육체노동)" }
];

function getRandom(arr, n = 1) {
  // n개 무작위 추출 (중복 없음)
  const result = [];
  const used = new Set();
  while (result.length < n && used.size < arr.length) {
    const idx = Math.floor(Math.random() * arr.length);
    if (!used.has(idx)) {
      result.push(arr[idx]);
      used.add(idx);
    }
  }
  return result;
}

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState(1.2);
  const [goal, setGoal] = useState('maintain');
  const [bmr, setBmr] = useState(null);
  const [tdee, setTdee] = useState(null);
  const [result, setResult] = useState(null);
  const [randomDiet, setRandomDiet] = useState(null);

  const calculateTDEE = (e) => {
    e.preventDefault();
    let calculatedBMR;
    if (gender === 'male') {
      calculatedBMR = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
    } else {
      calculatedBMR = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
    }
    const calculatedTDEE = calculatedBMR * activity;
    setBmr(Math.round(calculatedBMR));
    setTdee(Math.round(calculatedTDEE));

    let goalKcal = 0;
    if (goal === 'maintain') goalKcal = Math.round(calculatedTDEE);
    if (goal === 'lose') goalKcal = Math.round(calculatedTDEE * 0.9);
    if (goal === 'gain') goalKcal = Math.round(calculatedTDEE * 1.1);
    setResult(goalKcal);
    // 대사량 계산 시 식단도 자동 생성
    setRandomDiet(generateRandomDiet(goalKcal));
  };

  const goalText = {
    maintain: '유지대사량',
    lose: '감량 목표 대사량 (TDEE의 90%)',
    gain: '증량 목표 대사량 (TDEE의 110%)'
  };

  // 무작위 식단 생성 (목표 칼로리에 맞게 분배)
  const generateRandomDiet = (targetKcal = result) => {
    if (!targetKcal) return null;
    // 4끼로 균등 분배
    const mealNames = ['breakfast', 'lunch', 'dinner', 'snack'];
    const mealRatio = [0.25, 0.25, 0.25, 0.25]; // 각 끼니 비율
    // 각 끼니별 탄수:단백:지방 비율 (50:30:20)
    const macroRatio = { carbs: 0.5, proteins: 0.3, fats: 0.2 };
    const diet = {};
    mealNames.forEach((meal, i) => {
      const mealKcal = targetKcal * mealRatio[i];
      // 각 영양소별 칼로리
      const carbKcal = mealKcal * macroRatio.carbs;
      const proteinKcal = mealKcal * macroRatio.proteins;
      const fatKcal = mealKcal * macroRatio.fats;
      // 음식 랜덤 추출
      const carbFood = getRandom(carbs, 1)[0];
      const proteinFood = getRandom(proteins, 1)[0];
      const fatFood = getRandom(fats, 1)[0];
      // 음식별 g 계산 (kcal 비례)
      const carbGram = Math.round((carbKcal / carbFood.kcal) * carbFood.gram);
      const proteinGram = Math.round((proteinKcal / proteinFood.kcal) * proteinFood.gram);
      const fatGram = Math.round((fatKcal / fatFood.kcal) * fatFood.gram);
      // 실제 kcal 계산 (반올림)
      const carbRealKcal = Math.round(carbFood.kcal * (carbGram / carbFood.gram));
      const proteinRealKcal = Math.round(proteinFood.kcal * (proteinGram / proteinFood.gram));
      const fatRealKcal = Math.round(fatFood.kcal * (fatGram / fatFood.gram));
      diet[meal] = {
        carbs: { ...carbFood, gram: carbGram, kcal: carbRealKcal },
        proteins: { ...proteinFood, gram: proteinGram, kcal: proteinRealKcal },
        fats: { ...fatFood, gram: fatGram, kcal: fatRealKcal }
      };
    });
    return diet;
  };

  // 버튼을 누를 때마다 새로운 식단 생성
  const handleShowDiet = () => {
    setRandomDiet(generateRandomDiet());
  };

  // 음식 표기 함수
  const foodLabel = (food) => `${food.name} (${food.gram}g, ${food.kcal}kcal)`;

  // 식단 총합 계산
  const getTotalKcal = (diet) => {
    if (!diet) return 0;
    return Object.values(diet).reduce((sum, meal) =>
      sum + meal.carbs.kcal + meal.proteins.kcal + meal.fats.kcal, 0
    );
  };

  return (
    <div className="App">
      <h1>
        식단 도우미
        <span style={{
          fontSize: '1.1rem',
          fontWeight: 400,
          display: 'block',
          color: '#888',
          marginTop: '6px'
        }}>
          건강한 식단과 대사량 계산을 한 번에!
        </span>
      </h1>
      <div className="calculator-container">
        <form onSubmit={calculateTDEE}>
          <div className="input-group">
            <label>성별:</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
          </div>
          <div className="input-group">
            <label>체중 (kg):</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>신장 (cm):</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>나이:</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>활동량:</label>
            <select value={activity} onChange={(e) => setActivity(Number(e.target.value))}>
              {activityLevels.map((level, idx) => (
                <option key={idx} value={level.value}>{level.label}</option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>목표:</label>
            <select value={goal} onChange={(e) => setGoal(e.target.value)}>
              <option value="maintain">유지</option>
              <option value="lose">감량</option>
              <option value="gain">증량</option>
            </select>
          </div>
          <button type="submit">대사량 계산하기</button>
        </form>

        {result && (
          <div className="result">
            <h2>결과</h2>
            <p><b>기초대사량(BMR):</b> {bmr} kcal/일</p>
            <p><b>유지대사량(TDEE):</b> {tdee} kcal/일</p>
            <p style={{ color: '#1976d2', fontWeight: 'bold' }}>
              {goalText[goal]}: {result} kcal/일
            </p>
            <button className="diet-button" onClick={handleShowDiet} type="button">
              무작위 식단 추천 다시 받기
            </button>
            {randomDiet && (
              <div className="diet-plan">
                <h3>🍽️ 무작위 추천 식단 <span style={{fontSize:'0.95em',color:'#888'}}>총합 {getTotalKcal(randomDiet)} kcal</span></h3>
                {['breakfast', 'lunch', 'dinner', 'snack'].map((meal) => (
                  <div className="meal-section" key={meal}>
                    <h4>
                      {meal === 'breakfast' ? '🍚 아침' :
                        meal === 'lunch' ? '🍗 점심' :
                          meal === 'dinner' ? '🥑 저녁' : '🍎 간식'}
                    </h4>
                    <ul>
                      <li><span role="img" aria-label="carb">🍞</span><b>탄수화물:</b> {foodLabel(randomDiet[meal].carbs)}</li>
                      <li><span role="img" aria-label="protein">🥚</span><b>단백질:</b> {foodLabel(randomDiet[meal].proteins)}</li>
                      <li><span role="img" aria-label="fat">🥑</span><b>지방:</b> {foodLabel(randomDiet[meal].fats)}</li>
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;