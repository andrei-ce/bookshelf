import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import errorInterceptor from '../Utils/errorInterceptor';
import { Button } from '@chakra-ui/react';
import { FaChevronLeft } from 'react-icons/fa';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FourOhFour from './404Page';

import Background from '../Components/Background';
import AuthorForm from '../Components/Forms/AuthorForm';

// Intercept 400 and 422 responses to show standard browser alert
errorInterceptor();

const AuthorEditOrAddPage = ({ location, isAuth }) => {
  // The user can get here through 2 buttons : add author & edit author, from AuthorsPage
  const mode = location.pathname.startsWith('/authors/add') ? 'add' : 'edit';

  return (
    <Background>
      {isAuth ? (
        <>
          <AuthorForm mode={mode} />
          <Link to='/authors'>
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

AuthorEditOrAddPage.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {})(withRouter(AuthorEditOrAddPage));
