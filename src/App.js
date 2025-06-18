import React, { useState } from 'react';
import './App.css';

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [bmr, setBmr] = useState(null);
  const [goal, setGoal] = useState('maintain');
  const [showDiet, setShowDiet] = useState(false);

  const calculateBMR = (e) => {
    e.preventDefault();
    
    // Harris-Benedict 방정식
    let calculatedBMR;
    if (gender === 'male') {
      calculatedBMR = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
    } else {
      calculatedBMR = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
    }
    
    setBmr(Math.round(calculatedBMR));
  };

  const getCalorieGoal = () => {
    if (!bmr) return null;
    
    switch(goal) {
      case 'lose':
        return bmr - 500;
      case 'maintain':
        return bmr;
      case 'gain':
        return bmr + 500;
      default:
        return bmr;
    }
  };

  const getDietPlan = () => {
    const calorieGoal = getCalorieGoal();
    if (!calorieGoal) return null;

    const dietPlans = {
      lose: {
        breakfast: [
          "오트밀 1컵 (150kcal)",
          "바나나 1개 (100kcal)",
          "계란 흰자 2개 (70kcal)"
        ],
        lunch: [
          "현미밥 1공기 (200kcal)",
          "닭가슴살 100g (165kcal)",
          "샐러드 (50kcal)"
        ],
        dinner: [
          "고구마 1개 (130kcal)",
          "단백질 쉐이크 (120kcal)",
          "견과류 1줌 (100kcal)"
        ],
        snack: [
          "그릭요거트 1컵 (100kcal)",
          "사과 1개 (80kcal)"
        ]
      },
      maintain: {
        breakfast: [
          "전체곡물 빵 2장 (200kcal)",
          "아보카도 1/2개 (120kcal)",
          "계란 2개 (140kcal)"
        ],
        lunch: [
          "현미밥 1.5공기 (300kcal)",
          "연어 150g (250kcal)",
          "샐러드 (100kcal)"
        ],
        dinner: [
          "고구마 1개 (130kcal)",
          "닭가슴살 150g (250kcal)",
          "채소 볶음 (100kcal)"
        ],
        snack: [
          "그릭요거트 1컵 (100kcal)",
          "견과류 1줌 (150kcal)",
          "바나나 1개 (100kcal)"
        ]
      },
      gain: {
        breakfast: [
          "전체곡물 빵 3장 (300kcal)",
          "땅콩버터 2큰술 (200kcal)",
          "계란 3개 (210kcal)",
          "바나나 1개 (100kcal)"
        ],
        lunch: [
          "현미밥 2공기 (400kcal)",
          "닭가슴살 200g (330kcal)",
          "아보카도 1개 (240kcal)",
          "올리브오일 1큰술 (120kcal)"
        ],
        dinner: [
          "고구마 2개 (260kcal)",
          "연어 200g (330kcal)",
          "채소 볶음 (150kcal)",
          "올리브오일 1큰술 (120kcal)"
        ],
        snack: [
          "단백질 쉐이크 (240kcal)",
          "견과류 2줌 (300kcal)",
          "그릭요거트 1컵 (100kcal)",
          "바나나 1개 (100kcal)"
        ]
      }
    };

    return dietPlans[goal];
  };

  return (
    <div className="App">
      <h1>BMR 계산기</h1>
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
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>신장 (cm):</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>나이:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
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
              <h3>목표 칼로리</h3>
              <p>{getCalorieGoal()} kcal/일</p>
            </div>

            <button 
              className="diet-button"
              onClick={() => setShowDiet(!showDiet)}
            >
              {showDiet ? '식단 추천 닫기' : '식단 추천 보기'}
            </button>

            {showDiet && (
              <div className="diet-plan">
                <h3>추천 식단</h3>
                <div className="meal-section">
                  <h4>아침</h4>
                  <ul>
                    {getDietPlan().breakfast.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="meal-section">
                  <h4>점심</h4>
                  <ul>
                    {getDietPlan().lunch.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="meal-section">
                  <h4>저녁</h4>
                  <ul>
                    {getDietPlan().dinner.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="meal-section">
                  <h4>간식</h4>
                  <ul>
                    {getDietPlan().snack.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;