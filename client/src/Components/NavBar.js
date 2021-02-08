import { Flex, Stack, useColorMode, IconButton, Box, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';

import logo from '../Assets/logo.png';
import logoDarkMode from '../Assets/logo-darkmode.png';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: 'gray.300', dark: 'gray.600' };
  const textColor = { light: 'black', dark: 'gray.100' };
  return (
    <Flex
      w='100vw'
      bg={bgColor[colorMode]}
      color={textColor[colorMode]}
      align='center'
      justify='space-around'
      fontSize={['sm', 'md', 'lg', 'xl']}
      h='10vh'
      boxShadow='dark-lg'
      p={2}>
      <Flex w={['90vw', '90vw', '80vw', '80vw']} align='center' justify='space-around'>
        {/* LOGO */}
        <Box>
          <Image
            w={['10vh', '10vh', '12vh', '14vh']}
            src={colorMode === 'light' ? logo : logoDarkMode}
            alt='Bookshelf Logo'
          />
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
            // opacity={router.pathname !== '/' ? 0.4 : 1}
          >
            <Link to='/'>Home</Link>
          </Box>
          <Box position='relative'>
            <Link to='#'>Authors</Link>
          </Box>
          <Box position='relative'>
            <Link to='#'>Books</Link>
          </Box>
        </Stack>
        {/* LIGHT/DARK THEME */}
        <Flex justify='center' align='center'>
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

export default Navbar;
