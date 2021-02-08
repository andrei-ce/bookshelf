import React from 'react';
import {
  Box,
  Text,
  Stack,
  Image,
  Button,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Hero = ({ title, imageUrl, imageAlt, description }) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      margin='5vh 0'
      padding='4'
      maxW='7xl'
      bg={colorMode === 'light' ? `gray.300` : `gray.600`}
      borderRadius='md'
      boxShadow='dark-lg'>
      <Text textAlign={['center', 'center', 'left', 'left']} fontSize='4xl'>
        {title}{' '}
      </Text>
      <hr />
      <br />
      <Stack
        justify={['center', 'center', 'left', 'left']}
        align={['center', 'center', 'left', 'left']}
        direction={['column', 'column', 'row', 'row']}
        spacing={3}>
        <Image boxSize='200px' objectFit='cover' src={imageUrl} alt={imageAlt} />
        <Text fontSize='md'>{description}</Text>
      </Stack>
      <br />
      <hr />
      <br />
      <Stack spacing={4} justify='space-around' direction='row' align='center'>
        <Tooltip label='Coming soon' aria-label='Tooltip'>
          <Button variant='outline' colorScheme='teal' size='md'>
            SignUp
          </Button>
        </Tooltip>

        <Tooltip label='Explore our curated book listing' aria-label='Tooltip'>
          <Button colorScheme='teal' size='md'>
            <Link to='/books'>Browse</Link>
          </Button>
        </Tooltip>
      </Stack>
    </Box>
  );
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Hero;
