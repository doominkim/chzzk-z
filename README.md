# 치지직(Chzzk) 비공식 API 라이브러리

![Generic badge](https://img.shields.io/badge/npm-v0.1.1-green.svg?logo=npm)
![Generic badge](https://img.shields.io/badge/License-MIT-blue.svg)
![Generic badge](https://img.shields.io/badge/nodejs-^18.x-blue.svg?logo=node.js)
![Generic badge](https://img.shields.io/badge/PRs-welcome🙏-blue.svg)
<br><br>
# Chzzk-Z

# 2024.12.20 일부로 공식 API가 생성되었으므로 더 이상 업데이트되지 않습니다.

**치지직(Chzzk) 비공식 API 라이브러리**

네이버 치지직 기반의 챗봇, 게임 클라이언트 개발을 위한 API 모듈입니다.  
공식 API가 발표되면 본 라이브러리 업데이트는 중단됩니다.

---

## 주요 기능
- 유저 로그인 및 유저 정보 조회
- 채팅방 입장 / 퇴장 / 채팅 전송
- 채널 검색 및 채널 상세 정보 조회
- WebSocket 연결 (Streaming Type)
---

## 환경
- Node.js 18 이상

---

## 설치
```bash
npm install chzzk-z

import * as chzzk from "chzzk-z";

// ChzzkConnect 객체 생성
const chzzkModule = new chzzk.ChzzkModule();

/** 채널 조회 **/

// 키워드로 채널 찾기
const channels = await chzzkModule.channel.find("침착맨");

// 채널 ID 가져오기
const channelId = channels["data"][0]?.channel?.channelId;

// 채널 ID로 채널 상세 조회
const channel = await chzzkModule.channel.findById(channelId);

// 채널 상태 조회
const status = await chzzkModule.live.findStatusByChannelId(channelId);

// 채널 세부 정보 조회
const detail = await chzzkModule.live.findDetailByChannelId(channelId);

// 채널 채팅용 Access Token 조회
const token = await chzzkModule.chat.findAccessToken(status.chatChannelId);

/** 유저 **/

// 로그인
await chzzkModule.user.login(YOUR_NID_AUTH, YOUR_NID_SESSION);

// 네이버 계정 정보 조회
const user = await chzzkModule.user.status();
```

## 주의사항
⚠️ 현재 매우 불안정합니다.
⚠️ 버전 1.0.0 미만에서는 실제 서비스에 사용하지 마세요.
