import { ColorSchemeName } from 'react-native';
import Colors from './colors';

import { DefaultTheme, DarkTheme } from '@react-navigation/native';


interface Theme {
  /* Background color */
  colorBackground: string;
  colorOnBackground: string;

  /* Surface color */
  colorSurface: string;
  colorOnSurface: string;

  /* Primary brand color */
  // colorPrimary: string;
  // colorPrimaryVariant: string;
  // colorOnPrimary: string;

  /* Secondary brand color. */
  // colorSecondary: string;
  // colorSecondaryVariant: string;
  // colorOnSecondary: string;

  /* Tab bar color */
  colorSelectedTab: string;

  /* List colors */
  colorListItem: string;
  colorListItemSeparator: string;
  colorOnListItem: string;

  /* TODO Placeholder text color */
}


const lightTheme: Theme = {
  /* Background color */
  colorBackground: Colors.white,
  colorOnBackground: Colors.black,

  /* Surface color */
  colorSurface: '#eeeeee',
  colorOnSurface: Colors.black,

  /* Primary brand color */
  // colorPrimary: '#ff6347',
  // colorPrimaryVariant: '#ffa592',
  // colorOnPrimary: Colors.white,

  /* Secondary brand color. */
  // colorSecondary: string,
  // colorSecondaryVariant: string,
  // colorOnSecondary: string,

  /* Tab bar */
  colorSelectedTab: '#ff6347',

  /* List colors */
  colorListItem: Colors.white,
  colorListItemSeparator: '#dddddd',
  colorOnListItem: Colors.black,
};

const darkTheme: Theme = {
  /* Background color */
  colorBackground: Colors.black,
  colorOnBackground: Colors.white,

  /* Surface color */
  colorSurface: '#3b3b3b',
  colorOnSurface: Colors.white,

  /* Primary brand color */
  // colorPrimary: '#ff6347',
  // colorPrimaryVariant: '#ffa592',
  // colorOnPrimary: Colors.white,

  /* Secondary brand color. */
  // colorSecondary: string,
  // colorSecondaryVariant: string,
  // colorOnSecondary: string,

  /* Tab bar */
  colorSelectedTab: '#ff6347',

  /* List colors */
  colorListItem: '#2b2b2b',
  colorListItemSeparator: Colors.black,
  colorOnListItem: Colors.white,
};


const navigationLightTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    // primary: 'rgb(255, 45, 85)',
    // background: 'rgb(242, 242, 242)',
    // card: 'rgb(255, 255, 255)',
    // text: 'rgb(28, 28, 30)',
    // border: 'rgb(199, 199, 204)',
    // notification: 'rgb(255, 69, 58)',
  },
};


const navigationDarkTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    // primary: 'rgb(255, 45, 85)',
    // background: 'rgb(242, 242, 242)',
    // card: 'rgb(255, 255, 255)',
    // text: 'rgb(28, 28, 30)',
    // border: 'rgb(199, 199, 204)',
    // notification: 'rgb(255, 69, 58)',
  },
};

console.log(navigationDarkTheme.colors.background);

const getTheme = (colorScheme: ColorSchemeName): Theme => {
  return colorScheme === 'light' ? lightTheme : darkTheme;
};

const getNavigationTheme = (colorScheme: ColorSchemeName) => {
  return colorScheme === 'light' ? navigationLightTheme : navigationDarkTheme;
};

export {
  Theme,
  lightTheme,
  darkTheme,
  navigationLightTheme,
  navigationDarkTheme,
  getTheme,
  getNavigationTheme
};
