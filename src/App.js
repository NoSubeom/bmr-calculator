import React, { useState } from 'react';
import './App.css';

// 음식 리스트 (이름, g, kcal)
const carbs = [
  { name: "현미밥", g: 150, kcal: 220 },
  { name: "고구마", g: 100, kcal: 130 },
  { name: "오트밀", g: 40, kcal: 150 },
  { name: "통밀빵", g: 60, kcal: 150 },
  { name: "퀴노아", g: 50, kcal: 120 },
  { name: "감자", g: 100, kcal: 80 },
  { name: "옥수수", g: 70, kcal: 80 },
  { name: "바나나", g: 100, kcal: 90 },
  { name: "파스타", g: 70, kcal: 250 },
  { name: "쌀밥", g: 150, kcal: 240 },
  { name: "보리밥", g: 150, kcal: 210 },
  { name: "잡곡밥", g: 150, kcal: 230 },
  { name: "또띠아", g: 50, kcal: 130 },
  { name: "베이글", g: 80, kcal: 220 },
  { name: "뮤즐리", g: 40, kcal: 150 },
  { name: "시리얼", g: 40, kcal: 150 },
  { name: "단호박", g: 100, kcal: 70 },
  { name: "떡", g: 50, kcal: 110 },
  { name: "고구마말랭이", g: 30, kcal: 100 },
  { name: "옥수수빵", g: 60, kcal: 160 },
  { name: "크래커", g: 20, kcal: 100 }
];
const proteins = [
  { name: "닭가슴살", g: 100, kcal: 110 },
  { name: "계란", g: 50, kcal: 70 },
  { name: "연어", g: 100, kcal: 200 },
  { name: "두부", g: 100, kcal: 80 },
  { name: "소고기", g: 100, kcal: 180 },
  { name: "돼지고기", g: 100, kcal: 200 },
  { name: "오징어", g: 50, kcal: 40 },
  { name: "새우", g: 50, kcal: 45 },
  { name: "참치", g: 100, kcal: 130 },
  { name: "고등어", g: 100, kcal: 190 },
  { name: "콩", g: 50, kcal: 70 },
  { name: "렌틸콩", g: 50, kcal: 60 },
  { name: "병아리콩", g: 50, kcal: 80 },
  { name: "치즈", g: 30, kcal: 100 },
  { name: "우유", g: 200, kcal: 130 },
  { name: "요거트", g: 100, kcal: 60 },
  { name: "햄", g: 30, kcal: 90 },
  { name: "닭다리살", g: 100, kcal: 130 },
  { name: "오리고기", g: 100, kcal: 200 },
  { name: "메추리알", g: 30, kcal: 45 },
  { name: "게맛살", g: 30, kcal: 40 }
];
const fats = [
  { name: "아보카도", g: 50, kcal: 80 },
  { name: "올리브오일", g: 10, kcal: 90 },
  { name: "아몬드", g: 20, kcal: 120 },
  { name: "호두", g: 20, kcal: 130 },
  { name: "캐슈넛", g: 20, kcal: 110 },
  { name: "땅콩버터", g: 15, kcal: 90 },
  { name: "치즈", g: 20, kcal: 70 },
  { name: "들기름", g: 10, kcal: 90 },
  { name: "참기름", g: 10, kcal: 90 },
  { name: "해바라기씨유", g: 10, kcal: 90 },
  { name: "코코넛오일", g: 10, kcal: 90 },
  { name: "마요네즈", g: 15, kcal: 100 },
  { name: "연어(지방)", g: 30, kcal: 60 },
  { name: "참치캔(기름)", g: 20, kcal: 80 },
  { name: "햄프씨드", g: 10, kcal: 60 },
  { name: "해바라기씨", g: 15, kcal: 90 },
  { name: "피스타치오", g: 20, kcal: 120 },
  { name: "브라질너트", g: 15, kcal: 100 },
  { name: "마카다미아", g: 15, kcal: 110 },
  { name: "크림치즈", g: 20, kcal: 70 },
  { name: "버터", g: 10, kcal: 75 },
  { name: "코코넛밀크", g: 50, kcal: 90 }
];

