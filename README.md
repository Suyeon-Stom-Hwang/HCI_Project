# HCI 2024 Team project @SNU - AI Tutor service for English learning

## Introduction
SNU 2024 인간컴퓨터상호작용 과목에 대한 4 Team의 Team project 구현물에 대한 레포지토리입니다.

## Developer environment
이 프로젝트는 다음과 같은 환경에서 개발했습니다.

- Language: TypeScript
- Library & Framework : React / Vite

## Getting start
### Prerequisite
#### Node.js & NPM
React 및 Vite 프레임워크 사용을 위하여 Node.js version 18 이상이 권장됩니다.
Node.js 설치 및 NPM 패키지 설치에 대한 자세한 내용은 https://nodejs.org/en 를 참고바랍니다.

#### Open AI
GPT 모델을 사용하기 위하여 OpenAI의 API key가 필요합니다.
API key 획득에 대한 자세한 내용은 https://platform.openai.com/docs/quickstart 를 참고바랍니다.

#### Web Browser
최신 버전의 Chrome 및 Edge 브라우저 사용을 권장합니다.

### Install & Run
#### Clone git
Git repository를 clone 하여 소스코드를 다운로드합니다.
```bash
git clone https://github.com/Suyeon-Stom-Hwang/HCI_Project.git
cd HCI_Project
```

#### Set API Key
프로젝트 최상단에 `.env` 파일을 생성하고 다음과 같이 API key를 작성합니다.
이 때 `.env` 파일이 없거나 유효한 API key가 입력되어 있지 않다면 시스템이 정상적으로 동작하지 않습니다.

```
VITE_OPENAI_API_KEY="your api key"
```

#### Run system
아래 명령을 입력하여 필수 패키지 설치 및 시스템을 실행합니다.

```bash
npm install
npm run dev
```

`npm run dev`가 성공하였다면 화면 상에 표시되는 `Local` 주소로 접속하여 시스템 사용을 시작합니다.
```bash
  VITE v5.2.12  ready in 390 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```
