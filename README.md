# DugnadsHub 🧹

![React Native](https://img.shields.io/badge/React_Native-20232A?logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)

> Organise and join *dugnad* from your phone.

A *dugnad* is a long-standing Norwegian tradition where neighbours and community members pitch in on unpaid, voluntary tasks: cleaning shared areas, fixing things up, or organising local events. DugnadsHub brings that into an app. Browse upcoming dugnader and sign up to help, or create your own and let people join.

Built as the exam project for **Crossplatform Development** (7.5 ECTS) at Kristiania University College. Group project.


## Features

- **Event feed** with the newest dugnader first
- **Filtering** by category (neighbourhood, school, sports, culture, environment and more), status (upcoming, ongoing, past), your own events, events you've joined, and free-text search
- **Create events** with title, description, address, category, number of spots and a task list
- **Photos** from the camera or the gallery, uploaded to Firebase Storage
- **Join / leave** an event and see who's participating
- **Favourites** to bookmark events you care about
- **Comments** on each event, with delete for your own
- **Sign in** with email and password or with Google
- **Profile tab** with your own events

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | React Native 0.81, Expo SDK 54, React 19 |
| Language | TypeScript |
| Navigation | Expo Router (file-based routing), React Navigation tabs |
| Backend | Firebase Authentication, Cloud Firestore, Firebase Storage |
| Native features | expo-camera, expo-image-picker, expo-haptics, Google Sign-In |
| Animation | Reanimated, Gesture Handler |

## Architecture

```
app/          Screens and layouts (Expo Router): auth, tabs, event details
components/   Reusable UI: Post card, filter modal, create-event modal, image picker
api/          Thin data layer around Firebase: auth, posts, comments, images, users
providers/    Auth context that exposes the signed-in user to the whole app
utils/        Filter logic and local storage helpers
types/        Shared TypeScript types (PostData, PostComment, UserData)
styles/       Per-screen style files
```

Screens never talk to Firebase directly. They call functions in `api/`, which keeps the Firebase specifics in one place and makes the screens easier to read. The auth state lives in a React context (`providers/authctx.tsx`) and is persisted with AsyncStorage.

**Firestore collections:** `posts` (events, with participants and comment ids), `comments`, `userFavorites` and a user profile per account.

## Getting started

### Prerequisites

- Node.js 20+
- Xcode (for iOS) and/or Android Studio (for Android)
- A Firebase project

### 1. Install

```bash
git clone https://github.com/breadbakerlevi/dugnadshub.git
cd dugnadshub
npm install
```

### 2. Set up Firebase

The Firebase config isn't included in the repo, so you'll need your own project:

1. Create a project in the [Firebase console](https://console.firebase.google.com/)
2. Turn on **Authentication** (Email/Password and Google), **Firestore** and **Storage**
3. Register an iOS app using the bundle identifier from `app.json`, download `GoogleService-Info.plist` and replace the one in `ios/`
4. Create `firebaseConfig.ts` in the project root:

```ts
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const app = initializeApp({
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
});

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

GoogleSignin.configure({ webClientId: "<your-web-client-id>.apps.googleusercontent.com" });

export const db = getFirestore(app);
const storage = getStorage(app);
export const getStorageRef = (path: string) => ref(storage, path);
export const getDownloadUrl = (path: string) => getDownloadURL(getStorageRef(path));
```

### 3. Run

Google Sign-In uses native code, so this won't run in Expo Go. Use a development build instead:

```bash
npx expo run:ios
# or
npx expo run:android
```
