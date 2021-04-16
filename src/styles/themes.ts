import Colors from './colors';

interface Theme {
  /* Background color */
  colorBackground: string;
  colorOnBackground: string;

  /* Primary brand color */
  // colorPrimary: string;
  // colorPrimaryVariant: string;
  // colorOnPrimary: string;

  /* Secondary brand color. */
  // colorSecondary: string;
  // colorSecondaryVariant: string;
  // colorOnSecondary: string;

  /* Tab bar */
  colorSelectedTab: string;
}


const lightTheme: Theme = {
  /* Background color */
  colorBackground: Colors.white,
  colorOnBackground: Colors.black,

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
}

const darkTheme: Theme = {
  /* Background color */
  colorBackground: Colors.black,
  colorOnBackground: Colors.white,

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
}


const navigationLightTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};


const navigationDarkTheme = {
  dark: true,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

export { Theme, lightTheme, darkTheme, navigationLightTheme, navigationDarkTheme }
