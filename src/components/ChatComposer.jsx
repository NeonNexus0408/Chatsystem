import { useState } from 'react';
import { AttachFile, Send } from '@mui/icons-material';
import { Box, IconButton, Stack, TextField, Typography } from '@mui/material';

export default function ChatComposer({ onSend, onUpload }) {
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  async function handleSend() {
    const trimmed = message.trim();
    if (!trimmed) return;
    await onSend(trimmed);
    setMessage('');
  }

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      await onUpload(file);
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <TextField
        fullWidth
        label="Type your message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            handleSend();
          }
        }}
      />
      <IconButton component="label" color="primary">
        <AttachFile />
        <input type="file" hidden onChange={handleFileChange} />
      </IconButton>
      <IconButton color="primary" onClick={handleSend}>
        <Send />
      </IconButton>
      {uploading && (
        <Box>
          <Typography variant="caption">Uploading...</Typography>
        </Box>
      )}
    </Stack>
  );
}
