# BootTalk-Refactor

기존 팀 프로젝트인 BootTalk를 다시 분석하고,
**모바일 퍼스트 관점에서 UI/UX와 코드 구조를 개선한
개인 프론트엔드 리팩터링 프로젝트입니다.**

기존 기능을 유지하면서 반응형 UI, 웹 접근성,
성능, 인증 상태에 따른 UI/UX를 중심으로 개선했습니다.
<br><br>

## 목차

### [1. 프로젝트 기간](#프로젝트-기간)

### [2. 기술스텍](#기술스텍)

### [3. 주요 개선 기능](#주요-개선-기능)

### [4. 트러블 슈팅](#트러블-슈팅)

### [5. 프로젝트 아키텍처](#프로젝트-아키텍처)

<br><br>

## 프로젝트 기간

📍 2026.01.02 ~ 2026.09.13
<br><br>
<br><br>

## 기술스텍

기존 BootTalk에서 사용한 기술스택을 기반으로 리펙토링을 진행했습니다.

### Front-End

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-4353FF?style=for-the-badge&logo=socket.io&logoColor=white)
![STOMP](https://img.shields.io/badge/STOMP-black?style=for-the-badge&logo=apache-activemq&logoColor=white)
![SSE](https://img.shields.io/badge/SSE-008000?style=for-the-badge)
![DaisyUI](https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)
![MSW](https://img.shields.io/badge/MSW-FF6A33?style=for-the-badge)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

### Collaboration Tool

![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)

<br><br>

## 주요 기능

<table>
  <tr>
    <th align="center">✨ 검색</th>
    <th align="center">✨ 필터링</th>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/f9ed83f8-4be0-4ca1-8458-10669209ce2d" width="280" alt="검색"><br />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/bb791298-a58a-4985-8c0c-2e1c924dfd31" width="280" alt="필터링">
    </td>
  </tr>
</table>

<table>
  <tr>
    <th align="center">✨ 멘토 찾기</th>
    <th align="center">✨ 커피챗 신청</th>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/82a78692-946d-44cd-b7f0-2b63c8dbbc08" width="280" alt="멘토 찾기"><br />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/7f82038a-1480-4c03-99a6-27b908f48a8c" width="280" alt="커피챗 신청"><br />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th align="center">✨ 내 커피챗</th>
    <th align="center">✨ 채팅</th>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/4b053b29-d696-499c-8262-dce83c7797f7" width="280" alt="커피챗 승인"><br />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/91333a91-9761-4448-a937-35303782f573" width="280" alt="채팅"><br />
    </td>
  </tr>
</table>

<br><br>

## 주요 개선 사항

- 모바일 퍼스트 기반 반응형 UI 개선
- 컴포넌트 구조 및 코드 재사용성 개선
- 로그인 상태에 따른 UI/접근 제어
- 웹 접근성 개선
- Dynamic Import를 활용한 성능 최적화
  <br><br>
  <br><br>

## 트러블 슈팅

### 1. 필터 선택값이 API에 반영되지 않던 문제

#### **문제 상황**

필터 버튼 클릭 시 부트캠프 리스트에 반영되지 않고, API 요청 URL에 필터 파라미터가 누락되거나 잘못된 값으로 전달됨.

#### **원인 분석**

- `queryKey`에 `filters`가 정상적으로 반영되지 않거나,
- `queryFn` 내부에서 필터 값을 쿼리스트링으로 변환하는 과정에서 오류 발생.
- 특히 `react-query`의 캐싱 전략과 충돌하여 의도한 fetch가 일어나지 않음.

#### **해결 방법**

- `filters` 객체를 순회하며 `URLSearchParams`에 key-value 쌍을 append하는 방식으로 수정

```tsx
const queryParams = new URLSearchParams({
  page: page.toString(),
  size: PAGE_SIZE.toString(),
});

Object.entries(filters).forEach(([key, value]) => {
  if (key && value) {
    const transformedValue = transformFilterValue(key, value);
    queryParams.append(key, transformedValue);
  }
});
```

- 각 필터 값은 `transformFilterValue` 함수로 백엔드 요구 포맷에 맞게 변환

```tsx
const transformFilterValue = (key: string, value: string): string => {
  if (key === "duration") {
    const valueMap: Record<string, string> = {
      "4주 미만": "1",
      "4~12주": "2",
      "12주 이상": "3",
    };
    return valueMap[value] || value;
  }

  if (key === "minRating") {
    const valueMap: Record<string, string> = {
      "2점 대": "2",
      "3점 대": "3",
      "4점 대": "4",
    };
    return valueMap[value] || value;
  }

  return value;
};
```

- 최종적으로 `?page=0&size=10&region=서울&duration=2&minRating=3`처럼 여러 필터가 적용된 쿼리스트링을 동적으로 생성하여 정확한 API 요청이 가능하게 개선.
  <br><br>

### 2. 무한 요청

#### **문제 상황**

리뷰 페이지에서 무한 스크롤을 구현했지만, 실제로는 페이지 진입 직후 스크롤 여부와 상관없이 서버에 계속 요청을 보내는 무한 요청 현상이 발생

#### **원인 분석**

- `IntersectionObserver`가 잘못된 위치에 적용되어 있거나, `observerRef`가 DOM에 제대로 연결되지 않아 렌더링되자마자 바로 교차 상태로 판단됨
- 또는 `getNextPageParam` 로직에서 `last` 값 또는 `pageable.pageNumber` 처리 미흡으로 인해 다음 페이지 조건이 무조건 true가 됨

#### **해결 방법**

```tsx
getNextPageParam: (lastPage) =>
  lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
```

- `IntersectionObserver`는 `observer.observe(target)` 시점을 마지막 요소 렌더 이후로 조정
- `observerRef`가 페이지 로드와 함께 관찰을 시작하지 않도록 `useEffect`에서 `data?.pages.length`를 의존성으로 설정
- 리뷰 요청 단위를 `size=10` → `size=20`으로 조정하여 초기 과요청 문제 감소
  <br><br>

### 3. 웹소켓 무한 입장

#### **문제 상황**

웹소켓 무한 입장 현상 발생. `useWebSocket` 훅 내부에서 `client.publish({ destination: '/app/chat/enter' })`가 반복 실행되며 서버에 과도한 요청이 발생.

```tsx
// ChatRoomPage 컴포넌트 내부

const { sendMessage, connected } = useWebSocket({
  roomUuid: selectedChat.roomUuid,
  onMessage: (msg) => {
    setMessages((prev) => [...prev, msg]);
  },
  isActive: selectedChat.isActive,
});
```

```tsx
// useWebSocket 내부 구조 (초기 문제 버전)

useEffect(() => {
  // ...
}, [roomUuid, onMessage, socketUrl, isActive]);
```

#### **원인 분석**

- `useWebSocket` 훅 내부의 `useEffect` 의존성 배열에 `onMessage`가 포함되어 있음
- `onMessage`는 렌더링마다 새로 정의되므로 참조값이 바뀌고그 결과 `useEffect`가 반복 실행되며 소켓 연결이 무한 재생성됨 → 무한 입장

#### **해결 방법**

1. onMessageRef 사용

```tsx
const onMessageRef = useRef(onMessage);

useEffect(() => {
  onMessageRef.current = onMessage;
}, [onMessage]);
```

- 이후 `client.subscribe`에서 직접 `onMessageRef.current`를 사용함으로써, `useEffect` 의존성 배열에서 `onMessage`를 제거함.
- 이렇게 함으로써 `onMessage` 함수의 참조 변경이 `useEffect` 재실행에 영향을 주지 않도록 처리함.

2. 의존성 배열에서 onMessage 제거

```tsx
useEffect(() => {
  // websocket init and subscribe
}, [roomUuid, socketUrl, isActive]); // onMessage 제거됨
```

- 이 구조는 메시지 핸들러가 동적으로 바뀔 수 있으나, useRef를 통해 현재 핸들러를 항상 최신 상태로 유지하면서 소켓 재연결 없이 콜백만 갱신하는 구조를 갖게 됨

<br><br>

## 프로젝트 아키텍처

![image](https://github.com/user-attachments/assets/c83fb717-a8f3-459e-bc82-3167317f2607)
