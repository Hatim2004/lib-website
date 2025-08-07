import { createTheme } from "@mui/material";
import { lightBlue } from '@mui/material/colors';

const theme = createTheme({
    typography: {
        fontFamily: 'Rubik, sans-serif', // global font
        regular: {
            fontWeight: 400,
        },
        medium: {
            fontWeight: 500,
        },
        bold: {
            fontWeight: 600,
        },
        heavy: {
            fontWeight: 700,
        },
    },
    palette: {
        primary: {
            main: lightBlue[500],
        },
        secondary: {
            main: lightBlue[50],
        },
    }
});

export default theme;