import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

type Props = {
  title: string;
  description: string;
  callToAction?: {
    title: string;
    navigation: string;
  };
};

export const Hero = ({ title, description, callToAction }: Props) => {
  const classes = useStyles();
  return (
    <Container maxWidth="sm" component="main" className={classes.heroContent}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        align="center"
        color="textSecondary"
        component="p"
      >
        {description}
      </Typography>
      {callToAction ? (
        <div className={classes.heroButtons}>
          <Grid container justify="center">
            <Button
              href={callToAction.navigation}
              variant="contained"
              color="primary"
            >
              {callToAction.title}
            </Button>
          </Grid>
        </div>
      ) : null}
    </Container>
  );
};
