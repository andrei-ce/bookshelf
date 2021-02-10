import React, { useState, useEffect } from 'react';
import {
  Input,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Divider,
  useColorMode,
} from '@chakra-ui/react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaUserPlus, FaEdit } from 'react-icons/fa';

import axiosCall from '../../Utils/axios';

const AuthorForm = ({ mode, ...props }) => {
  const { colorMode } = useColorMode();
  const authorId = props.match.params.authorId || null;

  // State
  const initialValues = {
    firstName: '',
    lastName: '',
  };
  const [formData, setFormData] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  // Functions
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (mode === 'add') {
      await axiosCall.post('/authors', formData);
    } else {
      await axiosCall.put(`/authors/${authorId}`, formData);
    }
    setLoading(false);
    props.history.goBack();
  };

  // Effects:
  // if we are editing, make get call here and pass first & lastName as props
  useEffect(async () => {
    if (mode === 'edit') {
      let response = await axiosCall.get(`/authors/${authorId}`);
      setFormData(response.data);
    }
  }, []);

  return (
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
          <FormLabel htmlFor='firstName'>First name</FormLabel>
          <Input
            type='name'
            name='firstName'
            value={formData.firstName}
            placeholder='First name'
            aria-label='First name'
            borderColor={colorMode === 'light' ? 'gray.500' : 'gray.300'}
            _placeholder={{ color: colorMode === 'light' ? 'gray.600' : 'gray.300' }}
            onChange={(e) => onChange(e)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor='lastName'>Last name</FormLabel>
          <Input
            type='name'
            name='lastName'
            value={formData.lastName}
            placeholder='Last name'
            aria-label='Last name'
            borderColor={colorMode === 'light' ? 'gray.500' : 'gray.300'}
            _placeholder={{ color: colorMode === 'light' ? 'gray.600' : 'gray.300' }}
            onChange={(e) => onChange(e)}
          />
        </FormControl>
        <Divider borderColor='teal.300' />
        <Button
          isLoading={loading}
          type='submit'
          rightIcon={mode === 'add' ? <FaUserPlus /> : <FaEdit />}>
          {mode === 'add' ? 'Add author ' : 'Finish edit '}
        </Button>
      </Stack>
    </form>
  );
};

AuthorForm.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default withRouter(AuthorForm);
