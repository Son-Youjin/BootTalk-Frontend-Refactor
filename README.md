# BootTalk-Refactor

기존 팀 프로젝트인 BootTalk를 다시 분석하고,
**모바일 퍼스트 관점에서 UI/UX와 코드 구조를 개선한
개인 프론트엔드 리팩터링 프로젝트입니다.**

기존 기능을 유지하면서 반응형 UI, 웹 접근성,
성능, 인증 상태에 따른 UI/UX를 중심으로 개선했습니다.
<br/>
<br/>

## 목차

### [1. 프로젝트 기간](#프로젝트-기간)

### [2. 기술스텍](#기술스텍)

### [3. 주요 개선 기능](#주요-개선-기능)

### [4. 트러블 슈팅](#트러블-슈팅)

### [5. 프로젝트 아키텍처](#프로젝트-아키텍처)

<br/>
<br/>

## 프로젝트 기간

📍 2026.01.02 ~ 2026.09.13
<br/>
<br/>

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

<br/>
<br/>

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
      <img src="https://github.com/user-attachments/assets/2b88e14b-c2dc-435f-84dc-88d2c8105ca7" width="280" alt="필터링">
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

<br/>
<br/>

## 주요 개선 사항

- 모바일 퍼스트 기반 반응형 UI 및 페이지별 레이아웃 개선
- 반복되는 UI를 공통 컴포넌트로 분리하여 코드 재사용성 개선
- 로그인 상태에 따른 UI 및 페이지 접근 제어
- 필터, 검색, 모달, 드로어 등 사용자 인터랙션 및 UX 개선
- Dynamic Import를 활용한 초기 로딩 성능 최적화

<br/>
<br/>

## 트러블 슈팅

### 1. 필터링 조건 변경 시 데이터가 정상적으로 갱신되지 않던 문제

#### **문제 상황**

지역, 기간, 평점 등의 필터 조건을 변경했을 때 화면의 필터 선택 상태는 정상적으로 변경되지만, 부트캠프 목록이 선택한 조건에 맞게 갱신되지 않는 문제가 발생했습니다.

특히 기존에 조회된 데이터가 화면에 그대로 남아 있거나, 필터를 변경해도 이전 요청의 결과가 유지되어 사용자가 선택한 조건과 실제 목록이 일치하지 않는 경우가 있었습니다.

<br/>

#### **원인 분석**

- 필터 상태가 변경되어도 React Query에서 새로운 요청으로 인식할 수 있는 구조가 제대로 구성되지 않음.

- 기존 필터 조건으로 조회된 데이터가 캐시에 남아 있어 새로운 필터 조건으로 데이터를 다시 가져오지 않는 문제가 발생.

- 필터 변경과 페이지네이션 상태가 함께 사용되면서 기존 페이지 데이터가 새로운 필터 조건과 섞일 가능성이 높음.

- 특히 필터가 변경되었을 때, 이전 목록과 페이지 상태를 초기화하지 않아 새로운 조건의 첫 페이지부터 조회되지 않는 문제가 발생.

<br/>

#### **해결 방법**

- React Query의 `queryKey`에 필터 상태를 포함하여 필터 조건이 변경될 때 새로운 쿼리로 인식하도록 수정했습니다.

```tsx
useQuery({
  queryKey: ["bootcamps", filters],
  queryFn: () => getBootcamps(filters),
});
```

필터 조건이 변경되면 이전 필터의 데이터를 그대로 사용하는 것이 아니라 변경된 filters를 기준으로 새로운 데이터를 요청하도록 구성했습니다.

또한 필터 변경 시 페이지 번호를 첫 페이지로 초기화하여 이전 조건에서 사용하던 페이지 정보가 새로운 필터 조건에 영향을 주지 않도록 처리했습니다.

```tsx
const handleFilterChange = (newFilters: Filters) => {
  setFilters(newFilters);
  setPage(0);
};
```

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

<br/>

#### 결과

필터 조건을 변경할 때마다 변경된 조건을 기준으로 데이터를 다시 조회하도록 개선했습니다.

기존 필터의 조회 결과와 새로운 필터의 조회 결과가 섞이지 않도록 페이지 상태와 데이터 조회 기준을 함께 관리하여, 사용자가 선택한 필터 조건과 실제 목록이 일치하도록 개선했습니다.

  <br/>

### 2. 무한 스크롤에서 API가 과도하게 호출되던 문제

#### **문제 상황**

사용자가 목록을 스크롤할 때 다음 데이터를 불러오는 API가 불필요하게 여러 번 호출되는 문제가 발생했습니다.

마지막 목록 요소가 화면에 진입할 때마다 추가 데이터를 요청하면서 동일한 페이지에 대한 API 요청이 반복되거나, 아직 이전 요청이 완료되지 않은 상태에서 다음 요청이 발생하는 경우가 있었습니다.

<br/>

#### **원인 분석**

- 무한 스크롤의 다음 페이지 요청 조건이 명확하게 제한되어 있지 않음.
- `IntersectionObserver`가 마지막 요소를 여러 번 감지하면서 동일한 요청이 반복될 가능성.
- 이전 페이지의 요청이 완료되기 전에 다시 다음 페이지 요청이 발생 가능성.
- 더 이상 불러올 데이터가 없는 상황에서도 마지막 요소가 감지되면 API 요청을 시도하는 문제.

<br/>

#### **해결 방법**

다음 페이지를 요청하기 전에 현재 추가 요청이 진행 중인지와 다음 페이지가 존재하는지를 확인하도록 조건을 추가했습니다.

```tsx
if (hasNextPage && !isFetchingNextPage) {
  fetchNextPage();
}
```

`hasNextPage`를 통해 더 불러올 데이터가 존재하는 경우에만 다음 페이지를 요청하고, `isFetchingNextPage`를 사용하여 이미 다음 페이지를 요청하고 있는 동안에는 동일한 요청이 다시 발생하지 않도록 처리했습니다.

또한 페이지 단위로 데이터를 받아 기존 목록에 이어 붙이는 방식으로 구성하여, 새로운 페이지를 불러올 때 기존 목록을 다시 요청하거나 초기화하지 않도록 했습니다.

```tsx
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
  useInfiniteQuery({
    queryKey: ["bootcamps", filters],
    queryFn: ({ pageParam }) =>
      getBootcamps({
        page: pageParam,
        ...filters,
      }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
```

마지막으로 무한 스크롤의 감지 영역에서는 다음 페이지가 존재하고 현재 요청 중인 페이지가 없을 때만 `fetchNextPage`가 실행되도록 요청 조건을 제한했습니다.

<br/>

#### 결과

동일한 페이지에 대한 중복 API 요청을 방지하고, 실제로 추가 데이터가 존재하는 경우에만 다음 페이지를 요청하도록 개선했습니다.

이를 통해 무한 스크롤을 유지하면서도 불필요한 API 호출을 줄이고, 스크롤 위치에 따라 필요한 데이터만 순차적으로 요청하는 구조로 개선했습니다.

<br/>
<br/>

## 프로젝트 아키텍처

![image](https://github.com/user-attachments/assets/c83fb717-a8f3-459e-bc82-3167317f2607)
