import React, { useEffect, useState } from 'react';
import {
  Flex,
  Button,
  SimpleGrid,
  Container,
  Input,
  InputGroup,
  InputRightElement,
  CircularProgress as Spinner,
  useColorMode,
  Tooltip,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Background from '../Components/Background';
import Book from '../Components/Book';
import axiosCall from '../Utils/axios';
import { delay } from '../Utils/utils';

const BooksPage = ({ isAuth }) => {
  const { colorMode } = useColorMode();

  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  const searchBooks = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(async () => {
    // This setTimeout is only for UI purposes (to see the spinner)
    await delay(1000);
    let fetchedBooks = await axiosCall.GET('/books');
    setBooks(fetchedBooks.data);
    setLoading(false);
  }, []);

  return (
    <Background>
      {/* SEARCH BAR SECTION  ======================  */}

      <Flex
        backgroundColor={colorMode === 'light' ? 'gray.300' : 'gray.800'}
        borderRadius='md'
        p={1}
        mt={1}
        position='absolute'
        top={['15px', '15px', '20px', '20px']}>
        <InputGroup>
          <InputRightElement
            pointerEvents='none'
            children={<FaSearch color='gray.300' />}
          />
          <Input
            type='text'
            maxW='200px'
            onChange={(e) => searchBooks(e)}
            placeholder='Search titles...'
            border='transparent'
            _placeholder={{ color: colorMode === 'light' ? 'gray.600' : 'gray.300' }}
          />
        </InputGroup>
        <Tooltip label={isAuth ? 'Add book' : 'Login to add books'}>
          <Link to='/books/add'>
            <Button
              isDisabled={!isAuth}
              mr={1}
              backgroundColor={colorMode === 'light' ? 'teal.400' : 'teal.600'}
              size='md'>
              Add Book
            </Button>
          </Link>
        </Tooltip>
      </Flex>
      {/* BOOK COMPONENT GRID SECTION  ======================  */}

      <Container my={4} maxWidth='1600px' centerContent>
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
                  bookId={book._id}
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

BooksPage.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {})(BooksPage);
