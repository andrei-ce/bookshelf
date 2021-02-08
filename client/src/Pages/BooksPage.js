import React, { useEffect, useState } from 'react';
import {
  Box,
  SimpleGrid,
  Container,
  Input,
  InputGroup,
  InputRightElement,
  CircularProgress as Spinner,
  useColorMode,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

import Background from '../Components/Background';
import Book from '../Components/Book';

import axiosCall from '../Utils/axios';
import { delay } from '../Utils/utils';

const BooksPage = () => {
  const { colorMode } = useColorMode();

  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  const searchBooks = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(async () => {
    // This setTimeout is only for UI purposes (to see the spinner)
    await delay(2000);
    let fetchedBooks = await axiosCall.get('/books');
    setBooks(fetchedBooks.data);
    setLoading(false);
  }, []);

  return (
    <Background>
      <Box
        backgroundColor={colorMode === 'light' ? 'gray.300' : 'gray.800'}
        borderRadius='md'
        p={1}
        mt={1}
        position='absolute'
        top={['15px', '15px', '60px', '60px']}>
        <InputGroup>
          <InputRightElement
            pointerEvents='none'
            children={<FaSearch color='gray.300' />}
          />
          <Input
            type='text'
            onChange={(e) => searchBooks(e)}
            placeholder='Search titles...'
            _placeholder={{ color: colorMode === 'light' ? 'gray.600' : 'gray.300' }}
          />
        </InputGroup>
      </Box>
      <Container mt={4} maxWidth='1600px' centerContent>
        {loading ? (
          <Spinner isIndeterminate color='teal.400' size='120px' />
        ) : (
          <SimpleGrid mt='10vh' columns={[1, 1, 2, 3]} spacing={[2, 3, 4, 4]}>
            {books
              .filter(
                (book) =>
                  //search for book titles
                  book.title.toLowerCase().includes(searchText.toLowerCase()) ||
                  //or if the search bar is empty show all
                  searchText === ''
              )
              .map((book, i) => (
                <Book
                  key={i}
                  title={book.title}
                  authors={book.authors}
                  description={book.description}
                  cover={book.cover}
                  isbn={book.isbn}
                />
              ))}
          </SimpleGrid>
        )}
      </Container>
    </Background>
  );
};

export default BooksPage;
