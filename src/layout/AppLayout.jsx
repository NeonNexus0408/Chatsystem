import { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { TemplateContext } from '../providers/ThemeProvider';

export default function AppLayout() {
  const { template, setTemplate, mode, toggleMode } = useContext(TemplateContext);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate('/login');
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ gap: 2, flexWrap: 'wrap' }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Chat System
          </Typography>
          <Typography variant="body2">{user?.email}</Typography>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel id="template-label">Template</InputLabel>
            <Select
              labelId="template-label"
              value={template}
              label="Template"
              onChange={(event) => setTemplate(event.target.value)}
            >
              <MenuItem value="modern">Modern</MenuItem>
              <MenuItem value="minimal">Minimal</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" onClick={toggleMode}>
            {mode === 'light' ? 'Dark' : 'Light'} theme
          </Button>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 3 }}>
        <Stack spacing={2}>
          <Outlet />
        </Stack>
      </Container>
    </Box>
  );
}
