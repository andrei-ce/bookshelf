import React from 'react';
import { Box, Flex, Text, Image, Badge, useColorMode } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Book = ({ title, cover, authors, isbn, description }) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      backgroundColor={colorMode === 'light' ? 'gray.300' : 'gray.600'}
      maxW='sm'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'>
      {/* MAIN SECTION */}
      <Flex flexDirection='row' p='1'>
        <Image w='125px' h='200px' src={cover} alt='Book Cover' />

        <Flex flexDirection='column' pl='2' w='200px' h='200px'>
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
      <hr />
      {/* FOOTER */}
      {/* <Box pl={3}>
        <Box>
          {authors.map((author, i) => (
            <Badge
              as='span'
              key={i}
              mr={1}
              display='inline'
              borderRadius='full'
              px='3'
              colorScheme='teal'>
              {`${author.firstName} ${author.lastName}`}
            </Badge>
          ))}
        </Box>
        <Text
          color={colorMode === 'light' ? 'gray.600' : 'gray.100'}
          display='block'
          m='auto'
          fontWeight='semibold'
          fontSize='sm'>
          ISBN: {isbn}
        </Text>
      </Box> */}
    </Box>
  );
};

Book.propTypes = {
  title: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  isbn: PropTypes.number.isRequired,
};

export default Book;
