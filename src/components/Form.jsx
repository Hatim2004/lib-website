import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const [FName, setFName] = React.useState('');
    const [LName, setLName] = React.useState('');
    const [Email, setEmail] = React.useState('');
    const [Phone, setPhone] = React.useState('');


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        location.reload();
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("http://localhost:3470/emp/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                FirstName: FName,
                LastName: LName,
                Email: Email,
                Phone: Phone
            })
        })
            .then(() => handleClose())
            .catch((error) => {
                console.error("Error submitting form:", error);
            });
    };


    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                اضافة موظف
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>اضف بيانات الموظف</DialogTitle>
                <DialogContent sx={{ paddingBottom: 0 }}>
                    <DialogContentText>
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            required
                            sx={{mt:'1em'}}
                            className='textField'
                            label="الاسم الاول"
                            type="text"
                            fullWidth
                            variant="filled"
                            onChange={(e) => {
                                setFName(e.target.value)
                            }}
                        />
                        <TextField
                            required
                            sx={{mt:'1em'}}
                            className='textField'
                            margin="dense"
                            label="اسم العائلة"
                            type="text"
                            fullWidth
                            variant="filled"
                            onChange={(e) => {
                                setLName(e.target.value)
                            }}
                        />
                        <TextField
                            required
                            sx={{mt:'1em'}}
                            className='textField'
                            margin="dense"
                            label="البريد الاكتروني"
                            type="email"
                            fullWidth
                            variant="filled"
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                        <TextField
                            required
                            sx={{mt:'1em'}}
                            className='textField'
                            margin="dense"
                            label="رقم الهاتف"
                            type="tel"
                            fullWidth
                            variant="filled"
                            onChange={(e) => {
                                setPhone(e.target.value)
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
