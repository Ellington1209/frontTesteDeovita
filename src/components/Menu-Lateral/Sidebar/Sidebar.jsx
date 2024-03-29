/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, styled, Collapse, Divider, } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";


import Logo from "../../../image/logoSemFundo.png";
import PerfilsMenu from "./PerfilsMenu";

const drawerWidth = 230;

const NewHOC = (PassedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <div>
          <PassedComponent {...this.props} />
        </div>
      );
    }
  };
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Sidebar = (props) => {
  const { open } = props;
  const [user, setUser] = React.useState({});
  const [isExpand, setIsExpand] = React.useState(999);

  React.useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser || {});
  }, []);


  const handleClickMenu = (index) => {
    setIsExpand((state) => (index === state ? 999 : index));
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#363636 "
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <img src={Logo} alt="Logo" style={{ marginRight: '30px' }} />
      </DrawerHeader>


      <Divider />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {user.perfils_id && PerfilsMenu[user.perfils_id - 1].map((p, index) => {
            const IconComponent = NewHOC(p.icon);

            return (
              <ListItem key={p.name} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={p.route}
                  onClick={() => handleClickMenu(index)}
                >
                  <ListItemIcon>
                    <IconComponent />
                  </ListItemIcon>
                  <ListItemText primary={p.name} />
                  {p.isSubmenu ? (
                    isExpand === index ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : (
                    <></>
                  )}
                </ListItemButton>
                {p.isSubmenu &&
                  p.submenu.map((menu) => {
                    return (
                      <Collapse
                        in={isExpand === index}
                        timeut="auto"
                        unmountOnExit
                        key={menu.name}
                      >
                        <List component="div" disablePadding>
                          <ListItemButton
                            component={RouterLink}
                            to={menu.submenuRoute}
                          >
                            <ListItemText primary={menu.name} />
                          </ListItemButton>
                        </List>
                      </Collapse>
                    );
                  })}
              </ListItem>
            );
          })}
        </List>

      </Box>
    </Drawer>
  );
};


export default Sidebar;