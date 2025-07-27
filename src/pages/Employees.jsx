import Typography from '@mui/material/Typography';
import EmpTable from '../components/Table';
import { useState, useEffect } from "react";
import FormDialog from '../components/Form';
import { Box } from '@mui/material';
import DeleteForm from '../components/DeleteForm';


export default function Home() {
    const [rows, setRows] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3470/emp');
                const result = await response.json();
                setRows(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            } 
        };
        fetchData();
    }, []);
    return (
        <main>
            <Typography variant='h3' sx={{ textAlign: 'center', mt: '10vh' }}>
                صفحة الموظفين
            </Typography>

            <EmpTable rows={rows} />
            <Box sx={{width:'100%', mt:'3vh', textAlign:'center'}}>
                <FormDialog  />
                <DeleteForm />
            </Box>
        </main>
    )
}
