import React, { Fragment, useState, useEffect } from 'react';
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

import Background from '../Components/Background';
import axiosCall from '../Utils/axios';
import { delay } from '../Utils/utils';

const BookPage = (props) => {
  const { colorMode } = useColorMode();
  const { bookId } = props.match.params;
  const [loading, setLoading] = useState(true);
  const [bookDetails, setBookDetails] = useState({});

  useEffect(async () => {
    // This setTimeout is only for UI purposes (to see the spinner)
    await delay(1000);
    let fetchedBookDetails = await axiosCall.get(`/books/${bookId}`);
    setBookDetails(fetchedBookDetails.data);
    setLoading(false);
    console.log();
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
        ) : (
          <Box>
            {/* // MAIN SECTON */}
            <Flex flexDirection={['column', 'column', 'row', 'row']} p={2}>
              {/* <Flex justify={['center', 'flex-start', 'flex-start', 'flex-start']}> */}
              <Image
                w={['200px', '200px', '200px', '200px']}
                h={['300px', '300px', '300px', '300px']}
                m='auto'
                mb={2}
                boxShadow='xl'
                src={bookDetails.cover}
                alt='Book Cover'
              />
              {/* </Flex> */}

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
            {/* // FOOTER SECTION*/}

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
        )}
      </Flex>
      {/* put inside card */}
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
        <Tooltip label='Edit this book' aria-label='Tooltip'>
          <Link to={`/books/edit/${bookDetails._id}`}>
            <Button
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
      </Flex>
    </Background>
  );
};

export default BookPage;
