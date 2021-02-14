import React, { useState } from 'react';
import {
  Input,
  Text,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Divider,
  Link as ChakraLink,
  useColorMode,
} from '@chakra-ui/react';
import { FaKey } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link as ReachLink } from 'react-router-dom';

import { login } from '../../store/actions/auth';
import Background from '../../Components/Background';

// COMPONENT STARTS ============================================
const LoginPage = ({ login, isAuth, isLoading, history }) => {
  const { colorMode } = useColorMode();

  // State
  const initialValues = {
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(initialValues);

  // Functions
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
    return <Redirect to='/' />;
  };

  if (isAuth) {
    return <Redirect to='/' />;
  }

  return (
    <Background>
      <form onSubmit={(e) => handleSubmit(e)} action='submit'>
        <Stack
          backgroundColor={colorMode === 'light' ? 'gray.300' : 'gray.800'}
          p={4}
          w={['300px', '400px', '500px', '500px']}
          alignItems='center'
          justify='center'
          borderRadius='lg'
          boxShadow='xl'
          spacing={3}>
          <FormControl isRequired>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input
              type='name'
              name='email'
              value={formData.email}
              placeholder='email@example.com'
              aria-label='Email'
              borderColor={colorMode === 'light' ? 'gray.500' : 'gray.300'}
              _placeholder={{ color: colorMode === 'light' ? 'gray.600' : 'gray.300' }}
              onChange={(e) => onChange(e)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input
              type='password'
              name='password'
              value={formData.password}
              placeholder='password'
              aria-label='Password'
              borderColor={colorMode === 'light' ? 'gray.500' : 'gray.300'}
              _placeholder={{ color: colorMode === 'light' ? 'gray.600' : 'gray.300' }}
              onChange={(e) => onChange(e)}
            />
          </FormControl>
          <Divider borderColor='teal.300' />
          <Button isLoading={isLoading} type='submit' rightIcon={<FaKey />}>
            Login
          </Button>
          <Text>
            No account yet?{' '}
            <ChakraLink as={ReachLink} to='/register' color='teal.500'>
              Sign Up
            </ChakraLink>
          </Text>
        </Stack>
      </form>
    </Background>
  );
};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, { login })(LoginPage);
