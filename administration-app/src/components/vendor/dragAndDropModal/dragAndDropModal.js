import React, { useState } from 'react';
import {
  Button,
  Modal,
  Typography,
  IconButton,
  Box,
  CloseIcon
} from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';

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
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    boxShadow: 24,
    padding: '1.5rem',
    borderRadius: '4px',
    outline: 'none',
    zIndex: '9999999999', 
    display: 'block',
    width: '400px',
    height: '300px',
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
}));

export default function UploadModal() {
  const [open, setOpen] = useState(true); // change the initial state to true to make the modal visible
  const classes = useStyles();
  const [files, setFiles] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleFileChange = (newFiles) => {
    setFiles([...files, ...newFiles]);
  };

  return (
    <Box>
      {/* Remove the button that opens the modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <Box className={classes.paper}>
          <Typography variant='h6' gutterBottom>
            Upload File
          </Typography>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              color: (theme) => theme.palette.grey[500],
            }}
          >
          
         
          </IconButton>
          <DropzoneArea onChange={handleFileChange} />
          <Box sx={{ textAlign: 'center', pt: '20px' }}>
            <Button onClick={handleClose}>Close</Button>
          </Box>
          <Typography variant='body2' gutterBottom>
            Drop files here or click to select files to upload.
          </Typography>
          <Box sx={{ textAlign: 'center', pt: '20px' }}>
            <Button onClick={handleClose}>Close</Button>
          </Box>
          <Box sx={{ textAlign: 'center', pt: '20px' }}>
            <Button onClick={handleClose}>Close</Button>
            <Typography variant='body2' gutterBottom>
              tralalalalalal
            </Typography>
</Box>
        </Box>
      </Modal>
    </Box>
  );
}


