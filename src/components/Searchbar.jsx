import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { islamicBooks } from '../data/IslamicBooks';
import { philosophyBooks } from '../data/PhilosophyBooks';
import { referenceBooks } from '../data/ReferenceBooks';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';

export default function SearchBar() {
  const allBooks = [...islamicBooks, ...philosophyBooks, ...referenceBooks];
  const { fetchBasketCount } = useOutletContext();


  const handleAddToLoan = async (book) => {

    if (!book) return;

    try {
      await axios.post('https://api-05ii.onrender.com/loans/add', {
        bookTitle: book.label,
        image: book.image,
        description: book.description,
        price: book.price,
      });
      fetchBasketCount();
      alert(`تم اضافة "${book.label}" للسلة`);
    } catch (error) {
      console.error(error);
      alert('فشل في إضافة الكتاب إلى السلة.');
    }
  };

  const handleSelect = (event, value) => {
    if (value) {
      handleAddToLoan(value); // Pass selected book
    }
  };

  return (
    <Autocomplete
      className='SearchBar'
      options={allBooks}
      getOptionLabel={(option) => option.label}
      sx={{
        width: "50vh",
        ml: 'auto',
        mr: 'auto',
        mt: '3em',
        border: 'none',
        "& fieldset": { border: "none" }
      }}
      onChange={handleSelect}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          className='Search-Bar'
          label="ابحث عن كتاب"
        />
      )}
    />
  );
}
