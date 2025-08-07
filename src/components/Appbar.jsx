import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import RightDrawer from './Drawer';
import { useTheme } from '@emotion/react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';

export default function Appbar({basketCount, favoritesCount}) {
    const theme = useTheme();
    const navigate = useNavigate();

    
    

    return (
        <AppBar position="fixed" sx={{ bgcolor: theme.palette.secondary.main }}>
            <Toolbar>

                <RightDrawer />

                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, mr: '1em', cursor: 'pointer' }}
                    onClick={() => { navigate('/home'); }}
                >
                    موقع المكتبة
                </Typography>

                <Typography sx={{ ml: '1em' }}>
                    {"أهلاً "}
                    {localStorage.getItem('userName')}
                </Typography>

                {/* Cart Icon with Badge */}
                <IconButton color="inherit" onClick={() => navigate('/basket')}>
                    <Badge badgeContent={basketCount} color="primary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>

                {/* Favorite Icon with Badge */}
                <IconButton color="inherit" onClick={() => navigate('/favorites')}>
                    <Badge badgeContent={favoritesCount} color="primary">
                        <FavoriteIcon />
                    </Badge>
                </IconButton>

            </Toolbar>
        </AppBar>
    );
}
