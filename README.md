# Karinderya

A mobile application built with React Native using the Expo framework.

## Prerequisites

- **Node.js** (v14 or above)  
- **npm** (v6 or above) or **Yarn**  
- **Expo CLI** (install globally):

```bash
npm install -g expo-cli
```

## Installation
- Clone the repository:
```bash
git clone https://github.com/adrianojec/karinderya.git
cd karinderya
```

- Install dependencies:

```bash
npm install
```
or
```bash
yarn install
```

## Running the App
- Start the Expo development server

```bash
npm run start
```
This will open the Expo DevTools in your browser.

- Run on Android device/emulator

```bash
npm run android
```

- Run on iOS simulator (macOS only)

```bash
npm run ios
```

## Running the JSON Server
- Start REST API server

```bash
npx json-server src/db/db.json
```
