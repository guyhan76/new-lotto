import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function GET() {
  try {
    // Vercel KV에서 데이터 가져오기
    const lottoHistory = await kv.get('lottoHistory');
    
    if (!lottoHistory) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(lottoHistory, { status: 200 });
  } catch (error) {
    console.error('Error fetching lottery history:', error);
    return NextResponse.json({ error: 'Failed to fetch lottery history' }, { status: 500 });
  }
} 