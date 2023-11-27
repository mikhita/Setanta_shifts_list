import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AuthService from '../services/authService';
import { Link as RouterLink, Routes, Route, useNavigate } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const token = await AuthService.login(email, password);
      console.log('Login successful! Token:', token);
      // Perform actions on successful login, such as redirecting
      navigate('/');
    } catch (error) {
      console.error(new Error());
      // Handle failed login, show error message, etc.
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container spacing={2} justifyContent='center' paddingLeft='61px'>
              <Grid item xs={12} md={6}>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs={12} md={6}>
                <Link
                  component={RouterLink}
                  to='/registration'
                  variant='body2'
                >
                  Register now
                </Link>
              </Grid>
            </Grid>
          </>
        </Box>
      </Box>
      <Routes>
        <Route path='/registration' element={<RegistrationForm />} />
      </Routes>
    </Container>
  );
};

export default LoginForm;
