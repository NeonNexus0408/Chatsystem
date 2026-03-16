import apiClient from './client';

export async function fetchMessages() {
  const { data } = await apiClient.get('/chat/messages');
  return data;
}

export async function sendMessage(payload) {
  const { data } = await apiClient.post('/chat/messages', payload);
  return data;
}

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await apiClient.post('/chat/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return data;
}
