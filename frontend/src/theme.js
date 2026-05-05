import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // A vibrant, fresh green
    },
    secondary: {
      main: '#81C784', // A softer, complementary green for secondary accents
    },
    background: {
      default: '#FFFFFF', // Pure white background
    },
    text: {
      primary: '#333333', // Dark gray for primary text, ensuring contrast on white
      secondary: '#666666', // Medium gray for secondary text
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
