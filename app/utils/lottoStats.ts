interface LottoNumber {
  number: number;
  frequency: number;
  lastAppearance: number;
  recentFrequency: number;  // 최근 100회 출현 빈도
  winningRate: number;      // 1등 당첨 확률
}

interface LottoResult {
  drwtNo1: number;
  drwtNo2: number;
  drwtNo3: number;
  drwtNo4: number;
  drwtNo5: number;
  drwtNo6: number;
  bnusNo: number;
  drwNo: number;
  drwNoDate?: string;  // 추첨일
}

// 전체 당첨 번호 데이터 (1095회차부터 시작)
const LOTTO_HISTORY: LottoResult[] = [
  { drwNo: 1095, drwtNo1: 12, drwtNo2: 15, drwtNo3: 17, drwtNo4: 24, drwtNo5: 29, drwtNo6: 45, bnusNo: 27 },
  { drwNo: 1094, drwtNo1: 10, drwtNo2: 21, drwtNo3: 22, drwtNo4: 30, drwtNo5: 35, drwtNo6: 42, bnusNo: 2 },
  { drwNo: 1093, drwtNo1: 2, drwtNo2: 4, drwtNo3: 20, drwtNo4: 34, drwtNo5: 35, drwtNo6: 43, bnusNo: 33 },
  { drwNo: 1092, drwtNo1: 3, drwtNo2: 5, drwtNo3: 12, drwtNo4: 13, drwtNo5: 33, drwtNo6: 39, bnusNo: 38 },
  { drwNo: 1091, drwtNo1: 7, drwtNo2: 12, drwtNo3: 15, drwtNo4: 24, drwtNo5: 25, drwtNo6: 43, bnusNo: 13 },
  { drwNo: 1090, drwtNo1: 3, drwtNo2: 8, drwtNo3: 13, drwtNo4: 27, drwtNo5: 32, drwtNo6: 42, bnusNo: 10 },
  { drwNo: 1089, drwtNo1: 6, drwtNo2: 7, drwtNo3: 13, drwtNo4: 15, drwtNo5: 36, drwtNo6: 43, bnusNo: 34 },
  { drwNo: 1088, drwtNo1: 5, drwtNo2: 13, drwtNo3: 14, drwtNo4: 22, drwtNo5: 44, drwtNo6: 45, bnusNo: 33 },
  { drwNo: 1087, drwtNo1: 11, drwtNo2: 13, drwtNo3: 23, drwtNo4: 35, drwtNo5: 43, drwtNo6: 45, bnusNo: 36 },
  { drwNo: 1086, drwtNo1: 1, drwtNo2: 10, drwtNo3: 13, drwtNo4: 16, drwtNo5: 37, drwtNo6: 43, bnusNo: 6 },
  { drwNo: 1085, drwtNo1: 4, drwtNo2: 17, drwtNo3: 30, drwtNo4: 32, drwtNo5: 33, drwtNo6: 34, bnusNo: 15 },
  { drwNo: 1084, drwtNo1: 8, drwtNo2: 13, drwtNo3: 19, drwtNo4: 27, drwtNo5: 40, drwtNo6: 45, bnusNo: 12 },
  { drwNo: 1083, drwtNo1: 13, drwtNo2: 18, drwtNo3: 26, drwtNo4: 31, drwtNo5: 34, drwtNo6: 44, bnusNo: 9 },
  { drwNo: 1082, drwtNo1: 4, drwtNo2: 9, drwtNo3: 23, drwtNo4: 26, drwtNo5: 29, drwtNo6: 33, bnusNo: 35 },
  { drwNo: 1081, drwtNo1: 16, drwtNo2: 19, drwtNo3: 24, drwtNo4: 26, drwtNo5: 28, drwtNo6: 36, bnusNo: 6 },
  { drwNo: 1080, drwtNo1: 8, drwtNo2: 16, drwtNo3: 25, drwtNo4: 30, drwtNo5: 42, drwtNo6: 43, bnusNo: 15 },
  { drwNo: 1079, drwtNo1: 7, drwtNo2: 9, drwtNo3: 10, drwtNo4: 13, drwtNo5: 31, drwtNo6: 35, bnusNo: 24 },
  { drwNo: 1078, drwtNo1: 1, drwtNo2: 3, drwtNo3: 21, drwtNo4: 27, drwtNo5: 29, drwtNo6: 37, bnusNo: 42 },
  { drwNo: 1077, drwtNo1: 9, drwtNo2: 15, drwtNo3: 16, drwtNo4: 21, drwtNo5: 28, drwtNo6: 34, bnusNo: 39 },
  { drwNo: 1076, drwtNo1: 1, drwtNo2: 2, drwtNo3: 3, drwtNo4: 9, drwtNo5: 12, drwtNo6: 43, bnusNo: 18 },
  { drwNo: 1000, drwtNo1: 1, drwtNo2: 4, drwtNo3: 8, drwtNo4: 13, drwtNo5: 37, drwtNo6: 39, bnusNo: 6 },
  { drwNo: 999, drwtNo1: 3, drwtNo2: 4, drwtNo3: 12, drwtNo4: 20, drwtNo5: 24, drwtNo6: 34, bnusNo: 41 },
  { drwNo: 998, drwtNo1: 1, drwtNo2: 4, drwtNo3: 12, drwtNo4: 16, drwtNo5: 18, drwtNo6: 39, bnusNo: 35 },
  { drwNo: 997, drwtNo1: 6, drwtNo2: 9, drwtNo3: 21, drwtNo4: 31, drwtNo5: 32, drwtNo6: 40, bnusNo: 15 },
  { drwNo: 996, drwtNo1: 2, drwtNo2: 9, drwtNo3: 15, drwtNo4: 23, drwtNo5: 34, drwtNo6: 40, bnusNo: 14 },
  { drwNo: 995, drwtNo1: 4, drwtNo2: 7, drwtNo3: 14, drwtNo4: 16, drwtNo5: 24, drwtNo6: 44, bnusNo: 20 },
  { drwNo: 994, drwtNo1: 9, drwtNo2: 15, drwtNo3: 29, drwtNo4: 34, drwtNo5: 37, drwtNo6: 39, bnusNo: 12 },
  { drwNo: 993, drwtNo1: 1, drwtNo2: 12, drwtNo3: 13, drwtNo4: 21, drwtNo5: 32, drwtNo6: 45, bnusNo: 8 },
  { drwNo: 597, drwtNo1: 6, drwtNo2: 7, drwtNo3: 12, drwtNo4: 22, drwtNo5: 26, drwtNo6: 36, bnusNo: 29 },
  { drwNo: 596, drwtNo1: 2, drwtNo2: 8, drwtNo3: 17, drwtNo4: 24, drwtNo5: 29, drwtNo6: 31, bnusNo: 32 },
  { drwNo: 2, drwtNo1: 1, drwtNo2: 3, drwtNo3: 24, drwtNo4: 27, drwtNo5: 39, drwtNo6: 45, bnusNo: 31 },
  { drwNo: 1, drwtNo1: 10, drwtNo2: 23, drwtNo3: 29, drwtNo4: 33, drwtNo5: 37, drwtNo6: 40, bnusNo: 16 }
];

