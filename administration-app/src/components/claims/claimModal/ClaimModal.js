import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Modal,
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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function ClaimModal(props) {
  const [claim, setClaim] = useState({});
  const [open, setOpen] = useState(false);
  const [loaderState, setLoaderState] = useState({
    success: false,
    loading: true,
  });
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setStatusFlag = (status) => {
    return status === "Open" ? "green" : "red";
  };

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

  const handleSubmit = () => {
    // Handle form submit here
    setChatMessages([...chatMessages, newMessage]);
    setNewMessage("");
  };

  return (
    <div>
      <div className="container">
        <Card className={classes.card}>
          <CardHeader align="left" title={"Claim information"}></CardHeader>
          <CardContent>
            <Stack direction="column" spacing={2}>
              <Box alignContent={"center"} sx={{ maxWidth: '100%', mt: 3 }}>
                <Grid container spacing={0.5}>
                  {/* Table Header */}
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: '14px' }}>
                      <Grid container spacing={2}>
                        <Grid item xs={2}>
                          Claim id
                        </Grid>
                        <Grid item xs={2}>
                          Subject
                        </Grid>
                        <Grid item xs={2}>
                          Created
                        </Grid>
                        <Grid item xs={2}>
                          Last activity
                        </Grid>
                        <Grid item xs={2}>
                          Description
                        </Grid>
                        <Grid item xs={2}>
                          Status
                        </Grid>
                      </Grid>
                    </Typography>
                  </Grid>
                  {/* Table Data */}
                  <Grid item xs={12}>
                    <Typography sx={{ fontSize: '14px' }}>
                      <Grid container spacing={2}>
                        <Grid item xs={2}>
                          {claim.id}
                        </Grid>
                        <Grid item xs={2}>
                          {claim.subject}
                        </Grid>
                        <Grid item xs={2}>
                          {claim.created}
                        </Grid>
                        <Grid item xs={2}>
                          {claim.modified}
                        </Grid>
                        <Grid item xs={2}>
                          {claim.description}
                        </Grid>
                        <Grid item xs={2}>
                          <Typography sx={{ fontSize: '14px', color: setStatusFlag(claim.status) }}>
                            {claim.status}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Box>
                <Stack spacing={2}>
                  <Card variant="outlined" sx={{ p: 1, backgroundColor: "#f0f0f0" }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      User
                    </Typography>
                    <Typography>
                      Pozdrav, imam neki problem.
                    </Typography>
                    <Typography sx={{ fontSize: '12px' }}>
                      10:05 AM
                    </Typography>
                  </Card>

                  <Card variant="outlined" sx={{ p: 1, backgroundColor: "#f0f0f0" }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Admin
                    </Typography>
                    <Typography>
                      Dobar dan, o kojem je problemu riječ?
                    </Typography>
                    <Typography sx={{ fontSize: '12px' }}>
                      10:07 AM
                    </Typography>
                  </Card>

                  <Card variant="outlined" sx={{ p: 1, backgroundColor: "#f0f0f0" }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      User
                    </Typography>
                    <Typography>
                      Želio bih prijaviti...
                    </Typography>
                    <Typography sx={{ fontSize: '12px' }}>
                      10:10 AM
                    </Typography>
                  </Card>
                </Stack>
              </Box>

              {/* Chat Input */}
              <Grid container spacing={0} alignItems="flex-end" maxWidth={false}>
                <Grid item xs={12} sm={8}>
                  <TextField
                    label="Add message"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <input type="file" />
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={5} sm={4} container justify="flex-end">
                  <Button variant="contained" className={classes.button}>Send</Button>
                </Grid>
              </Grid>
            </Stack>
          </CardContent>
          <CardActions className={classes.cardActions}>
          <Grid item xs={5} sm={4} container justify="flex-end">
            <Button variant="contained" className={classes.button}>
              Close
            </Button>
            </Grid>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}  