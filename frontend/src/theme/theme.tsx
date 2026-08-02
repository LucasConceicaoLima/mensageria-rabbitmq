import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    typography: {
      fontFamily: '"Poppins", sans-serif',

      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 700 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },

      button: {
        fontWeight: 600,
      },
    },

    palette: {
      mode,

      primary: {
        main: "#F97316",
        light: "#FB923C",
        dark: "#EA580C",
        contrastText: "#FFFFFF",
      },

      secondary: {
        main: "#F59E0B",
        light: "#FBBF24",
        dark: "#D97706",
        contrastText: "#2A211C",
      },

      background: {
        default: mode === "light" ? "#F6F1EB" : "#0D0A08",
        paper: mode === "light" ? "#FCFBFA" : "#171311",
      },

      text: {
        primary: mode === "light" ? "#2A211C" : "#FAF7F3",
        secondary: mode === "light" ? "#6E5D54" : "#C9BFB8",
      },

      divider:
        mode === "light"
          ? "#E8D6C8"
          : "#30251F",

      success: {
        main: "#22C55E",
      },

      warning: {
        main: "#F59E0B",
      },

      error: {
        main: "#EF4444",
      },

      info: {
        main: "#4B3621",
      },
    },

    shape: {
      borderRadius: 16,
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor:
              mode === "light"
                ? "#F6F1EB"
                : "#0D0A08",

            backgroundImage:
              mode === "light"
                ? "none"
                : "radial-gradient(circle at top,#22160F 0%,#0D0A08 45%,#0D0A08 100%)",
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            background:
              mode === "light"
                ? "linear-gradient(180deg,#FFFFFF,#FCFBFA)"
                : "#171311",

            borderRadius: 16,

            border:
              mode === "light"
                ? "1px solid #E8D6C8"
                : "1px solid #30251F",

            boxShadow:
              mode === "light"
                ? "0 10px 26px rgba(70,45,25,.08)"
                : "0 12px 30px rgba(0,0,0,.35)",
          },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: "none",

            backgroundColor:
              mode === "light"
                ? "#F9F6F2"
                : "#171311",

            borderRight:
              mode === "light"
                ? "1px solid #E8D6C8"
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
                ? "rgba(252,249,246,.90)"
                : "rgba(23,19,17,.90)",

            backdropFilter: "blur(14px)",

            color:
              mode === "light"
                ? "#2A211C"
                : "#FFFFFF",

            borderBottom:
              mode === "light"
                ? "1px solid #E8D6C8"
                : "1px solid #30251F",

            boxShadow: "none",
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 12,
            padding: "10px 22px",
            transition: "all .25s ease",
          },

          containedPrimary: {
            color: "#FFF",

            background:
              "linear-gradient(135deg,#F97316,#FB923C)",

            boxShadow:
              "0 8px 20px rgba(249,115,22,.18)",

            "&:hover": {
              background:
                "linear-gradient(135deg,#EA580C,#F97316)",

              boxShadow:
                "0 12px 28px rgba(249,115,22,.24)",

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
              background: "rgba(249,115,22,.05)",
            },
          },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,

            background:
              mode === "light"
                ? "#FFFFFF"
                : "#1B1715",

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
              color: "#FFF",
              fontWeight: 700,
              borderBottom: 0,
            },
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 600,
          },
        },
      },

      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor:
              mode === "light"
                ? "#E8D6C8"
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