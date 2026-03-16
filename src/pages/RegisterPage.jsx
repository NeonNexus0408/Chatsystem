import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import { register } from '../api/authApi';
import AuthForm from '../components/AuthForm';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(form) {
    setLoading(true);
    try {
      await register(form);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card sx={{ maxWidth: 420, mx: 'auto', mt: 10 }}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5">Create account</Typography>
          <AuthForm mode="register" loading={loading} onSubmit={handleRegister} />
          <Typography variant="body2">
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
