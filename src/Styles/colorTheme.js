import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2ABBA7',
      contrastText: "#fff",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },

    secondary: {
      main: '#41B3A3',
      contrastText: "#fff",
    }
  },
});

export default theme;