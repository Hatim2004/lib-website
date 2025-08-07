import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    TextField,
    Link,
    IconButton,
    InputAdornment,
    FormControl,
    InputLabel,
    FilledInput
} from '@mui/material';
import {
    Visibility,
    VisibilityOff
} from '@mui/icons-material';

import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function SignIn() {
    const [FieldState, setFieldState] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [newUser, setNewUser] = useState(false);


    

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    function Greeting({ newUser }) {
        return newUser ? <Alert className='alert' icon={<CheckIcon fontSize="inherit" />} sx={{ width: '73.2%', ml: 'auto', mr: 'auto', mb: '1em' }} severity="success">
            تم إنشاء حساب جديد بنجاح
        </Alert> : null
    }



    async function handleSubmit() {
        if (user && pwd) {
            try {
                const response = await fetch('https://api-05ii.onrender.com/users/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: user, password: pwd }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Login failed');
                }

                // Successful login - navigate to home
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName', user);
                navigate('/Home');


            } catch (error) {
                console.error('Login failed:', error.message);
                setFieldState(true);
            }
        } else {
            setFieldState(true);
        }
    }


    return (
        <>
            <Box className='card'>
                <h1 className='cardTitle'>تسجيل الدخول</h1>
                {/* User name Feild */}
                <TextField
                    sx={{
                        mt: '1em', width: '80%', ml: 'auto', mr: 'auto'
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
                    onChange={(eo) => {
                        setUser(eo.target.value);
                    }}
                />


                {/* Password Feild */}
                <FormControl
                    className='textField'
                    sx={{ width: '80%', ml: 'auto', mr: 'auto', mb: '1em', mt: '2em' }}
                    error={FieldState}
                >
                    <InputLabel htmlFor="password">كلمة المرور</InputLabel>
                    <FilledInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <Greeting newUser={localStorage.getItem('newUser') === 'true'} />

                {/* Sign in button */}
                <Button sx={{ width: '80%', ml: 'auto', mr: 'auto', mb: '2em', height: '3em' }} variant='contained'
                    onClick={() => {
                        handleSubmit();
                    }}>تسجيل الدخول</Button>
            </Box>
            <p className='singUp'>ليس لديك حساب؟ <Link href='/registrar'>إنشاء حساب</Link></p>
        </>
    )
}