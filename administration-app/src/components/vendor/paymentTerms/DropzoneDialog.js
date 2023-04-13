import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { DropzoneDialog } from 'material-ui-dropzone';

export default class DropzoneDialogArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      files: [],
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  handleSave(files) {
    this.setState({
      files: files,
      open: false,
    });
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  render() {
    const classes = {
      button: {
        marginRight: '20px',
        '&.MuiButton-contained': {
          backgroundColor: '#ffaf36',
          color: 'black',
          '&:hover': {
            backgroundColor: '#ea8c00',
            boxShadow: 'none',
          },
          '&:disabled': {
            backgroundColor: '#ffffff',
            boxShadow: 'none',
            color: '#d3d3d3',
          },
        },
      },
    };

    return (
      <div>
        <Button classes={{ root: classes.button }} onClick={this.handleOpen} variant='contained' color='primary'>
          Add File
        </Button>

        <DropzoneDialog
          open={this.state.open}
          onSave={this.handleSave}
          acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
          showPreviews={true}
          maxFileSize={5000000}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}