let cachedLottoHistory: LottoResult[] | null = null;
let lastUpdateTime: number = 0;
const UPDATE_INTERVAL = 1000 * 60 * 5; // 5분마다 업데이트 체크

async function fetchLatestLottoNumber(): Promise<LottoResult | null> {
  try {
    // 최신 회차 조회
    const response = await fetch('/api/lotto');
    if (!response.ok) return null;
    
    const data = await response.json();
    if (data.returnValue !== 'success') return null;

    return {
      drwNo: data.drwNo,
      drwtNo1: data.drwtNo1,
      drwtNo2: data.drwtNo2,
      drwtNo3: data.drwtNo3,
      drwtNo4: data.drwtNo4,
      drwtNo5: data.drwtNo5,
      drwtNo6: data.drwtNo6,
      bnusNo: data.bnusNo,
      drwNoDate: data.drwNoDate
    };
  } catch (error) {
    console.error('최신 당첨번호 조회 실패:', error);
    return null;
  }
}

async function updateLottoHistory(): Promise<LottoResult[]> {
  const currentTime = Date.now();
  
  // 캐시된 데이터가 있고 업데이트 간격이 지나지 않았다면 캐시 사용
  if (cachedLottoHistory && (currentTime - lastUpdateTime) < UPDATE_INTERVAL) {
    return cachedLottoHistory;
  }

  try {
    const latestNumber = await fetchLatestLottoNumber();
    if (!latestNumber) {
      return LOTTO_HISTORY;
    }

    // 기존 데이터와 최신 데이터 병합
    const existingLatest = LOTTO_HISTORY[0].drwNo;
    const newNumbers: LottoResult[] = [];

    // 누락된 회차 데이터 수집
    for (let i = existingLatest + 1; i <= latestNumber.drwNo; i++) {
      try {
        const response = await fetch(`/api/lotto?drwNo=${i}`);
        if (!response.ok) continue;
        
        const data = await response.json();
        if (data.returnValue !== 'success') continue;

        newNumbers.push({
          drwNo: data.drwNo,
          drwtNo1: data.drwtNo1,
          drwtNo2: data.drwtNo2,
          drwtNo3: data.drwtNo3,
          drwtNo4: data.drwtNo4,
          drwtNo5: data.drwtNo5,
          drwtNo6: data.drwtNo6,
          bnusNo: data.bnusNo,
          drwNoDate: data.drwNoDate
        });

        // API 호출 간격 조절
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`회차 ${i} 조회 실패:`, error);
      }
    }

    // 새로운 데이터와 기존 데이터 병합
    cachedLottoHistory = [...newNumbers, ...LOTTO_HISTORY];
    lastUpdateTime = currentTime;

    return cachedLottoHistory;
  } catch (error) {
    console.error('당첨번호 업데이트 실패:', error);
    return LOTTO_HISTORY;
  }
}

