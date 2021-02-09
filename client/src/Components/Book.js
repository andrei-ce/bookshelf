import React from 'react';
import { Box, Flex, Text, Image, Badge, useColorMode } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Book = ({ title, cover, description, bookId }) => {
  const { colorMode } = useColorMode();

  return (
    <Link to={`/books/${bookId}`}>
      <Box
        backgroundColor={colorMode === 'light' ? 'gray.300' : 'gray.600'}
        maxW='sm'
        borderRadius='lg'
        overflow='hidden'>
        <Flex flexDirection='row' p={2}>
          {/* LEFT SECTION */}
          <Image w='125px' h='200px' src={cover} alt='Book Cover' />
          {/* RIGHT SECTION */}
          <Flex flexDirection='column' pl={1} pr={1} w='200px' h='200px'>
            <Text mt='1' mb='1' fontWeight='bold' as='h4' lineHeight='tight'>
              {title}
            </Text>
            <Text
              overflowY='hidden'
              h='160px'
              w='200px'
              color={colorMode === 'light' ? 'gray.600' : 'gray.100'}
              fontSize='sm'>
              {description.slice(0, 200) + '...'}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
};

Book.propTypes = {
  title: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
};

export default Book;
