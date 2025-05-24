'use client';

import React from 'react';
import { fetchLottoHistory, analyzeFrequency, generateWeightedNumbers } from '../utils/lottoStats';

interface LottoSet {
  id: number;
  numbers: number[];
  isWeighted?: boolean;
}

const LottoGenerator = () => {
  const [numberSets, setNumberSets] = React.useState<LottoSet[]>([]);
  const [counter, setCounter] = React.useState<number>(0);
  const [lottoStats, setLottoStats] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

  React.useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      setError('');
      try {
        const history = await fetchLottoHistory();
        if (history && history.length > 0) {
          setLottoStats(history);
        } else {
          setError('통계 데이터를 가져오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('통계 데이터를 가져오는데 실패했습니다:', error);
        setError('통계 데이터를 가져오는데 실패했습니다.');
      }
      setIsLoading(false);
    };

    fetchStats();
  }, []);

  const generateRandomNumbers = () => {
    const newNumbers: number[] = [];
    while (newNumbers.length < 6) {
      const num = Math.floor(Math.random() * 45) + 1;
      if (!newNumbers.includes(num)) {
        newNumbers.push(num);
      }
    }
    
    const newSet: LottoSet = {
      id: counter,
      numbers: newNumbers.sort((a, b) => a - b),
      isWeighted: false
    };
    
    setCounter((prev: number) => prev + 1);
    setNumberSets((prev: LottoSet[]) => [newSet, ...prev].slice(0, 5));
  };

  const generateStatisticalNumbers = () => {
    if (lottoStats.length === 0) {
      alert('통계 데이터를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    try {
      const stats = analyzeFrequency(lottoStats);
      const newNumbers = generateWeightedNumbers(stats);
      
      const newSet: LottoSet = {
        id: counter,
        numbers: newNumbers,
        isWeighted: true
      };
      
      setCounter((prev: number) => prev + 1);
      setNumberSets((prev: LottoSet[]) => [newSet, ...prev].slice(0, 5));
    } catch (error) {
      console.error('번호 생성 중 오류가 발생했습니다:', error);
      alert('번호 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          로또 번호 생성기
        </h1>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '20px'
        }}>
          <button
            onClick={generateRandomNumbers}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            랜덤 번호
          </button>
          <button
            onClick={generateStatisticalNumbers}
            disabled={isLoading}
            style={{
              backgroundColor: isLoading ? '#cccccc' : '#2196F3',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '16px'
            }}
          >
            {isLoading ? '로딩중...' : '통계 기반 번호'}
          </button>
        </div>
        {numberSets.map((set: LottoSet) => (
          <div
            key={set.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '20px',
              padding: '10px',
              backgroundColor: set.id === numberSets[0]?.id ? '#f0f8ff' : 'transparent',
              borderRadius: '8px'
            }}
          >
            <div style={{
              marginBottom: '5px',
              color: '#666',
              fontSize: '14px'
            }}>
              {set.id === numberSets[0]?.id ? 
                `최신 번호 (${set.isWeighted ? '통계 기반' : '랜덤'})` : 
                `${numberSets.findIndex((s: LottoSet) => s.id === set.id) + 1}번째 전 번호`}
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              flexWrap: 'wrap'
            }}>
              {set.numbers.map((number: number, index: number) => (
                <div
                  key={index}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: number <= 10 ? '#FFA07A' :
                                   number <= 20 ? '#98FB98' :
                                   number <= 30 ? '#87CEEB' :
                                   number <= 40 ? '#DDA0DD' : '#FFB6C1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '18px'
                  }}
                >
                  {number}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LottoGenerator;