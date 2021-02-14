import React, { useState } from 'react';
import {
  Input,
  Stack,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Divider,
  useColorMode,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { register } from '../../store/actions/auth';
import Background from '../../Components/Background';

// COMPONENT STARTS ============================================
const RegisterPage = ({ register, isAuth, isLoading, history }) => {
  const { colorMode } = useColorMode();

  // State
  const initialValues = {
    username: '',
    email: '',
    password: '',
    password2: '',
  };
  const [formData, setFormData] = useState(initialValues);
  const [pwdMatch, setPwdMatch] = useState(true);

  // Password Validator
  const checkPwd = (value) => {
    value === formData.password ? setPwdMatch(true) : setPwdMatch(false);
  };

  // Functions
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'password2') {
      checkPwd(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    register(formData);
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
            <FormLabel htmlFor='username'>Username</FormLabel>
            <Input
              type='name'
              name='username'
              value={formData.username}
              placeholder='bookreader99'
              aria-label='username'
              borderColor={colorMode === 'light' ? 'gray.500' : 'gray.300'}
              _placeholder={{ color: colorMode === 'light' ? 'gray.600' : 'gray.300' }}
              onChange={(e) => onChange(e)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input
              type='email'
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
          <FormControl isRequired isInvalid={!pwdMatch}>
            <FormLabel htmlFor='password2'>Confirm Password</FormLabel>
            <Input
              type='password'
              name='password2'
              value={formData.password2}
              placeholder='confirm password'
              aria-label='confirm password'
              borderColor={colorMode === 'light' ? 'gray.500' : 'gray.300'}
              _placeholder={{ color: colorMode === 'light' ? 'gray.600' : 'gray.300' }}
              onChange={(e) => onChange(e)}
            />
            <FormErrorMessage>Passwords don't match</FormErrorMessage>
          </FormControl>

          <Divider borderColor='teal.300' />
          <Button isDisabled={!pwdMatch} isLoading={isLoading} type='submit'>
            Register
          </Button>
        </Stack>
      </form>
    </Background>
  );
};

RegisterPage.propTypes = {
  register: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, { register })(RegisterPage);
