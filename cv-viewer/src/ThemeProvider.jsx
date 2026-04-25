// src/theme.js
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0f172a",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#47a992",
      contrastText: "#ffffff",
    },
    info: {
      main: "#e2f2ed",
    },
    background: {
      default: "#f8fafc", // softer than before
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#64748b",
    },
    divider: "#e2e8f0", // softer divider
  },

  shape: {
    borderRadius: 10, // 🔥 increased slightly (modern SaaS feel)
  },

  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontSize: "0.95rem",
    },
    body2: {
      fontSize: "0.85rem",
    },
  },

  components: {
    // 🔘 BUTTONS
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
          padding: "8px 16px",
          transition: "all 0.2s ease",

          "&:hover": {
            transform: "translateY(-1px)",
          },
        },

        containedSecondary: {
          background: "linear-gradient(90deg, #47a992, #3b8f7c)",
          boxShadow: "0 4px 14px rgba(71,169,146,0.3)",

          "&:hover": {
            boxShadow: "0 6px 18px rgba(71,169,146,0.4)",
          },
        },
      },
    },

    // 🧾 INPUT FIELDS
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#fafafa",
          borderRadius: 8,
          transition: "all 0.2s ease",

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#e2e8f0",
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#94a3b8",
          },

          "&.Mui-focused": {
            backgroundColor: "#ffffff",
            boxShadow: "0 0 0 2px rgba(71,169,146,0.2)",
          },
        },
      },
    },

    // 📦 PAPER (cards)
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        },
      },
    },

    // 📃 LIST ITEMS (sidebar polish)
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: "4px 8px",
          transition: "all 0.2s ease",

          "&.Mui-selected": {
            backgroundColor: "rgba(71,169,146,0.15)",
            borderLeft: "4px solid #47a992",
          },

          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.08)",
          },
        },
      },
    },

    // 🧠 TYPOGRAPHY tweaks
    MuiTypography: {
      styleOverrides: {
        root: {
          lineHeight: 1.5,
        },
      },
    },
  },
});