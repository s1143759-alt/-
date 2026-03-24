import { createBrowserRouter } from "react-router";
import React from 'react';
import { SplashScreen } from "./components/SplashScreen";
import { MainLayout } from "./components/MainLayout";
import { HomeTab } from "./components/HomeTab";
import { PracticeTab } from "./components/PracticeTab";
import { SwipeMode } from "./components/SwipeMode";
import { ReadModeTOC } from "./components/ReadModeTOC";
import { ReadModeDetail } from "./components/ReadModeDetail";
import { PlaceholderTab } from "./components/PlaceholderTab";
import { QuizPage } from "./components/QuizPage";
import { QuizResult } from "./components/QuizResult";
import { ThemeCategoryPage } from "./components/ThemeCategoryPage";
import { CommunityTab } from "./components/CommunityTab";
import { ProfileTab } from "./components/ProfileTab";
import { MallPage } from "./components/MallPage";
import { SettingsPage } from "./components/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SplashScreen,
  },
  {
    path: "/main",
    Component: MainLayout,
    children: [
      { index: true, Component: HomeTab },
      { path: "practice", Component: PracticeTab },
      { path: "community", Component: CommunityTab },
      { path: "profile", Component: ProfileTab },
    ],
  },
  {
    path: "/swipe",
    Component: SwipeMode,
  },
  {
    path: "/read",
    Component: ReadModeTOC,
  },
  {
    path: "/read/:chapterId",
    Component: ReadModeDetail,
  },
  {
    path: "/theme/:themeId",
    Component: ThemeCategoryPage,
  },
  {
    path: "/quiz/:mode/:id",
    Component: QuizPage,
  },
  {
    path: "/quiz/result/:mode/:id",
    Component: QuizResult,
  },
  {
    path: "/mall",
    Component: MallPage,
  },
  {
    path: "/settings",
    Component: SettingsPage,
  },
]);
