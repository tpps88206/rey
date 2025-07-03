/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  background: '#232936', // 主背景
  backgroundSecondary: '#2C3442', // 次背景
  primary: '#3578E5', // 主要色
  text: '#fff', // 主要文字
  textSecondary: '#888', // 次要文字
  border: '#222', // 邊框
  tabActive: '#2C3442', // tab 選中
  tabInactive: 'transparent',
  icon: '#fff',
  iconInactive: '#888',
  error: '#F77',
  success: '#9F9',
  warning: '#FFC107',
  info: '#4A90E2',
  gray: '#BDBDBD',
  lightGray: '#ECEDEE',
  darkGray: '#151718',
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
