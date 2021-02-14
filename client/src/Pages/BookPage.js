import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  Badge,
  Button,
  Tooltip,
  CircularProgress as Spinner,
  useColorMode,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaEdit, FaChevronLeft } from 'react-icons/fa';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Background from '../Components/Background';
import axiosCall from '../Utils/axios';
import errorInterceptor from '../Utils/errorInterceptor';
import { delay } from '../Utils/utils';

// Intercept 422 in case someone makes a GET request to '/books/some_invalid_id'
errorInterceptor();

const BookPage = ({ match, isAuth }) => {
  const { colorMode } = useColorMode();
  const { bookId } = match.params;
  const [loading, setLoading] = useState(true);
  const [bookDetails, setBookDetails] = useState(undefined);

  useEffect(async () => {
    // This setTimeout is only for UI purposes (to see the spinner)
    await delay(1000);
    let fetchedBookDetails = await axiosCall.GET(`/books/${bookId}`);
    if (fetchedBookDetails) {
      setBookDetails(fetchedBookDetails.data);
    }
    setLoading(false);
  }, []);

  return (
    <Background>
      <Flex
        backgroundColor={colorMode === 'light' ? 'gray.300' : 'gray.600'}
        w={['90%', '450px', '500px', '500px']}
        h={loading ? '300px' : 'auto'}
        mt='5vh'
        borderRadius='lg'
        boxShadow='dark-lg'
        justify='center'
        align='center'>
        {loading ? (
          <Spinner isIndeterminate color='teal.400' size='120px' />
        ) : bookDetails !== undefined ? (
          <Box>
            {/* MAIN SECTON   ======================  */}

            <Flex flexDirection={['column', 'column', 'row', 'row']} p={2}>
              <Image
                w={['200px', '200px', '200px', '200px']}
                h={['300px', '300px', '300px', '300px']}
                m='auto'
                mb={2}
                boxShadow='xl'
                src={bookDetails.cover}
                alt='Book Cover'
              />

              <Flex flexDirection='column' pl='2'>
                <Text mt='1' mb='3' fontWeight='bold' as='h4'>
                  {bookDetails.title}
                </Text>
                <Text
                  color={colorMode === 'light' ? 'gray.600' : 'gray.100'}
                  fontSize='sm'>
                  {bookDetails.description}
                </Text>
              </Flex>
            </Flex>
            <hr />
            {/* FOOTER SECTION  ======================  */}

            <Flex direction='row' justify='space-between' p={3}>
              <Box w='50%'>
                <Text
                  fontSize={['12px', '12px', '14px', '16px']}
                  color={colorMode === 'light' ? 'gray.600' : 'gray.100'}
                  fontWeight='semibold'
                  fontSize='sm'
                  as='span'
                  px='1'>
                  AUTHOR:{' '}
                </Text>
                <Badge
                  fontSize={['12px', '12px', '14px', '16px']}
                  as='span'
                  mr={1}
                  display='inline'
                  borderRadius='full'
                  px='3'
                  colorScheme='teal'>
                  {`${bookDetails.author.firstName} ${bookDetails.author.lastName}`}
                </Badge>
              </Box>
              <Box justifyContent='end' w='50%'>
                <Text
                  fontSize={['12px', '12px', '14px', '16px']}
                  color={colorMode === 'light' ? 'gray.600' : 'gray.100'}
                  fontWeight='semibold'
                  fontSize='sm'
                  as='span'
                  px='1'>
                  ISBN:
                </Text>
                <Badge
                  fontSize={['12px', '12px', '14px', '16px']}
                  as='span'
                  mr={1}
                  display='inline'
                  borderRadius='full'
                  px='3'
                  colorScheme='teal'>
                  {bookDetails.isbn}
                </Badge>
              </Box>
            </Flex>
          </Box>
        ) : (
          <Flex h='50px' w='150px' align='center' justify='center'>
            <Text color={colorMode === 'light' ? 'red.700' : 'red.300'}>
              Invalid book Id
            </Text>
          </Flex>
        )}
      </Flex>
      {/* ACTION BUTTONS SECTION  ======================  */}

      <Flex
        w={['300px', '450px', '500px', '500px']}
        direction='row'
        justify='space-between'
        pl={4}
        pr={4}>
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
        {bookDetails !== undefined ? (
          <Tooltip
            label={isAuth ? 'Edit book' : 'Login to edit books'}
            aria-label='Tooltip'>
            <Link to={isAuth ? `/books/edit/${bookDetails._id}` : '#'}>
              <Button
                isDisabled={!isAuth}
                boxShadow='dark-lg'
                mt={4}
                mb={5}
                leftIcon={<FaEdit />}
                colorScheme='teal'
                size='md'>
                Edit
              </Button>
            </Link>
          </Tooltip>
        ) : null}
      </Flex>
    </Background>
  );
};

BookPage.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {})(BookPage);
