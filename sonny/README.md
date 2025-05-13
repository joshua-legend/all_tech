# worker_processes 1;

# # 처리할 워커 프로세스 수를 지정

# events {

# worker_connections 1024;

# # 각 워커가 동시에 처리할 수 있는 최대 연결 수

# }

# http {

# include mime.types;

# # 파일 확장자별 MIME 타입 매핑 파일 로드

# default_type application/octet-stream;

# # 알 수 없는 파일에 대한 기본 MIME 타입

# sendfile on;

# # 효율적인 파일 전송을 위해 sendfile 사용

# keepalive_timeout 65;

# # 연결을 유지할 시간(초)

# limit_req_zone $binary_remote_addr zone=teemo:10m rate=1r/s;

# # IP별 초당 1요청(rate limiting) 구역

# upstream siu {

# server siu:3000;

# server siu2:3001;

# # siu 서비스에 대한 로드 밸런싱

# }

# upstream sonny {

# server sonny:3002;

# # sonny 서비스 단일 서버

# }

# #──────────────────────────────────

# # HTTP (80) — ACME 챌린지 대응 및 HTTPS 리다이렉션

# #──────────────────────────────────

# server {

# listen 80;

# server_name joshua-legend.p-e.kr;

# location /.well-known/acme-challenge/ {

# root /var/www/certbot;

# # Certbot HTTP-01 챌린지 웹루트

# }

# # 모든 HTTP 요청을 HTTPS로 영구 리다이렉트

# return 301 https://$host$request_uri;

# }

# #──────────────────────────────────

# # HTTPS (443) — SSL 종료 및 Proxy Pass

# #──────────────────────────────────

# server {

# listen 443 ssl http2;

# server_name joshua-legend.p-e.kr;

# # SSL 인증서 파일 경로 (호스트에서 바인드 마운트된 디렉터리)

# ssl_certificate /etc/letsencrypt/live/joshua-legend.p-e.kr/fullchain.pem;

# ssl_certificate_key /etc/letsencrypt/live/joshua-legend.p-e.kr/privkey.pem;

# ssl_protocols TLSv1.2 TLSv1.3;

# ssl_ciphers HIGH:!aNULL:!MD5;

# add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

# # HSTS 설정: 1년간 HTTPS만 사용

# # — /siu/ 경로는 siu upstream으로

# location /siu/ {

# proxy_pass http://siu/;

# proxy_set_header Host $host;

# proxy_set_header X-Real-IP $remote_addr;

# }

# # — /sonny/ 경로는 sonny upstream으로

# location /sonny/ {

# proxy_pass http://sonny/;

# proxy_set_header Host $host;

# proxy_set_header X-Real-IP $remote_addr;

# }

# # 에러 페이지 설정

# error_page 500 502 503 504 /50x.html;

# location = /50x.html {

# root html;

# }

# }

# }

#───────────────────────────────────────

# nginx.conf (전체 구성)

#───────────────────────────────────────
