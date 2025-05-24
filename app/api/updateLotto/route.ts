import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

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

export async function GET() {
  try {
    // 최신 당첨번호 가져오기
    const latestData = await fetchLatestLottoNumber();
    if (!latestData || latestData.returnValue !== 'success') {
      throw new Error('Failed to fetch latest lottery data');
    }

    // 기존 데이터 가져오기
    let existingData = await kv.get('lottoHistory') || [];
    
    // 새로운 당첨번호인 경우에만 추가
    if (!existingData.some((data: any) => data.drwNo === latestData.drwNo)) {
      const newData = {
        drwNo: latestData.drwNo,
        drwtNo1: latestData.drwtNo1,
        drwtNo2: latestData.drwtNo2,
        drwtNo3: latestData.drwtNo3,
        drwtNo4: latestData.drwtNo4,
        drwtNo5: latestData.drwtNo5,
        drwtNo6: latestData.drwtNo6,
        bnusNo: latestData.bnusNo,
        drwNoDate: latestData.drwNoDate
      };

      // 새 데이터를 배열 앞에 추가
      existingData = [newData, ...existingData];
      
      // Vercel KV에 저장
      await kv.set('lottoHistory', existingData);
      
      return NextResponse.json({ 
        success: true, 
        message: 'New lottery numbers added',
        data: newData
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'No new lottery numbers to add'
    });
  } catch (error) {
    console.error('Error updating lotto numbers:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update lottery numbers'
    }, { status: 500 });
  }
} 