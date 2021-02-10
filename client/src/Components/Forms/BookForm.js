import React, { useState, useEffect } from 'react';
import {
  Input,
  Stack,
  Button,
  Divider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  useColorMode,
} from '@chakra-ui/react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaPlus, FaEdit } from 'react-icons/fa';

import axiosCall from '../../Utils/axios';

const BookForm = ({ mode, ...props }) => {
  const { colorMode } = useColorMode();
  const bookId = props.match.params.bookId || null;

  // State:
  const initialValues = {
    title: '',
    description: '',
    cover: '',
    authors: [],
    isbn: '',
  };
  const [formData, setFormData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [invalidISBN, setInvalidISBN] = useState(false);
  const [invalidDesc, setInvalidDesc] = useState(false);
  const [authors, setAuthors] = useState([]);

  // Validators:
  const checkISBN = (value) =>
    value === 13 ? setInvalidISBN(false) : setInvalidISBN(true);
  const checkDescription = (value) =>
    value > 10 && value < 300 ? setInvalidDesc(false) : setInvalidDesc(true);

  // Form Actions:
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // check for ISBN
    if (e.target.name === 'isbn') {
      checkISBN(e.target.value.length);
    } else if (e.target.name === 'description') {
      checkDescription(e.target.value.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (mode === 'add') {
      await axiosCall.post('/books', formData);
    }
    // else {
    //   await axiosCall.put(`/books/${authorId}`, formData);
    // }
    setLoading(false);
    // props.history.goBack();
    console.log('form will be submited in mode: ', mode);
  };

  // Effects:
  // if we are editing, make get call here and pass first & lastName as props
  useEffect(async () => {
    setLoading(true);
    if (mode === 'edit') {
      let response = await axiosCall.get(`/books/${bookId}`);
      setFormData(response.data);
    }
    setLoading(false);
  }, []);

  return (
    <form onSubmit={(e) => handleSubmit(e)} action='submit'>
      <Stack
        backgroundColor={colorMode === 'light' ? 'gray.300' : 'gray.800'}
        mt={4}
        p={4}
        w={['300px', '400px', '500px', '500px']}
        alignItems='center'
        justify='center'
        borderRadius='lg'
        boxShadow='xl'
        spacing={3}>
        <FormControl isRequired>
          <FormLabel htmlFor='title'>Title</FormLabel>

          <Input
            type='text'
            name='title'
            value={formData.title}
            placeholder='Title'
            aria-label='Title'
            borderColor={colorMode === 'light' ? 'gray.500' : 'gray.300'}
            _placeholder={{ color: colorMode === 'light' ? 'gray.600' : 'gray.300' }}
            onChange={(e) => onChange(e)}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor='cover'>Cover image url</FormLabel>

          <Input
            type='text'
            name='cover'
            value={formData.cover}
            placeholder='https://bitly.com/somepicture.jpg'
            aria-label='Cover image url'
            borderColor={colorMode === 'light' ? 'gray.500' : 'gray.300'}
            _placeholder={{ color: colorMode === 'light' ? 'gray.600' : 'gray.300' }}
            onChange={(e) => onChange(e)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='author'>Author</FormLabel>

          <Input
            type='text'
            name='author'
            value={formData.authors}
            placeholder='Authors...'
            aria-label='Authors'
            borderColor={colorMode === 'light' ? 'gray.500' : 'gray.300'}
            _placeholder={{ color: colorMode === 'light' ? 'gray.600' : 'gray.300' }}
            onChange={(e) => onChange(e)}
          />
        </FormControl>
        <FormControl isRequired isInvalid={invalidISBN}>
          <FormLabel htmlFor='isbn'>ISBN</FormLabel>
          <Input
            type='number'
            name='isbn'
            value={formData.isbn}
            placeholder='XXXXXXXXXXXXX'
            aria-label='isbn 13'
            borderColor={colorMode === 'light' ? 'gray.500' : 'gray.300'}
            _placeholder={{ color: colorMode === 'light' ? 'gray.600' : 'gray.300' }}
            onChange={(e) => onChange(e)}
          />
          <FormErrorMessage>ISBN needs 13 digits</FormErrorMessage>
          <FormHelperText>International Standard Book Number</FormHelperText>
        </FormControl>
        <FormControl isRequired isInvalid={invalidDesc}>
          <FormLabel htmlFor='description'>Description</FormLabel>

          <Textarea
            name='description'
            value={formData.description}
            placeholder='Drag lower right hand corner for more space. Keep it short!'
            aria-label='description'
            borderColor={colorMode === 'light' ? 'gray.500' : 'gray.300'}
            _placeholder={{ color: colorMode === 'light' ? 'gray.600' : 'gray.300' }}
            onChange={(e) => onChange(e)}
            size='md'
          />
          <FormErrorMessage>Keep it between 10 and 300 characters</FormErrorMessage>
        </FormControl>
        <Divider borderColor='teal.300' />
        <Button
          isLoading={loading}
          type='submit'
          rightIcon={mode === 'add' ? <FaPlus /> : <FaEdit />}>
          {mode === 'add' ? 'Add book ' : 'Finish edit '}
        </Button>
      </Stack>
    </form>
  );
};

BookForm.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default withRouter(BookForm);
