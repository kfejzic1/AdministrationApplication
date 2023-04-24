import React from 'react';
import { Button, Typography, Box, TextField} from '@mui/material';
import { DropzoneArea } from 'material-ui-dropzone';

export default function ClaimForm(){
  return (
    <Box display={'flex'} gap={1} flexDirection={'column'} justifyContent={'center'}>
      <TextField
      label='Subject'
      ></TextField>
      <TextField
      label='Description'
      ></TextField>
      <Box >
				<DropzoneArea
					acceptedFiles={['application/pdf']}
					filesLimit={1}
					showFileNamesInPreview={true}
					showFileNames={true}
					useChipsForPreview={true}
					dropzoneText={<Typography sx={{ margin: '0' }}>Drag and drop your file here or click to select file.</Typography>}
				/>
			</Box>
      <Button align='center'
        onClick={() => {

        }}>
        File claim
      </Button>
    </Box>

  );
}