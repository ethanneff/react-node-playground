import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { makeStyles } from "@material-ui/core";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import { Link as NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  company: { display: "flex", flex: 1 },
}));

export const Nav = () => {
  const classes = useStyles();

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Link href="/" color="textPrimary" className={classes.company}>
          <CameraIcon className={classes.icon} />
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Company name
          </Typography>
        </Link>
        <nav>
          <Link
            variant="button"
            color="textPrimary"
            href="features"
            className={classes.link}
          >
            Features
          </Link>
          <Link
            variant="button"
            color="textPrimary"
            href="pricing"
            className={classes.link}
          >
            Pricing
          </Link>
          <Link
            variant="button"
            color="textPrimary"
            href="support"
            className={classes.link}
          >
            Support
          </Link>
        </nav>
        <Button
          href="/sign-in"
          color="primary"
          variant="outlined"
          className={classes.link}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};
