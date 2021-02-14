import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import errorInterceptor from '../Utils/errorInterceptor';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FourOhFour from './404Page';

import { Button } from '@chakra-ui/react';
import { FaChevronLeft } from 'react-icons/fa';

import Background from '../Components/Background';
import BookForm from '../Components/Forms/BookForm';

// Intercept 400 and 422 responses to show standard browser alert
errorInterceptor();

const BookEditOrAddPage = ({ location, isAuth }) => {
  // The user can get here through 2 buttons :
  // 1) from 'add book' button from BooksPage
  // 2) from'edit button' from BookPage
  const mode = location.pathname.startsWith('/books/add') ? 'add' : 'edit';

  console.log(isAuth);
  return (
    <Background>
      {isAuth ? (
        <>
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
        </>
      ) : (
        <FourOhFour />
      )}
    </Background>
  );
};

BookEditOrAddPage.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {})(withRouter(BookEditOrAddPage));
