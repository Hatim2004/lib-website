import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';
import SearchBar from '../components/Searchbar'
import BookCard from '../components/BookCard';
import { islamicBooks }  from '../data/IslamicBooks';
import { philosophyBooks } from '../data/PhilosophyBooks';
import { referenceBooks } from '../data/ReferenceBooks';
import { useState } from 'react';
import  Grid  from '@mui/material/Grid';
export default function Home() {
    const theme = useTheme()
    //books categories
    //Islamic books
    const [IslamicBooks] = useState(islamicBooks)
     //Philosophy books
    const [PhilosophyBooks] = useState(philosophyBooks)
    //Philosophy books
    const [ReferenceBooks] = useState(referenceBooks)

    return (
        <>
            <Box className='headBox' sx={{ bgcolor: theme.palette.primary.main, height: '50vh' }}>
                <Typography
                    className='HeadName'
                    variant='h2'
                    sx={{ textAlign: 'center', pt: '12vh', fontWeight: theme.typography.bold.fontWeight }}
                >
                    موقع المكتبة
                </Typography>

                <Typography variant='h3'
                    className='NameDec'
                    sx={{ textAlign: 'center', pt: '4vh' }}
                >
                    المكتبة الالكترونية لشراء الكتب
                </Typography>
                <SearchBar />
            </Box>
            <Box className='mainBox' sx={{ mt: 4, width: '100%', ml: 'auto', mr: '2vh', overflowX: 'auto', mb:'8vh'}}>
                  <Typography className='categories' variant='h4' sx={{mb:'3vh'}}>
                        العلوم الاسلامية
                    </Typography>
                <Grid container spacing={4} >
                  
                    {IslamicBooks.map((book, index) =>
                        <Grid  key={index}>
                            <BookCard key={index} name={book.label} description={book.description} image={book.image} price={book.price} />
                        </Grid>
                    )}
                </Grid>
            </Box>
          
             <Box className='mainBox' sx={{ mt: 4, width: '100% ', ml: 'auto', mr: '2vh', overflowX: 'auto'}}>
                  <Typography className='categories' variant='h4' sx={{mb:'3vh'}}>
                       الفلسفة
                    </Typography>
                <Grid container spacing={4} >
                  
                    {PhilosophyBooks.map((book, index) =>
                        <Grid  key={index}>
                            <BookCard key={index} name={book.label} description={book.description} image={book.image} price={book.price} />
                        </Grid>
                    )}
                </Grid>
            </Box>


            <Box className='mainBox' sx={{ mt: 4, width: '100% ', ml: 'auto', mr: '2vh', overflowX: 'auto'}}>
                  <Typography className='categories' variant='h4' sx={{mb:'3vh'}}>
                       الموسوعات
                    </Typography>
                <Grid container spacing={4} >
                  
                    {ReferenceBooks.map((book, index) =>
                        <Grid  key={index}>
                            <BookCard key={index} name={book.label} description={book.description} image={book.image} price={book.price} />
                        </Grid>
                    )}
                </Grid>
            </Box>
        </>
    )
}