import React, { useContext, useState } from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { DarkMode, LightMode, Menu } from "@mui/icons-material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { ThemeContext } from "../../theme/ThemeContext";
import { routesConfig } from "../../routes/routes.config";

const drawerWidth = 265;

export const MainLayout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  const location = useLocation();

  const { toggleTheme, mode } = useContext(ThemeContext);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const isActive = (itemPath: string) => {
    const allPaths = routesConfig.map((route) => route.path);

    const matchingPaths = allPaths.filter(
      (path) =>
        location.pathname === path ||
        location.pathname.startsWith(path + "/"),
    );

    const activePath = matchingPaths.sort(
      (a, b) => b.length - a.length,
    )[0];

    return activePath === itemPath;
  };

  const managementRoutes = routesConfig.filter(
    (r) => r.section === "management",
  );

  const resultRoutes = routesConfig.filter(
    (r) => r.section === "results",
  );

  const drawerContent = (
    <Box>
      <Toolbar />

      <List>
        <ListItem>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: "bold",
              color: "text.secondary",
              pl: 2,
              py: 1,
            }}
          >
            Gerenciamento
          </Typography>
        </ListItem>

        {managementRoutes.map(({ label, path, icon }) => {
          const selected = isActive(path);

          return (
            <ListItem disablePadding key={path}>
              <ListItemButton
                selected={selected}
                onClick={() => navigate(path)}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.info.main,
                  },
                  "&.Mui-selected .MuiListItemIcon-root": {
                    color: theme.palette.info.main,
                  },
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>

                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          );
        })}

        <Divider sx={{ my: 1 }} />

        <ListItem>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: "bold",
              color: "text.secondary",
              pl: 2,
              py: 1,
            }}
          >
            Results
          </Typography>
        </ListItem>

        {resultRoutes.map(({ label, path, icon }) => {
          const selected = isActive(path);

          return (
            <ListItem disablePadding key={path}>
              <ListItemButton
                selected={selected}
                onClick={() => navigate(path)}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.info.main,
                  },
                  "&.Mui-selected .MuiListItemIcon-root": {
                    color: theme.palette.info.main,
                  },
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>

                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: theme.palette.primary.main,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
          )}

          <Typography
            variant="h6"
            noWrap
            sx={{
              flexGrow: 1,
              color: "#FFF",
            }}
          >
            RabbitMQ Order Processing
          </Typography>

          <IconButton color="inherit" onClick={toggleTheme}>
            {mode === "dark" ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};