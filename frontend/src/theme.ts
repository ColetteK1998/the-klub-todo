import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#64c763",
    },
    background: {
      default: "#ffffff",
      paper: "#f9f9f9",
    },
    text: {
      primary: "#1e1e1e",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        colorPrimary: {
          "&.Mui-checked": {
            color: "#64c763",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: "10px 12px",
        },
        root: {
          padding: "0",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#5C625E",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#086A74",
          },
        },
        notchedOutline: {
          borderColor: "#BFCDC4",
          padding: "12px",
        },
      },
    },
  },
});

export default theme;
