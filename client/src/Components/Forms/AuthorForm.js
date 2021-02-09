import React, { useState } from 'react';
import {
  Input,
  Stack,
  Box,
  Button,
  FormControl,
  Divider,
  useColorMode,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { FaUserPlus, FaEdit } from 'react-icons/fa';

const AuthorForm = ({ mode }) => {
  const { colorMode } = useColorMode();

  const initialValues = {
    firstName: '',
    lastName: '',
  };

  const [formData, setFormData] = useState(initialValues);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    console.log('submitted');
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} action='submit'>
      <Stack
        backgroundColor={colorMode === 'light' ? 'gray.300' : 'gray.800'}
        p={4}
        alignItems='center'
        justify='center'
        borderRadius='lg'
        spacing={3}>
        <FormControl isRequired>
          <Input
            type='name'
            name='firstName'
            autoComplete='off'
            placeholder='First name'
            aria-label='First name'
            borderColor={colorMode === 'light' ? 'gray.500' : 'gray.300'}
            _placeholder={{ color: colorMode === 'light' ? 'gray.600' : 'gray.300' }}
            onChange={(e) => onChange(e)}
          />
        </FormControl>
        <FormControl isRequired>
          <Input
            type='name'
            name='lastName'
            autoComplete='off'
            placeholder='Last name'
            aria-label='Last name'
            borderColor={colorMode === 'light' ? 'gray.500' : 'gray.300'}
            _placeholder={{ color: colorMode === 'light' ? 'gray.600' : 'gray.300' }}
            onChange={(e) => onChange(e)}
          />
        </FormControl>
        <Divider borderColor='teal.300' />
        <Button type='submit' rightIcon={mode === 'add' ? <FaUserPlus /> : <FaEdit />}>
          {mode === 'add' ? 'Add author ' : 'Finish edit '}
        </Button>
      </Stack>
    </form>
  );
};

AuthorForm.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default AuthorForm;
