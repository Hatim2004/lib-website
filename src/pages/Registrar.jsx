import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

import { useState } from "react"

export default function SingUp() {
  const [FieldState, setFieldState] = useState(false);
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();


  async function handleSubmit() {
    if (user && pwd) {
      try {
        const response = await fetch('https://api-05ii.onrender.com/users/registrar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: user, password: pwd }),
        });

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }

        // Handle successful response
        navigate("/")

      } catch (error) {
        console.error('Request failed:', error);
        // Show user-friendly error message
        setFieldState(true);
      }
    }
  }


  return (
    <>
      <Box className='card'>
        <h1 className='cardTitle'>إنشاء حساب</h1>
        {/* User Name Feild */}
        <TextField
          sx={{
            mt: '15px', width: '80%', ml: 'auto', mr: 'auto'
            , '& .MuiInputBase-root': {
              direction: 'rtl',
            },
            '& .MuiInputLabel-root': {
              right: 20,
              left: 'auto',
              transformOrigin: 'top right',
            },
            '& .MuiInputLabel-shrink': {
              transform: 'translate(-14px, -9px) scale(0.75)',
            },
            '& .MuiInputBase-input': {
              textAlign: 'right',
            },
          }}
          error={FieldState}
          type='email'
          id="userName"
          label="اسم المستخدم"
          variant="filled"
          autoComplete='off'
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />


        {/* Password Feild */}
        <TextField

          type='password'
          sx={{
            mt: '30px', mb: '30px', width: '80%', ml: 'auto', mr: 'auto'
            , '& .MuiInputBase-root': {
              direction: 'rtl',
            },
            '& .MuiInputLabel-root': {
              right: 20,
              left: 'auto',
              transformOrigin: 'top right',
            },
            '& .MuiInputLabel-shrink': {
              transform: 'translate(-14px, -9px) scale(0.75)',
            },
            '& .MuiInputBase-input': {
              textAlign: 'right',
            },
          }}
          error={FieldState}
          id="password"
          label="كلمة المرور"
          variant="filled"
          value={pwd}
          onChange={(e) => {
            setPwd(e.target.value);
          }}

        />

        {/* Confirme Password Feild */}
        <TextField
          type='password'
         sx={{
            mb: '30px', width: '80%', ml: 'auto', mr: 'auto'
            , '& .MuiInputBase-root': {
              direction: 'rtl',
            },
            '& .MuiInputLabel-root': {
              right: 20,
              left: 'auto',
              transformOrigin: 'top right',
            },
            '& .MuiInputLabel-shrink': {
              transform: 'translate(-14px, -9px) scale(0.75)',
            },
            '& .MuiInputBase-input': {
              textAlign: 'right',
            },
          }}
          error={FieldState}
          id="ConfirmePassword"
          label="تأكيد كلمة المرور"
          variant="filled" />



        {/* Sign in button */}
        <Button sx={{ width: '80%', height: '3em', mb: '3em', ml: 'auto', mr: 'auto', fontWeight: '900' }} variant='contained'
          onClick={() => {
            handleSubmit()
          }}>إنشاء حساب</Button>

        {/* Rempare me*/}

      </Box>
      <p className='singUp'>هل لديك حساب بالفعل؟ <Link href='/'>تسجيل الدخول</Link></p>

    </>
  )
}