export async function fetchLottoHistory(): Promise<LottoResult[]> {
  const currentTime = Date.now();
  
  // 캐시된 데이터가 있고 업데이트 간격이 지나지 않았다면 캐시 사용
  if (cachedLottoHistory && (currentTime - lastUpdateTime) < UPDATE_INTERVAL) {
    return cachedLottoHistory;
  }

  try {
    const response = await fetch('/api/lottoHistory');
    if (!response.ok) {
      console.log('API 호출 실패, 기본 데이터 사용');
      return LOTTO_HISTORY;
    }
    
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      console.log('유효한 데이터 없음, 기본 데이터 사용');
      return LOTTO_HISTORY;
    }

    cachedLottoHistory = data;
    lastUpdateTime = currentTime;
    return data;
  } catch (error) {
    console.error('Error fetching lottery history:', error);
    return LOTTO_HISTORY;
  }
}

export function analyzeFrequency(history: LottoResult[]): LottoNumber[] {
  const frequency: { [key: number]: number } = {};
  const recentFrequency: { [key: number]: number } = {};
  const lastAppearance: { [key: number]: number } = {};
  const winningCombos: Set<string> = new Set();
  
  // 1부터 45까지의 번호 초기화
  for (let i = 1; i <= 45; i++) {
    frequency[i] = 0;
    recentFrequency[i] = 0;
    lastAppearance[i] = history.length;
  }

  // 전체 기간 분석
  history.forEach((draw, index) => {
    const numbers = [draw.drwtNo1, draw.drwtNo2, draw.drwtNo3, draw.drwtNo4, draw.drwtNo5, draw.drwtNo6];
    winningCombos.add(numbers.join(','));
    
    numbers.forEach(num => {
      frequency[num]++;
      if (lastAppearance[num] === history.length) {
        lastAppearance[num] = index;
      }
    });
  });

  // 최근 100회 분석
  const recent100 = history.slice(0, 100);
  recent100.forEach(draw => {
    const numbers = [draw.drwtNo1, draw.drwtNo2, draw.drwtNo3, draw.drwtNo4, draw.drwtNo5, draw.drwtNo6];
    numbers.forEach(num => {
      recentFrequency[num]++;
    });
  });

  // 분석 결과 생성
  const stats: LottoNumber[] = [];
  const totalDraws = history.length;
  const totalCombinations = 8145060; // 45C6

  for (let i = 1; i <= 45; i++) {
    const overallFrequency = frequency[i] / totalDraws;
    const recent100Frequency = recentFrequency[i] / 100;
    
    stats.push({
      number: i,
      frequency: frequency[i],
      lastAppearance: lastAppearance[i],
      recentFrequency: recentFrequency[i],
      winningRate: overallFrequency
    });
  }

  return stats;
}

export function generateWeightedNumbers(stats: LottoNumber[]): number[] {
  const numbers: number[] = [];
  const totalDraws = Math.max(...stats.map(s => s.frequency));
  
  // 가중치 계산 개선
  const weights = stats.map(stat => ({
    number: stat.number,
    weight: (
      (stat.frequency / totalDraws) * 0.35 + // 전체 출현 빈도 (35% 영향)
      (stat.recentFrequency / 100) * 0.25 + // 최근 100회 출현 빈도 (25% 영향)
      (1 / (stat.lastAppearance + 1)) * 0.2 + // 최근 출현 여부 (20% 영향)
      Math.random() * 0.2 // 랜덤성 (20% 영향)
    )
  }));

  // 연속된 번호와 간격이 좁은 번호 제한
  let lastSelected = -1;
  let selectedCount = 0;

  while (numbers.length < 6) {
    const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const weight of weights) {
      if (!numbers.includes(weight.number) && 
          (lastSelected === -1 || Math.abs(weight.number - lastSelected) > 2)) {
        random -= weight.weight;
        if (random <= 0) {
          numbers.push(weight.number);
          lastSelected = weight.number;
          selectedCount++;
          break;
        }
      }
    }

    // 무한 루프 방지 및 번호 간격 조정
    if (selectedCount === numbers.length) {
      const remaining = Array.from({length: 45}, (_, i) => i + 1)
        .filter(n => !numbers.includes(n) && 
                    (lastSelected === -1 || Math.abs(n - lastSelected) > 2) &&
                    !numbers.some(selected => Math.abs(n - selected) <= 2));
      
      if (remaining.length > 0) {
        const selected = remaining[Math.floor(Math.random() * remaining.length)];
        numbers.push(selected);
        lastSelected = selected;
      } else {
        lastSelected = -1; // 제한 조건 초기화
        selectedCount = numbers.length;
      }
    }
  }

  return numbers.sort((a, b) => a - b);
} 