import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

export default function LoanedBooks() {
  const [loans, setLoans] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchLoans = () => {
    setLoading(true);
    axios.get('https://api-05ii.onrender.com/loans')
      .then(res => setLoans(res.data))
      .catch(err => console.error('Error fetching loans:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  useEffect(() => {
    const totalPrice = loans.reduce((sum, book) => sum + (Number(book.price) || 0), 0);
    setTotal(totalPrice);
  }, [loans]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api-05ii.onrender.com/loans/delete/${id}`);
      fetchLoans();
      window.location.reload();

    } catch (err) {
      console.error('Error deleting book:', err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h6">جار التحميل...</Typography>
      </Box>
    );
  }

  if (!loans.length) {
    return (
      <Box sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h6">لا توجد كتب في السلة</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: '10vh', px: 4 }}>
      {loans.map((book) => (
        <Paper key={book.id} elevation={3} sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6">{book.bookTitle}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>{book.description}</Typography>
            <Typography variant="subtitle2" sx={{ color: 'green' }}>السعر: {book.price} ريال</Typography>
          </Box>
          <Button variant="outlined" color="error" onClick={() => handleDelete(book.id)}>
            حذف
          </Button>
        </Paper>
      ))}

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          الإجمالي: {total} ريال
        </Typography>
      </Box>
    </Box>
  );
}
