import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import AuthForm from '../components/AuthForm';
import { login } from '../api/authApi';
import { setCredentials } from '../features/auth/authSlice';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogin(form) {
    setLoading(true);
    try {
      const payload = await login({ email: form.email, password: form.password });
      dispatch(
        setCredentials({
          token: payload.token,
          user: payload.user
        })
      );
      navigate(location.state?.from?.pathname || '/chat');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card sx={{ maxWidth: 420, mx: 'auto', mt: 10 }}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5">Login</Typography>
          <AuthForm mode="login" loading={loading} onSubmit={handleLogin} />
          <Typography variant="body2">
            Need an account? <Link to="/register">Register</Link>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
