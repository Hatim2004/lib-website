import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function DeleteForm() {
    const [ID, setID] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        location.reload();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleDelets();
        setOpen(false);

    };

    const handleDelets = () => {
        
        fetch(`http://localhost:3470/emp/delete/${ID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {handleClose()})
            .catch((error) => {
                console.error("Error submitting form:", error);
            });
    }

    return (
        <React.Fragment>
            <Button
                onClick={() => { handleClickOpen() }}
                color='error'
                variant='outlined'
                sx={{ mr: '2em' }}>
                حذف موظف
            </Button>


            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>حذف بيانات الموظف</DialogTitle>
                <DialogContent sx={{ paddingBottom: 0 }}>
                    <DialogContentText>
                        ادخل رقم الموظف للحذف
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            required
                            sx={{ mt: '1em' }}
                            className='textField'
                            label="ID"
                            type="text"
                            fullWidth
                            variant="filled"
                            value={ID}
                            onChange={(e) => {
                                setID(e.target.value)
                            }}
                        />

                        <DialogActions>
                            <Button onClick={handleClose}>الغاء</Button>
                            <Button type="submit">تم</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
