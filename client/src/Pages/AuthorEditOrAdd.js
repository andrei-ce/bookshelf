import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { FaChevronLeft } from 'react-icons/fa';

import Background from '../Components/Background';
import AuthorForm from '../Components/Forms/AuthorForm';

const AuthorEditOrAddPage = ({ location }) => {
  // The user can get here through 2 buttons : add author & edit author, from AuthorsPage
  const mode = location.pathname.startsWith('/authors/add') ? 'add' : 'edit';

  return (
    <Background>
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
    </Background>
  );
};

export default withRouter(AuthorEditOrAddPage);
