import React from 'react';
import {
  Box,
  Text,
  Stack,
  Image,
  Button,
  Tooltip,
  Divider,
  useColorMode,
} from '@chakra-ui/react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Hero = ({ title, imageUrl, imageAlt, description, landing, isAuth, user }) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      margin='5vh 0'
      padding='4'
      maxW='7xl'
      bg={colorMode === 'light' ? `gray.300` : `gray.600`}
      borderRadius='md'
      boxShadow='dark-lg'>
      {landing ? (
        <Text textAlign={['center', 'center', 'left', 'left']} fontSize='4xl'>
          {isAuth ? `Welcome, ${user.username}` : 'Welcome, young reader'}
        </Text>
      ) : (
        <Text textAlign={['center', 'center', 'left', 'left']} fontSize='4xl'>
          {title}{' '}
        </Text>
      )}

      <Divider borderColor={colorMode === 'light' ? `teal.600` : `teal.300`} />
      {landing ? null : (
        <Text fontSize='xl' mt={2} textAlign={['center', 'center', 'left', 'left']}>
          404 error
        </Text>
      )}
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
      {landing ? (
        <>
          <Divider borderColor={colorMode === 'light' ? `teal.600` : `teal.300`} />
          <br />
          <Stack spacing={4} justify='space-around' direction='row' align='center'>
            <Tooltip label='Explore our curated book listing' aria-label='Tooltip'>
              <Button colorScheme='teal' size='md'>
                <Link to='/books'>Browse</Link>
              </Button>
            </Tooltip>
          </Stack>
        </>
      ) : null}
    </Box>
  );
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  landing: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Hero);
