import {
  Flex,
  Stack,
  useColorMode,
  Button,
  IconButton,
  Box,
  Image,
} from '@chakra-ui/react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaMoon, FaSun } from 'react-icons/fa';
import PropTypes from 'prop-types';

import { logout } from '../store/actions/auth';
import logo from '../Assets/logo-darkmode.png';

const Navbar = ({ location, isAuth, logout }) => {
  const { colorMode, toggleColorMode } = useColorMode('dark');
  const bgColor = { light: 'gray.300', dark: 'gray.600' };
  const textColor = { light: 'black', dark: 'gray.100' };

  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
  };
  console.log(isAuth);
  return (
    <Flex
      w='100vw'
      h='10vh'
      bg={bgColor[colorMode]}
      color={textColor[colorMode]}
      align='center'
      justify='space-around'
      fontSize={['sm', 'md', 'lg', 'xl']}
      p={2}
      boxShadow='dark-lg'
      position='fixed'
      zIndex='100'
      top='0'
      right='0'>
      <Flex
        w={['90vw', '90vw', '80vw', '80vw']}
        h='10vh'
        align='center'
        justify='space-around'
        overflow='hidden'>
        {/* LOGO: need to fix first load */}
        <Box
          w={['10vh', '12vh', '14vh', '14vh']}
          backgroundColor={
            colorMode === 'light' ? 'transparent.300' : 'transparent.700'
          }>
          <Link to='/'>
            <Image src={logo} alt='Bookshelf Logo' />
          </Link>
        </Box>
        {/* MENU OPTIONS */}
        <Stack
          spacing={[3, 5, 7, 10]}
          color={textColor[colorMode]}
          justify='center'
          align='center'
          isInline>
          <Box
            position='relative'
            opacity={location.pathname.startsWith('/authors') ? 1 : 0.4}
            textDecoration={
              location.pathname.startsWith('/authors') ? 'underline' : null
            }>
            <Link to='/authors'>Authors</Link>
          </Box>
          <Box
            position='relative'
            opacity={location.pathname.startsWith('/books') ? 1 : 0.4}
            textDecoration={
              location.pathname.startsWith('/books') ? 'underline' : null
            }>
            <Link to='/books'>Books</Link>
          </Box>

          {/* // AUTHENTICATION */}
          {isAuth ? (
            <Box
              position='relative'
              opacity={location.pathname.startsWith('/auth') ? 0.4 : 1}
              textDecoration={
                location.pathname.startsWith('/auth') ? 'underline' : null
              }
              onClick={(e) => handleLogout(e)}>
              <Link to='#'>Logout </Link>
            </Box>
          ) : (
            <Box
              position='relative'
              opacity={location.pathname.startsWith('/auth') ? 0.4 : 1}
              textDecoration={
                location.pathname.startsWith('/auth') ? 'underline' : null
              }>
              <Link to='/login'>Login</Link>
            </Box>
          )}
          {/* // AUTHENTICATION */}
        </Stack>
        {/* LIGHT/DARK THEME */}
        <Flex justify='center' align='center' w={['10vh', '10vh', '12vh', '14vh']}>
          <IconButton
            aria-label='Switch between light and dark mode'
            rounded='full'
            onClick={toggleColorMode}
            icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

Navbar.propTypes = {
  location: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { logout })(withRouter(Navbar));
