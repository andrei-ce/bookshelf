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
  Select,
  Link as ChakraLink,
  useColorMode,
} from '@chakra-ui/react';
import { Link as ReachLink, withRouter } from 'react-router-dom';
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
    author: '',
    isbn: '',
  };
  const [formData, setFormData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [invalidISBN, setInvalidISBN] = useState(false);
  const [invalidDesc, setInvalidDesc] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [authorId, setAuthorId] = useState(undefined);

  // Validators:
  const checkISBN = (value) =>
    value === 13 ? setInvalidISBN(false) : setInvalidISBN(true);
  const checkDescription = (value) =>
    value > 10 && value < 300 ? setInvalidDesc(false) : setInvalidDesc(true);

  // Form Actions:
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // check for ISBN & Description validators
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
      await axiosCall.POST('/books', formData);
    } else {
      await axiosCall.PUT(`/books/${bookId}`, formData);
    }
    setLoading(false);
    props.history.goBack();
  };

  // Effects:
  useEffect(async () => {
    setLoading(true);
    // if in edit mode, fetch current book information
    if (mode === 'edit') {
      let bookDetails = await axiosCall.GET(`/books/${bookId}`);
      // save authorId separated from authorFullName --> this is because selected value in <Select/> won´t persist if not directly referencing state
      const editedBookDetails = {
        ...bookDetails.data,
        author: `${bookDetails.data.author.firstName} ${bookDetails.data.author.lastName}`,
      };
      setAuthorId(bookDetails.data.author._id);
      setFormData(editedBookDetails);
    }
    // either way, fetch all possible authors
    let allAuthors = await axiosCall.GET(`/authors`);
    setAuthors(allAuthors.data);
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
          <Select
            placeholder='Select country'
            name='author'
            value={authorId}
            placeholder='Select one'
            aria-label='Authors'
            borderColor={colorMode === 'light' ? 'gray.500' : 'gray.300'}
            _placeholder={{ color: colorMode === 'light' ? 'gray.600' : 'gray.300' }}
            onChange={(e) => onChange(e)}>
            {authors.map((author, i) => (
              <option
                key={i}
                value={author._id}>{`${author.firstName} ${author.lastName}`}</option>
            ))}
          </Select>
          <FormHelperText>
            Please{' '}
            <ChakraLink as={ReachLink} to='/authors/add' color='teal.500'>
              add the author first
            </ChakraLink>{' '}
            if you cannot find on list
          </FormHelperText>
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
