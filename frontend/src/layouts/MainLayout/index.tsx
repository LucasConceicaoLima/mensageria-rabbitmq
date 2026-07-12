import React, { useState, useContext } from "react";
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

import {
  Menu,
  DarkMode,
  LightMode,
} from "@mui/icons-material";

import { Outlet, useNavigate, useLocation } from "react-router-dom";

import { ThemeContext } from "../../theme/themeContext";
import { routesConfig } from "../../routes/routes.config";

const drawerWidth = 265;

export const MainLayout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  const location = useLocation();

  const { toggleTheme, mode } = useContext(ThemeContext);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const isActive = (itemPath: string) => {
  const current = location.pathname.split("/");
  const target = itemPath.split("/");

  return (
    current.length === target.length &&
    current.every((segment, index) => segment === target[index])
  );
};

  const managementRoutes = routesConfig.filter(
  (r) => r.section === "management",
);
  const resultRoutes = routesConfig.filter((r) => r.section === "results");

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
            Management
          </Typography>
        </ListItem>

        {managementRoutes.map(({ label, path, icon }) => {
          const selected = isActive(path);

          return (
            <ListItem disablePadding key={path}>
              <ListItemButton
                onClick={() => navigate(path)}
                selected={selected}
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
                onClick={() => navigate(path)}
                selected={selected}
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
          background: "#AA0506",
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
          )}

          <Typography variant="h6" sx={{ flexGrow: 1 }} noWrap>
            Megaten Build Calculator
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
        ModalProps={{ keepMounted: true }}
        sx={{
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
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};