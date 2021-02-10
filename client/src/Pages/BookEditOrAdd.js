import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import errorInterceptor from '../Utils/errorInterceptor';

import { Button } from '@chakra-ui/react';
import { FaChevronLeft } from 'react-icons/fa';

import Background from '../Components/Background';
import BookForm from '../Components/Forms/BookForm';

// Intercept 400 and 422 responses to show standard browser alert
errorInterceptor();

const BookEditOrAddPage = ({ location }) => {
  // The user can get here through 2 buttons :
  // 1) from 'add book' button from BooksPage
  // 2) from'edit button' from BookPage
  const mode = location.pathname.startsWith('/books/add') ? 'add' : 'edit';
  return (
    <Background>
      <BookForm mode={mode} />
      <Link to='/books'>
        <Button
          boxShadow='dark-lg'
          mt={4}
          mb={5}
          leftIcon={<FaChevronLeft />}
          colorScheme='teal'
          size='md'>
          Back
        </Button>
      </Link>
    </Background>
  );
};

export default withRouter(BookEditOrAddPage);
