'use client';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{ marginBottom: '20px' }}>페이지를 찾을 수 없습니다</h1>
      <p style={{ marginBottom: '20px' }}>요청하신 페이지가 존재하지 않습니다.</p>
      <a href="/" style={{
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        borderRadius: '4px',
        textDecoration: 'none'
      }}>
        홈으로 돌아가기
      </a>
    </div>
  );
} 