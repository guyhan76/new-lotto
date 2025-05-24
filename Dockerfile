# 기본 Node.js 이미지 사용
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 앱 빌드
RUN npm run build

# 포트 설정
EXPOSE 3000

# 실행 명령
CMD ["npm", "start"] 