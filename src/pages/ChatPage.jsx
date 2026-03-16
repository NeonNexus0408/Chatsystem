import { useEffect, useState } from 'react';
import {
  Alert,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import ChatComposer from '../components/ChatComposer';
import { fetchMessages, sendMessage, uploadFile } from '../api/chatApi';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadMessages() {
      try {
        const data = await fetchMessages();
        setMessages(data.items || []);
      } catch {
        setError('Unable to load messages. Check API base URL and token.');
      }
    }

    loadMessages();
  }, []);

  async function handleSend(text) {
    try {
      const data = await sendMessage({ text });
      setMessages((previous) => [...previous, data]);
    } catch {
      setError('Message send failed.');
    }
  }

  async function handleUpload(file) {
    try {
      const data = await uploadFile(file);
      setMessages((previous) => [
        ...previous,
        {
          id: data.id || Date.now(),
          text: data.url || `${file.name} uploaded`,
          attachment: true
        }
      ]);
    } catch {
      setError('Upload failed.');
    }
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5">Chat Room</Typography>
          <Typography variant="body2" color="text.secondary">
            API endpoint: {import.meta.env.VITE_API_BASE_URL || 'https://api.example.com'}
          </Typography>
          {error && <Alert severity="warning">{error}</Alert>}
          <Divider />
          <List sx={{ minHeight: 260 }}>
            {messages.map((message) => (
              <ListItem key={message.id || message.text} disableGutters>
                <ListItemText
                  primary={message.text}
                  secondary={message.createdAt || 'just now'}
                />
                {message.attachment && <Chip size="small" label="File" color="primary" />}
              </ListItem>
            ))}
            {messages.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                No messages yet.
              </Typography>
            )}
          </List>
          <ChatComposer onSend={handleSend} onUpload={handleUpload} />
        </Stack>
      </CardContent>
    </Card>
  );
}
