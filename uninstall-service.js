const Service = require('node-windows').Service;
const path = require('path');

const svc = new Service({
  name: 'LottoGeneratorService',
  description: 'Lotto Generator Web Application Service',
  script: path.join(__dirname, 'server.js')
});

svc.on('uninstall', function() {
  console.log('서비스가 성공적으로 제거되었습니다.');
});

svc.on('error', function(error) {
  console.error('서비스 제거 중 오류가 발생했습니다:', error);
});

svc.uninstall(); 