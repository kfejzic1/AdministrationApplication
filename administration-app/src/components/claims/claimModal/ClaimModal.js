import React, { useRef, useEffect, useState } from 'react';
import { Button, TextField, Grid, Card, CardHeader, CardContent, CardActions, Modal } from '@material-ui/core';
import { Stack, Typography, Box } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { getUser } from '../../../services/userService';
import Loader from '../../loaderDialog/Loader';
import sendIcon from '../../../../src/sencIcon.png';
import { replaceInvalidDateByNull } from '@mui/x-date-pickers/internals';
import { getUserClaim } from '../../../services/transactionClaimService';
import { getUserId } from '../../../services/userService';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    minHeight: '50%',
    maxWidth: '90%',
    margin: 'auto',
    border: 'none',
  },
  card: {
    border: 'none',
    padding: '5px',
  },
  button: {
    marginRight: '5%',
    '&.MuiButton-contained': {
      backgroundImage: 'linear-gradient(144deg, #ffb649 35%,#ffee00)',
      borderRadius: '15px',
      color: 'black',
      width: '8rem',
      '&:hover': {
        backgroundImage: 'linear-gradient(144deg, #e9a642 65%,#e9de00)',
        boxShadow: 'none',
      },
      '&:disabled': {
        backgroundColor: '#ffffff',
        boxShadow: 'none',
        color: '#d3d3d3',
      },
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '95%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  textField: {
    minWidth: '95%',
  },
  cardActions: {
    justifyContent: 'right',
    paddingTop: 20,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatModalMessages: {
    display: 'flex',
    flexDirection: 'column',
  },
  chatModalMessage: {
    margin: '5px 10px',
    padding: '10px',
    borderRadius: '10px',
    maxWidth: '70%',
  },
  chatModalMessageUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#0084ff',
    color: 'white',
  },
  chatModalMessageAgent: {
    alignSelf: 'flex-start',
    backgroundColor: '#eee',
  },
  chatModalMessageText: {
    fontSize: '14px',
  },
  agentLink: {
    color: 'black',
  },

  userLink: {
    color: 'white',
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
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState(null);
  const classes = useStyles();
  const [event, setEvent] = useState(null);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.handleClose();
  };

  const setStatusFlag = status => {
    return status === 'Open' ? 'green' : 'red';
  };
  const handleFileUpload = event => {
    const file = event.target.files[0];
    console.log(file);
    setFile(file);
    setEvent(event);
  };
  const [messages, setMessages] = useState([ ]);
  const fetchData = async () => {
    getUserClaim(props.claimId).then(res => {
      setClaim({id:res.data.claim.id, 
        transactionId: res.data.claim.transactionId, 
        subject: res.data.claim.subject, 
        description: res.data.claim.description,
        created: res.data.claim.created.split('T')[0],
        modified: res.data.claim.modified == null ? res.data.claim.created.split('T')[0] : res.data.claim.modified.split('T')[0],
        status: res.data.claim.status,
      });
      console.log(res.data);
      let user = getUserId();
      console.log(user);
      let beMessages = [];
      let docs = [];
      res.data.documents.forEach(doc=>{
        docs.push(doc.unc);
      });
      res.data.messages.forEach(mess => {
        let message = {
          text: mess.message,
          isUser: mess.userId === user,
          name: mess.userName,
          // file: '\\siprojekat.duckdns.org'+mess.documents[0].unc,
        };
        beMessages.push(message);
        console.log(message); 
      }); 
      setMessages(beMessages); 
    });
  };
  const chatListRef = useRef(null);
  useEffect(() => {
    const card = chatListRef.current;
    card.scrollTop = card.scrollHeight;
  }, [messages]);
  useEffect(() => {
    fetchData();
  },[]);

  const handleSubmit = () => {
    // Handle form submit here
    setChatMessages([...chatMessages, newMessage]);
    setNewMessage('');
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      getUser().then(res => {
        let message = { text: newMessage, isUser: true, name: res.data.firstName, file: file }
        setMessages([...messages, message ]);
        setNewMessage('');
        setFile(null);
        event.target.value = '';

      });
    }
  };
  return (
    <div>
      <div className='container'>
        <Card className={classes.card}>
          <CardHeader align='left' title={'Claim information'}></CardHeader>
          <CardContent>
            <Stack direction='column' spacing={2}>
              <Box alignContent={'center'} sx={{ maxWidth: '100%', mt: 3 }}>
                <Grid container spacing={0.5}>
                  {/* Table Header */}
                  <Grid item xs={12}>
                    <Typography variant='subtitle1' fontWeight='bold' sx={{ fontSize: '14px' }}>
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

              <div className={classes.chatModal}>
                <div
                  className={classes.chatModalMessages}
                  style={{ height: '300px', overflowY: 'auto', margin: '0 70px', display: 'flex' }}
                  ref={chatListRef}
                >
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`${classes.chatModalMessage} ${message.isUser ? classes.chatModalMessageUser : classes.chatModalMessageAgent
                        }`}
                    >
                      <div className={classes.chatModalMessageText}>
                        <span>
                          <b>{message.name}</b>
                        </span>
                        : {message.text}
                        {message.file && (
                          <div
                            key={index}
                            className={`${classes.chatModalMessage} ${message.isUser ? classes.chatModalMessageUser : classes.chatModalMessageAgent
                              }`}
                          >
                            <b>
                              <a
                                className={message.isUser ? classes.userLink : classes.agentLink}
                                href={URL.createObjectURL(message.file)}
                                download
                              >
                                {message.file.name}
                              </a>
                            </b>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <Grid container spacing={2} alignItems='center' justifyContent='space-between'>
                <Grid item xs={9} sm={8}>
                  <TextField
                    label='Add message'
                    variant='outlined'
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                    fullWidth
                    InputProps={{
                      endAdornment: <input type='file' onChange={handleFileUpload} />,
                    }}
                  />
                </Grid>
                <Grid item xs={3} sm={4}>
                  <Button variant='contained' onClick={handleSendMessage}>
                    <img src={sendIcon} style={{ width: 20, height: 20 }} />
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Grid item xs={5} sm={4} container justify='flex-end'>
              <Button variant='contained' className={classes.button} onClick={handleClose}>
                Close
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
