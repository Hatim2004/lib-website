import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function RightDrawer() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} onClick={toggleDrawer(false)}>
            <List sx={{ direction: 'rtl' }}>
                <ListItem>
                    <ListItemButton onClick={()=>{navigate('/Home') }}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={"الصفحة الرئيسية"} />
                    </ListItemButton>
                </ListItem>

                <ListItem>
                    <ListItemButton  onClick={()=>{navigate('/basket')}}>
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary={"السلة"} />
                    </ListItemButton>
                </ListItem>


                <ListItem>
                    <ListItemButton  onClick={()=>{navigate('/favorites')}}>
                        <ListItemIcon>
                            <FavoriteIcon />
                        </ListItemIcon>
                        <ListItemText primary={"الكتب المفضلة"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>

            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}
            >
                <MenuIcon />
            </IconButton>
            <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}