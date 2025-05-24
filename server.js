const express = require('express');
const next = require('next');
const cron = require('node-cron');
const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;
const LOTTO_DATA_PATH = path.join(__dirname, 'data', 'lottoHistory.json');

// 최신 당첨번호 가져오기
async function fetchLatestLottoNumber() {
  try {
    const response = await fetch('https://www.dhlottery.co.kr/common.do?method=getLottoNumber', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch lottery data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching latest lottery number:', error);
    return null;
  }
}

// 로또 데이터 저장
async function saveLottoData(data) {
  try {
    await fs.mkdir(path.dirname(LOTTO_DATA_PATH), { recursive: true });
    await fs.writeFile(LOTTO_DATA_PATH, JSON.stringify(data, null, 2));
    console.log('Lotto data saved successfully');
  } catch (error) {
    console.error('Error saving lotto data:', error);
  }
}

// 로또 데이터 로드
async function loadLottoData() {
  try {
    const data = await fs.readFile(LOTTO_DATA_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading lotto data:', error);
    return [];
  }
}

// 당첨번호 업데이트
async function updateLottoNumbers() {
  console.log('Updating lotto numbers...');
  try {
    const latestData = await fetchLatestLottoNumber();
    if (!latestData || latestData.returnValue !== 'success') {
      throw new Error('Failed to fetch latest lottery data');
    }

    const existingData = await loadLottoData();
    const latestDrwNo = latestData.drwNo;
    
    // 기존 데이터에 없는 회차만 추가
    if (!existingData.some(data => data.drwNo === latestDrwNo)) {
      existingData.unshift({
        drwNo: latestData.drwNo,
        drwtNo1: latestData.drwtNo1,
        drwtNo2: latestData.drwtNo2,
        drwtNo3: latestData.drwtNo3,
        drwtNo4: latestData.drwtNo4,
        drwtNo5: latestData.drwtNo5,
        drwtNo6: latestData.drwtNo6,
        bnusNo: latestData.bnusNo,
        drwNoDate: latestData.drwNoDate
      });

      await saveLottoData(existingData);
      console.log('New lottery numbers added:', latestDrwNo);
    }
  } catch (error) {
    console.error('Error updating lotto numbers:', error);
  }
}

app.prepare().then(() => {
  const server = express();

  // API 엔드포인트 추가
  server.get('/api/lottoHistory', async (req, res) => {
    try {
      const data = await loadLottoData();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to load lotto history' });
    }
  });

  // Next.js 요청 처리
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
    
    // 초기 데이터 로드
    updateLottoNumbers();

    // 매주 토요일 밤 10시에 업데이트
    cron.schedule('0 22 * * 6', () => {
      updateLottoNumbers();
    });
  });
}); 