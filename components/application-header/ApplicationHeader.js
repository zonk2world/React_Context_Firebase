import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List, ListItem, ListItemIcon, ListItemText,
  makeStyles,
  Toolbar,
  Typography
} from "@material-ui/core";
import {useAuthentication} from "../../hooks/useAuthentication";
import {Menu, Receipt} from "@material-ui/icons";
import {useCallback, useState} from "react";
import {Link} from "react-router-dom";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: `${theme.zIndex.drawer - 1} !important`,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
}));

const ApplicationHeader = () => {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);
  const {logout} = useAuthentication();
  const handleClose = useCallback(() => {
    setMenuOpen(false);
  }, [setMenuOpen]);
  return (
    <>
      <AppBar position="sticky" elevation={0} className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => setMenuOpen(true)}
            color="inherit"
            aria-label="menu"
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Okonomi Digital Products DB
          </Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        open={menuOpen}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClose={() => setMenuOpen(false)}
      >
        <Toolbar />
        <Box p={1}>
          <Typography variant="overline">
            Produktdaten
          </Typography>
          <List>
            <ListItem
              button
              component={Link}
              to="/vendors"
              onClick={handleClose}
            >
              <ListItemIcon>
                <Receipt />
              </ListItemIcon>
              <ListItemText primary="Hersteller" />
            </ListItem>
          </List>
          <Typography variant="overline">
            Stammdaten
          </Typography>
          <List>
            <ListItem
              button
              component={Link}
              to="/taxonomies/industries"
              onClick={handleClose}
            >
              <ListItemIcon>
                <Receipt />
              </ListItemIcon>
              <ListItemText primary="Branchen" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/taxonomies/productTypes"
              onClick={handleClose}
            >
              <ListItemIcon>
                <Receipt />
              </ListItemIcon>
              <ListItemText primary="Produkttypen" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default ApplicationHeader;