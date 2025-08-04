import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import RightDrawer from './Drawer';
import { useTheme } from '@emotion/react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';

export default function Appbar() {
    const theme = useTheme()
    const navigate = useNavigate();
   
    return (
        <>
            <AppBar position="fixed" sx={{ bgcolor: theme.palette.secondary.main }}>
                <Toolbar>

                    <RightDrawer />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, mr: '1.3em', cursor:'pointer' }} onClick={()=>{navigate('/home')}}>
                        موقع المكتبة
                    </Typography>

                    <IconButton color='inherit' onClick={() => { navigate('/favorites') }}>
                        <FavoriteIcon />
                    </IconButton>

                    <IconButton color='inherit' onClick={() => { navigate('/basket') }}>
                        <ShoppingCartIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>
        </>
    )
}