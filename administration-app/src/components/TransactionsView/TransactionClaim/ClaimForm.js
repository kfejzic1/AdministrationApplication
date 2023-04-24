import { Box, Button, TextField, Typography } from '@mui/material';
import { DropzoneArea } from 'material-ui-dropzone';
import React, { useState } from 'react';
import {
  fileTransactionClaim,
  uploadFile
} from '../../../services/TransactionsView/transactionsService';

export default function ClaimForm(props){
  const [files, setFiles] = useState([]);
  const [claimSubject, setClaimSubject] = useState('');
  const [claimDescription, setClaimDescription] = useState('');
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '35%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
  const handleFileChange = newFiles => {
    setFiles([...files, ...newFiles]);
  };
  return (
    <Box sx={style} display={'flex'} gap={1} flexDirection={'column'} justifyContent={'center'}>
      <h2>File a Claim for Transaction</h2>
      <TextField
      label='Subject'
      value={claimSubject}
      onChange={e => setClaimSubject(e.target.value)}
      ></TextField>
      <TextField
      label='Description'
      value={claimDescription}
      onChange={e => setClaimDescription(e.target.value)}
      ></TextField>
      <Box >
				<DropzoneArea
					acceptedFiles={['application/pdf']}
					filesLimit={1}
					showFileNamesInPreview={true}
					showFileNames={true}
					useChipsForPreview={true}
          onChange={handleFileChange}
					dropzoneText={<Typography sx={{ margin: '0' }}>Drag and drop your file here or click to select file.</Typography>}
				/>
			</Box>
      <Button align='center'
        onClick={() => {
          const calls = files.map(x => new Promise(resolve => resolve(uploadFile(x, 'transactions/claims', props.id))).then((res) => {
            var request = {
              transactionId: props.id,
              subject: claimSubject,
              description: claimDescription,
              documentIds: Array(1).fill(res.data) 
            }
            fileTransactionClaim(request);
            props.onClose();
          }));
        }}>
        File claim
      </Button>
    </Box>

  );
}