import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    typography: {
      fontFamily: '"Poppins", sans-serif',

      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        fontWeight: 600,
      },
    },

    palette: {
      mode,

      primary: {
        main: "#F97316", // Tangerine
        light: "#FB923C",
        dark: "#EA580C",
        contrastText: "#FFFFFF",
      },

      secondary: {
        main: "#F59E0B", // Mango
        light: "#FBBF24",
        dark: "#D97706",
        contrastText: "#2A211C",
      },

      background: {
        default: mode === "light" ? "#FFF9F4" : "#0D0A08",

        paper: mode === "light" ? "#FFFFFF" : "#171311",
      },

      text: {
        primary: mode === "light" ? "#2A211C" : "#FAF7F3",

        secondary: mode === "light" ? "#6B5B52" : "#C9BFB8",
      },

      divider: mode === "light" ? "#F1D9C7" : "#30251F",

      info: {
        main: "#4B3621",
        contrastText: "#FFFFFF",
      },

      success: {
        main: "#22C55E",
      },

      warning: {
        main: "#F59E0B",
      },

      error: {
        main: "#EF4444",
      },
    },

    shape: {
      borderRadius: 18,
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: mode === "light" ? "#FFF9F4" : "#0D0A08",
            backgroundImage:
              mode === "light"
                ? "radial-gradient(circle at top,#FFF4E8 0%,#FFF9F4 45%,#FFF9F4 100%)"
                : "radial-gradient(circle at top,#22160F 0%,#0D0A08 45%,#0D0A08 100%)",
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",

            border:
              mode === "light"
                ? "1px solid #F5E1D5"
                : "1px solid #2A211C",

            boxShadow:
              mode === "light"
                ? "0 8px 30px rgba(120,72,26,.08)"
                : "0 12px 36px rgba(0,0,0,.45)",
          },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: "none",

            backgroundColor:
              mode === "light"
                ? "#FFFFFF"
                : "#171311",

            borderRight:
              mode === "light"
                ? "1px solid #F1D9C7"
                : "1px solid #30251F",
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: "none",

            backgroundColor:
              mode === "light"
                ? "rgba(255,255,255,.88)"
                : "rgba(23,19,17,.88)",

            backdropFilter: "blur(14px)",

            color:
              mode === "light"
                ? "#2A211C"
                : "#FFFFFF",

            borderBottom:
              mode === "light"
                ? "1px solid #F1D9C7"
                : "1px solid #30251F",

            boxShadow: "none",
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,

            border:
              mode === "light"
                ? "1px solid #F4E0D0"
                : "1px solid #30251F",

            boxShadow:
              mode === "light"
                ? "0 10px 24px rgba(249,115,22,.08)"
                : "0 10px 28px rgba(0,0,0,.35)",
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 14,
            fontWeight: 600,
            padding: "10px 22px",
            transition: "all .25s ease",
          },

          containedPrimary: {
            color: "#FFF",

            background:
              "linear-gradient(135deg,#F97316 0%,#FB923C 55%,#FBBF24 100%)",

            boxShadow:
              "0 10px 25px rgba(249,115,22,.30)",

            "&:hover": {
              background:
                "linear-gradient(135deg,#EA580C 0%,#F97316 55%,#F59E0B 100%)",

              boxShadow:
                "0 14px 34px rgba(249,115,22,.40)",

              transform: "translateY(-2px)",
            },

            "&:active": {
              transform: "translateY(0)",
            },
          },

          outlinedPrimary: {
            borderColor: "#F97316",

            "&:hover": {
              borderColor: "#EA580C",
              background: "rgba(249,115,22,.06)",
            },
          },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 14,

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#F97316",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#F97316",
              borderWidth: 2,
            },
          },
        },
      },

      MuiTextField: {
        defaultProps: {
          variant: "outlined",
        },
      },

      MuiTableHead: {
        styleOverrides: {
          root: {
            background:
              "linear-gradient(90deg,#F97316,#F59E0B)",

            "& .MuiTableCell-root": {
              color: "#FFFFFF",
              fontWeight: 700,
              borderBottom: 0,
            },
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            borderRadius: 10,
          },

          filledPrimary: {
            background:
              "linear-gradient(135deg,#F97316,#FB923C)",

            color: "#FFF",
          },

          filledSecondary: {
            background:
              "linear-gradient(135deg,#F59E0B,#FBBF24)",

            color: "#2A211C",
          },
        },
      },

      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor:
              mode === "light"
                ? "#F1D9C7"
                : "#30251F",
          },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor:
              mode === "light"
                ? "#2A211C"
                : "#F97316",

            color: "#FFF",
            fontSize: 13,
          },
        },
      },

      MuiAvatar: {
        styleOverrides: {
          root: {
            background:
              "linear-gradient(135deg,#F97316,#FBBF24)",
            color: "#FFF",
            fontWeight: 700,
          },
        },
      },

      MuiFab: {
        styleOverrides: {
          primary: {
            background:
              "linear-gradient(135deg,#F97316,#F59E0B)",

            color: "#FFF",

            "&:hover": {
              background:
                "linear-gradient(135deg,#EA580C,#F97316)",
            },
          },
        },
      },

      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            "&.Mui-checked": {
              color: "#F97316",

              "& + .MuiSwitch-track": {
                backgroundColor: "#F97316",
              },
            },
          },
        },
      },
    },
  });