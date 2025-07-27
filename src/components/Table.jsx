import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'FirstName', headerName: 'الاسم الاول', width: 150 },
    { field: 'LastName', headerName: 'اسم العائلة', width: 150 },
    {
        field: 'Email',
        headerName: 'البريد الاكتروني',
        type: 'number',
        width: 150,
    },
    {
        field: 'Phone',
        headerName: 'رقم الهاتف',
        type: 'number',
        width: 150,
    }
];

    
const paginationModel = { page: 0, pageSize: 5 };

export default function EmpTable({rows}) {
    return (
        <Paper className='empTable'>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                
                sx={{ border: 0, textAlign: 'center' }}
            />
        </Paper>
    );
}