function getRandom(arr, n = 1) {
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
  const [bmr, setBmr] = useState(null);
  const [goal, setGoal] = useState('maintain');
  const [randomDiet, setRandomDiet] = useState(null);

  const calculateBMR = (e) => {
    e.preventDefault();
    let calculatedBMR;
    if (gender === 'male') {
      calculatedBMR = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
    } else {
      calculatedBMR = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
    }
    setBmr(Math.round(calculatedBMR));
    setRandomDiet(null);
  };

  const getCalorieGoal = () => {
    if (!bmr) return null;
    switch(goal) {
      case 'lose': return bmr - 500;
      case 'maintain': return bmr;
      case 'gain': return bmr + 500;
      default: return bmr;
    }
  };

  const getGoalText = () => {
    switch(goal) {
      case 'lose': return "체중 감량";
      case 'maintain': return "체중 유지";
      case 'gain': return "체중 증가";
      default: return "";
    }
  };

  // 무작위 식단 생성
  const generateRandomDiet = () => {
    return {
      breakfast: {
        carbs: getRandom(carbs, 1),
        proteins: getRandom(proteins, 1),
        fats: getRandom(fats, 1)
      },
      lunch: {
        carbs: getRandom(carbs, 1),
        proteins: getRandom(proteins, 1),
        fats: getRandom(fats, 1)
      },
      dinner: {
        carbs: getRandom(carbs, 1),
        proteins: getRandom(proteins, 1),
        fats: getRandom(fats, 1)
      },
      snack: {
        carbs: getRandom(carbs, 1),
        proteins: getRandom(proteins, 1),
        fats: getRandom(fats, 1)
      }
    };
  };

  const handleRandomDiet = () => {
    setRandomDiet(generateRandomDiet());
  };

  // 음식 표기: 이름 (g, kcal)
  const foodLabel = (food) => `${food.name} (${food.g}g, ${food.kcal}kcal)`;

  return (
    <div className="App">
      <h1>식단 도우미</h1>
      <div className="calculator-container">
        <form onSubmit={calculateBMR}>
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
          <button type="submit">BMR 계산하기</button>
        </form>

        {bmr && (
          <div className="result">
            <h2>당신의 기초대사량 (BMR)</h2>
            <p>{bmr} kcal/일</p>
            <div className="goal-selection">
              <h3>목표 선택</h3>
              <select value={goal} onChange={(e) => setGoal(e.target.value)}>
                <option value="lose">체중 감량</option>
                <option value="maintain">체중 유지</option>
                <option value="gain">체중 증가</option>
              </select>
            </div>
            <div className="calorie-goal">
              <h3>오늘 섭취해야 할 칼로리</h3>
              <p style={{fontWeight:'bold', fontSize:'20px', color:'#1976d2'}}>
                {getCalorieGoal()} kcal/일 ({getGoalText()})
              </p>
            </div>
            <button
              className="diet-button"
              style={{ fontSize: '14px', padding: '6px 12px', marginBottom: '10px' }}
              onClick={handleRandomDiet}
            >
              랜덤 식단 추천
            </button>
            {randomDiet && (
              <div className="diet-plan">
                <h3>무작위 추천 식단</h3>
                {['breakfast', 'lunch', 'dinner', 'snack'].map((meal) => (
                  <div className="meal-section" key={meal}>
                    <h4>{
                      meal === 'breakfast' ? '아침' :
                      meal === 'lunch' ? '점심' :
                      meal === 'dinner' ? '저녁' : '간식'
                    }</h4>
                    <ul>
                      <li><b>탄수화물:</b> {randomDiet[meal].carbs.map(foodLabel).join(', ')}</li>
                      <li><b>단백질:</b> {randomDiet[meal].proteins.map(foodLabel).join(', ')}</li>
                      <li><b>지방:</b> {randomDiet[meal].fats.map(foodLabel).join(', ')}</li>
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