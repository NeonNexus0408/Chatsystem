import { useState } from 'react';
import { Alert, Box, Button, Stack, TextField } from '@mui/material';

const initialForm = {
  name: '',
  email: '',
  password: ''
};

export default function AuthForm({ mode = 'login', onSubmit, loading }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  function handleChange(event) {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!form.email || !form.password || (mode === 'register' && !form.name)) {
      setError('Please fill all required fields.');
      return;
    }

    try {
      await onSubmit(form);
    } catch (submitError) {
      setError(submitError?.response?.data?.message || 'Request failed.');
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}
        {mode === 'register' && (
          <TextField
            name="name"
            label="Name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />
        )}
        <TextField
          name="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register'}
        </Button>
      </Stack>
    </Box>
  );
}
