import React, { useEffect, useState } from "react";

import {
  Button,
  TextField,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { Stack, Typography, Box } from "@mui/material";

import { makeStyles } from "@material-ui/core/styles";
import { getUserId } from "../../../services/userService";
import Loader from "../../loaderDialog/Loader";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: "50%",
    maxWidth: "90%",
    margin: "auto",
    border: "none",
  },
  card: {
    border: "none",
    padding: "5px",
  },
  button: {
    marginRight: "5%",
    "&.MuiButton-contained": {
      backgroundImage: "linear-gradient(144deg, #ffb649 35%,#ffee00)",
      borderRadius: "15px",
      color: "black",
      width: "8rem",
      "&:hover": {
        backgroundImage: "linear-gradient(144deg, #e9a642 65%,#e9de00)",
        boxShadow: "none",
      },
      "&:disabled": {
        backgroundColor: "#ffffff",
        boxShadow: "none",
        color: "#d3d3d3",
      },
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "95%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  textField: {
    minWidth: "95%",
  },
  cardActions: {
    justifyContent: "right",
    paddingTop: 20,
  },
}));

export default function ClaimModal(props) {
  const [claim, setClaim] = useState({});

  const classes = useStyles();
  const fetchData = async () => {
    // To connect with BE
    setClaim({
      id: 1,
      status: "Open",
      subject: "Nema para",
      modified: "Juce",
      created: "Prije neki dan",
      description: "Poslo pare nisu dosle",
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [open, setOpen] = useState(false);
  const [loaderState, setLoaderState] = useState({
    success: false,
    loading: true,
  });

  return (
    <div>
      <div className="container">
        <form className={classes.root}>
          <Card className={classes.card}>
            <CardHeader align="left" title={"Claim information"}></CardHeader>
            <CardContent>
              <Stack direction="column" spacing={2}>
                <Box>
                  <Grid item xs={12}>
                    <Typography
                    sx={{ pl: '1%' }}
                      className={classes.Typography}
                      id="standard-basic"
                      label="Claim ID"
                      variant="standard"
                    >
                      {claim.id}
                    </Typography>
                    <Typography
                    sx={{ pl: '1%' }}
                      className={classes.Typography}
                      id="standard-basic"
                      label="Subject"
                      variant="standard"
                    >
                      {claim.subject}
                    </Typography>
                    <Typography
                      sx={{ pl: '1%' }}
                      className={classes.Typography}
                      id="standard-basic"
                      label="Last Modified"
                      variant="standard"
                    >
                      {claim.modified}
                    </Typography>

                    <Typography
                      sx={{ pl: '1%' }}
                      className={classes.Typography}
                      id="standard-basic"
                      label="Status"
                      variant="standard"
                    >
                      {claim.status}
                    </Typography>

                    <Typography
                    sx={{ pl: '1%' }}
                      className={classes.Typography}
                      id="standard-basic"
                      label="Created"
                      variant="standard"
                    >
                      {claim.created}
                    </Typography>

                    <Typography
                    sx={{ pl: '1%' }}
                      className={classes.Typography}
                      id="standard-basic"
                      label="Description"
                      variant="standard"
                    >
                      {claim.description}
                    </Typography>
                  </Grid>
                </Box>
                <Box>Poruke</Box>
              </Stack>
            </CardContent>
          </Card>
        </form>
        <Loader open={open} loaderState={loaderState} />
      </div>
    </div>
  );
}
